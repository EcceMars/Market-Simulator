import { useState, useEffect, useRef } from 'react';
import type { GameState, GameStateWithPool, TickPhase } from './sim/Tick';
import type { NeedReport } from './sim/TickReport';
import type { TaxSettings } from './sim/Tax';
import { applyProduce, applyConsume, computeMeanWages } from './sim/Tick';
import { Structures } from './components/data/ResourceRegistry';
import type { StructureObj } from './components/data/StructureObj';
import IndustryPanel from './components/panel/struct-panel/IndustryPanel';
import VillagePanel  from './components/panel/struct-panel/VillagePanel';
import PublicPanel   from './components/panel/struct-panel/PublicPanel';
import styles from './App.module.css';

// ── Speed config ──────────────────────────────────────────────────────────────

type SpeedLabel = 'Very Slow' | 'Slow' | 'Normal' | 'Fast' | 'Very Fast';

const SPEEDS: Record<SpeedLabel, number> = {
    'Very Slow': 1200,
    'Slow':       600,
    'Normal':     300,
    'Fast':       120,
    'Very Fast':   30,
};

const SPEED_LABELS = Object.keys(SPEEDS) as SpeedLabel[];

// ── Helpers ───────────────────────────────────────────────────────────────────

const PUBLIC_STRUCTURES = ['Well'];

function isPublic(s: StructureObj): boolean {
    return PUBLIC_STRUCTURES.includes(s.template.name);
}

function makeIndustry(key: keyof typeof Structures, funds: number): StructureObj {
    const template = Structures[key];
    return {
        template,
        level: 1,
        funds,
        workers: template.workforce.map(slot => ({
            type:      slot.workerType,
            number:    slot.number,
            wageOffer: 1.0,
        })),
        inventory: { entries: [] },
    };
}

// ── Initial state ─────────────────────────────────────────────────────────────

const initialTaxes: TaxSettings = {
    incomeTaxRate: 0.10,
    citRate:       0.05,
    assetTaxRate:  0.02,
};

const initialIndustries: StructureObj[] = [
    makeIndustry('pasture', 100),
    makeIndustry('well',    100),
];

const initialState: GameState = {
    tick:       0,
    phase:      'IDLE',
    treasury:   200,
    village: {
        template:  Structures.village,
        level:     1,
        funds:     0,
        workers:   Structures.village.workforce.map(slot => ({
            type:      slot.workerType,
            number:    slot.number,
            wageOffer: 0,
        })),
        inventory: { entries: [] },
    },
    industries: initialIndustries,
    taxes:      initialTaxes,
    meanWages:  computeMeanWages(initialIndustries),
    history:    [],
};

// ── App ───────────────────────────────────────────────────────────────────────

type TickMode = 'MANUAL' | 'AUTO';

function App() {
    const [game, setGame]     = useState<GameState>(initialState);
    const [mode, setMode]     = useState<TickMode>('MANUAL');
    const [speed, setSpeed]   = useState<SpeedLabel>('Normal');
    const [ticking, setTicking] = useState(false);

    const speedRef  = useRef(speed);
    const tickingRef = useRef(ticking);
    speedRef.current  = speed;
    tickingRef.current = ticking;

    // ── Tick animation ──────────────────────────────────────────────────────

    function runAnimatedTick(currentGame: GameState) {
        if (tickingRef.current) return;
        setTicking(true);

        const delay = SPEEDS[speedRef.current];

        // Phase 1 — Produce
        const afterProduce = applyProduce(currentGame);
        setGame(afterProduce as GameState);

        // Phase 2 — Consume (after delay)
        setTimeout(() => {
            setGame(prev => {
                const withPool = { ...prev, _pool: (afterProduce as GameStateWithPool)._pool };
                return applyConsume(withPool as GameStateWithPool);
            });
            setTicking(false);
        }, delay);
    }

    // ── Auto tick ───────────────────────────────────────────────────────────

    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (mode === 'AUTO') {
            const totalCycle = SPEEDS[speed] * 2;
            autoRef.current = setInterval(() => {
                setGame(prev => {
                    if (tickingRef.current) return prev;
                    runAnimatedTick(prev);
                    return prev;
                });
            }, totalCycle);
        }
        return () => {
            if (autoRef.current) clearInterval(autoRef.current);
        };
    }, [mode, speed]);

    // ── Tax setters ─────────────────────────────────────────────────────────

    function setTax(field: keyof TaxSettings, value: number) {
        setGame(prev => ({
            ...prev,
            taxes: { ...prev.taxes, [field]: value },
        }));
    }

    // ── Derived ─────────────────────────────────────────────────────────────

    const lastReport     = game.history[game.history.length - 1];
    const treasuryDelta  = lastReport?.taxReport.total ?? 0;

    // ── Render ──────────────────────────────────────────────────────────────

    return (
        <div className={styles.root}>

            {/* ── Treasury bar ── */}
            <div className={styles.treasuryBar}>
                <span className={styles.treasuryLabel}>Treasury</span>
                <span className={styles.treasuryValue}>△ {game.treasury.toFixed(1)}</span>
                {lastReport && (
                    <span className={
                        treasuryDelta > 0 ? styles.deltaPos :
                        treasuryDelta < 0 ? styles.deltaNeg :
                        styles.deltaZero
                    }>
                        {treasuryDelta > 0 ? '+' : ''}{treasuryDelta.toFixed(1)}
                    </span>
                )}
                <div className={styles.taxSlots}>
                    {([ 
                        ['Income Tax',      'incomeTaxRate'],
                        ['Corporate Levy',  'citRate'],
                        ['Asset Levy',      'assetTaxRate'],
                    ] as [string, keyof TaxSettings][]).map(([label, field]) => (
                        <div key={field} className={styles.taxItem}>
                            <span className={styles.taxLabel}>{label}</span>
                            <span className={styles.taxValue}>
                                {(game.taxes[field] * 100).toFixed(0)}%
                            </span>
                            <input
                                type="range"
                                min={0} max={0.5} step={0.01}
                                value={game.taxes[field]}
                                onChange={e => setTax(field, parseFloat(e.target.value))}
                                className={styles.taxSlider}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Needs report ── */}
            {lastReport && (
                <div className={styles.needsBar}>
                    {lastReport.needsReport.map((r: NeedReport) => (
                        <span key={r.category}
                            className={r.met ? styles.needMet : styles.needUnmet}>
                            {r.category} {r.supplied}/{r.demanded}
                        </span>
                    ))}
                </div>
            )}

            {/* ── Panels ── */}
            <div className={styles.panels}>
                <VillagePanel
                    structure={game.village}
                    meanWages={game.meanWages}
                    taxRate={game.taxes.incomeTaxRate}
                />
                {game.industries.map((s, i) =>
                    isPublic(s)
                        ? <PublicPanel   key={i} structure={s} />
                        : <IndustryPanel key={i} structure={s} />
                )}
            </div>

            {/* ── Control panel — bottom left ── */}
            <div className={styles.controlPanel}>
                <div className={styles.tickInfo}>
                    <span className={styles.tickLabel}>Tick</span>
                    <span className={styles.tickValue}>{game.tick}</span>
                </div>

                <div className={styles.divider} />

                <div className={styles.speedButtons}>
                    {SPEED_LABELS.map(label => (
                        <button
                            key={label}
                            className={`${styles.speedBtn} ${speed === label ? styles.speedBtnActive : ''}`}
                            onClick={() => setSpeed(label)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className={styles.divider} />

                <div className={styles.modeButtons}>
                    <button
                        className={`${styles.modeBtn} ${mode === 'MANUAL' ? styles.modeBtnActive : ''}`}
                        onClick={() => setMode('MANUAL')}
                    >
                        Manual
                    </button>
                    <button
                        className={`${styles.modeBtn} ${mode === 'AUTO' ? styles.modeBtnActive : ''}`}
                        onClick={() => setMode('AUTO')}
                    >
                        Auto
                    </button>
                </div>

                {mode === 'MANUAL' && (
                    <button
                        className={styles.endTurnBtn}
                        onClick={() => runAnimatedTick(game)}
                        disabled={ticking}
                    >
                        {ticking ? '...' : 'End Turn'}
                    </button>
                )}
            </div>

        </div>
    );
}

export default App;