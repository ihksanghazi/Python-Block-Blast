import { useState, useCallback } from 'react';
import { BlockShape } from '../game/types';
import { canPlaceBlock } from '../game/blocks';

interface GameGridProps {
  grid: (string | null)[][];
  currentBlock: BlockShape | null;
  onPlace: (row: number, col: number) => boolean;
  phase: string;
  clearingCells?: [number, number][] | null;
}

export default function GameGrid({ grid, currentBlock, onPlace, phase, clearingCells }: GameGridProps) {
  const [hover, setHover] = useState<[number, number] | null>(null);
  const isPlacing = phase === 'placing' && currentBlock;

  const isClearing = (r: number, c: number) => {
    return clearingCells?.some(([cr, cc]) => cr === r && cc === c);
  };

  const getHoverCells = useCallback((): Set<string> => {
    if (!hover || !currentBlock || !isPlacing) return new Set();
    const [hr, hc] = hover;
    if (!canPlaceBlock(grid, currentBlock, hr, hc)) return new Set();
    return new Set(currentBlock.cells.map(([dr, dc]) => `${hr + dr},${hc + dc}`));
  }, [hover, currentBlock, grid, isPlacing]);

  const hoverCells = getHoverCells();
  const isInvalid = hover && isPlacing && currentBlock && !canPlaceBlock(grid, currentBlock, hover[0], hover[1]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid gap-[2px] rounded-xl border-2 border-border bg-muted p-2"
        style={{
          gridTemplateColumns: 'repeat(8, 1fr)',
        }}
      >
        {grid.flatMap((row, r) =>
          row.map((cell, c) => {
            const key = `${r},${c}`;
            const isHovered = hoverCells.has(key);

            const isCellClearing = isClearing(r, c);

            return (
              <div
                key={key}
                className={`aspect-square w-8 cursor-pointer rounded-[4px] transition-all duration-100 sm:w-9 md:w-10 ${isCellClearing ? 'animate-clear z-10' : ''}`}
                style={{
                  backgroundColor: cell
                    ? `hsl(${cell})`
                    : isHovered
                      ? `hsl(${currentBlock!.color} / 0.5)`
                      : 'hsl(var(--background))',
                  boxShadow: cell && !isCellClearing
                    ? 'inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.2)'
                    : 'none',
                  border: isInvalid && isHovered
                    ? '2px solid hsl(var(--destructive))'
                    : 'none',
                  opacity: isCellClearing ? 0 : 1,
                  transform: isCellClearing ? 'scale(1.5)' : 'scale(1)',
                }}
                onMouseEnter={() => isPlacing && setHover([r, c])}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  if (isPlacing) onPlace(r, c);
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
