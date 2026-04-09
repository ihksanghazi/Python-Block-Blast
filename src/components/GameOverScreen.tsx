import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  score: number;
  questionsAnswered: number;
  linesCleared: number;
  level: number;
  onRestart: () => void;
}

export default function GameOverScreen({
  score,
  questionsAnswered,
  linesCleared,
  level,
  onRestart,
}: GameOverScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">🎮</div>
        <h2 className="mb-2 text-4xl font-black text-foreground">Game Over!</h2>
        <p className="text-muted-foreground">Hasil permainanmu:</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {[
          { label: 'Skor', value: score, emoji: '⭐' },
          { label: 'Level', value: level, emoji: '📊' },
          { label: 'Soal Dijawab', value: questionsAnswered, emoji: '✅' },
          { label: 'Baris Dihapus', value: linesCleared, emoji: '💥' },
        ].map(s => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-xl border border-border bg-card p-4"
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-2xl font-black text-foreground">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      <Button onClick={onRestart} size="lg" className="mt-4 text-lg px-8">
        Main Lagi 🔄
      </Button>
    </div>
  );
}
