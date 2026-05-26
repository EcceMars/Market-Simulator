import React from 'react';
import desertTile from './assets/imgs/map_design/tiles/desert.png';
import grassTile from './assets/imgs/map_design/tiles/grass.png';
import snowTile from './assets/imgs/map_design/tiles/snow.png';

interface Tile {
    id: string;
    type: 'grass' | 'desert' | 'snow';
    q: number;
    r: number;
    s: number;
}

const TILE_WIDTH = 70;
const TILE_HEIGHT = 80;
const WALL_HEIGHT = 18;
const TILE_GAP = 3;

const TILE_IMGS = {
    grass: grassTile,
    desert: desertTile,
    snow: snowTile
};

const SEVEN_TILES: Tile[] = [
    { id: 'center', type: 'grass', q: 0, r: 0, s: 0 },
    { id: 'top', type: 'grass', q: 0, r: -1.0, s: 1 },
    { id: 'top-right', type: 'desert', q: 0.85, r: -0.55, s: 0.35 },
    { id: 'bottom-right', type: 'grass', q: 0.85, r: 0.55, s: -0.35 },
    { id: 'bottom-left', type: 'grass', q: -0.85, r: 0.55, s: 0.35 },
    { id: 'top-left', type: 'desert', q: -0.85, r: -0.55, s: 0 },
    { id: 'bottom', type: 'grass', q: 0, r: 1, s: -1 },
];

const axialToPixel = (q: number, r: number): { x: number; y: number } => {
    const horizontalSpacing = TILE_WIDTH + TILE_GAP;
    const x = q * horizontalSpacing;
    
    const verticalSpacing = TILE_HEIGHT - WALL_HEIGHT + TILE_GAP;
    const y = r * verticalSpacing;
    
    return { x, y };
};

const getRenderOrder = (tiles: Tile[]): Tile[] => {
    return [...tiles].sort((a, b) => {
        const posA = axialToPixel(a.q, a.r);
        const posB = axialToPixel(b.q, b.r);
        
        if (posA.y !== posB.y) return posA.y - posB.y;
        return posA.x - posB.x;
    });
};

const HexMap7: React.FC = () => {
    const [hoveredTile, setHoveredTile] = React.useState<string | null>(null);
    
    const orderedTiles = getRenderOrder(SEVEN_TILES);
    
    const bounds = React.useMemo(() => {
        const points = SEVEN_TILES.map(t => axialToPixel(t.q, t.r));
        const xs = points.map(p => p.x);
        const ys = points.map(p => p.y);
        return {
            minX: Math.min(...xs),
            maxX: Math.max(...xs) + TILE_WIDTH,
            minY: Math.min(...ys),
            maxY: Math.max(...ys) + TILE_HEIGHT,
        };
    }, []);
    
    const offsetX = (600 - (bounds.maxX - bounds.minX)) / 2 - bounds.minX;
    const offsetY = (500 - (bounds.maxY - bounds.minY)) / 2 - bounds.minY;
    
    return (
        <div style={{ 
            padding: '20px', 
            background: '#1a1a1a', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <h2 style={{ color: 'white', marginBottom: '8px' }}>
                7-Tile Hexagon Map
            </h2>
            <p style={{ color: '#aaa', marginBottom: '20px', fontSize: '14px' }}>
                Gap: {TILE_GAP}px | Overlap: {WALL_HEIGHT}px | Render order: back → front
            </p>
            
            <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '20px',
            }}>
                <svg
                    width="600"
                    height="500"
                    viewBox="0 0 600 500"
                    style={{ 
                        background: '#31323e',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <g transform={`translate(${offsetX}, ${offsetY})`}>
                        {orderedTiles.map((tile) => {
                            const { x, y } = axialToPixel(tile.q, tile.r);
                            const isHovered = hoveredTile === tile.id;
                            const tileImage = TILE_IMGS[tile.type];
                            
                            return (
                                <g
                                    key={tile.id}
                                    transform={`translate(${x}, ${y})`}
                                    onMouseEnter={() => setHoveredTile(tile.id)}
                                    onMouseLeave={() => setHoveredTile(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* Your actual tile image */}
                                    <image
                                        href={tileImage}
                                        x="0"
                                        y="0"
                                        width={TILE_WIDTH}
                                        height={TILE_HEIGHT}
                                        preserveAspectRatio="none"
                                        imageRendering="pixelated"
                                        style={{
                                            filter: isHovered ? 'brightness(1.5)' : 'none',
                                            transition: 'filter 0.2s ease'
                                        }}
                                    />
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default HexMap7;