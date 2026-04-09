import { BlockShape } from '../game/types';

interface BlockPreviewProps {
  block: BlockShape;
}

export default function BlockPreview({ block }: BlockPreviewProps) {
  const maxR = Math.max(...block.cells.map(c => c[0])) + 1;
  const maxC = Math.max(...block.cells.map(c => c[1])) + 1;

  const cellSet = new Set(block.cells.map(([r, c]) => `${r},${c}`));

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4">
      <span className="text-xs font-semibold text-muted-foreground">🧩 BLOK DIDAPAT</span>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${maxC}, 28px)`,
          gridTemplateRows: `repeat(${maxR}, 28px)`,
        }}
      >
        {Array.from({ length: maxR * maxC }, (_, i) => {
          const r = Math.floor(i / maxC);
          const c = i % maxC;
          const filled = cellSet.has(`${r},${c}`);
          return (
            <div
              key={i}
              className="rounded-sm transition-all"
              style={{
                backgroundColor: filled ? `hsl(${block.color})` : 'transparent',
                boxShadow: filled ? `inset 0 -2px 4px rgba(0,0,0,0.2)` : 'none',
              }}
            />
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">Klik grid untuk menempatkan</span>
    </div>
  );
}
