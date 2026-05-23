import { useState, useEffect, useRef } from 'react';
import type { GameState } from './sim/Tick';
import type { StructureObj } from './components/data/StructureObj';
import { runTick } from './sim/Tick';
import { Structures } from './components/data/ResourceRegistry';
import StructPanel from './components/panel/struct-panel/StructPanel';

type TickMode = 'MANUAL' | 'AUTO';
const AUTO_INTERVAL_MS = 1000;

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

const initialState: GameState = {
    tick: 0,
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
    industries: [
        makeIndustry('pasture', 100),
        makeIndustry('well',    100),
    ],
    history: [],
};

function App() {
    const [game, setGame]     = useState<GameState>(initialState);
    const [mode, setMode]     = useState<TickMode>('MANUAL');
    const intervalRef         = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto-tick
    useEffect(() => {
        if (mode === 'AUTO') {
            intervalRef.current = setInterval(() => {
                setGame(prev => runTick(prev));
            }, AUTO_INTERVAL_MS);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [mode]);

    function handleEndTurn() {
        setGame(prev => runTick(prev));
    }

    function toggleMode() {
        setMode(prev => prev === 'MANUAL' ? 'AUTO' : 'MANUAL');
    }

    const lastReport = game.history.at(-1);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>

            {/* Tick controls */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--soft-text)', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Tick {game.tick}
                </span>
                <button onClick={toggleMode}>
                    Mode: {mode}
                </button>
                {mode === 'MANUAL' && (
                    <button onClick={handleEndTurn}>End Turn</button>
                )}
            </div>

            {/* Last report — console placeholder until proper UI exists */}
            {lastReport && (
                <div style={{ fontSize: '0.75rem', color: 'var(--soft-text)' }}>
                    {lastReport.needsReport.map(r => (
                        <span key={r.category} style={{
                            marginRight: '1rem',
                            color: r.met ? 'var(--studio-text)' : 'var(--critical-color)',
                        }}>
                            {r.category} {r.supplied}/{r.demanded}
                        </span>
                    ))}
                </div>
            )}

            {/* Structure panels */}
            {game.industries.map((s, i) => (
                <StructPanel key={i} structure={s} />
            ))}
        </div>
    );
}

export default App;