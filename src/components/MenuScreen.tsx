import { GameMode } from '../game/types';

interface MenuScreenProps {
  onStart: (mode: GameMode) => void;
}

const modes: { mode: GameMode; label: string; desc: string; emoji: string }[] = [
  { mode: 'classic', label: 'Classic', desc: 'Santai, tanpa timer', emoji: '📚' },
  { mode: 'challenge', label: 'Challenge', desc: 'Speed Run: 30 Detik', emoji: '⏱️' },
  { mode: 'hardcore', label: 'Hardcore', desc: 'Mode Pro: 15 Detik', emoji: '🔥' },
];

export default function MenuScreen({ onStart }: MenuScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-4">
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-black tracking-tight sm:text-6xl">
          <span style={{ color: 'hsl(210 80% 60%)' }}>Python</span>{' '}
          <span style={{ color: 'hsl(45 90% 55%)' }}>Block</span>{' '}
          <span className="text-foreground">Blast</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Belajar Python lewat puzzle! 🐍
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {modes.map((m) => (
          <button
            key={m.mode}
            onClick={() => onStart(m.mode)}
            className="group relative flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 text-left transition-all hover:border-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-3xl">{m.emoji}</span>
            <div>
              <div className="text-lg font-bold text-card-foreground">{m.label}</div>
              <div className="text-sm text-muted-foreground">{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <footer className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Made with ❤️ for Learning Python</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ihksanghazi/Python-Block-Blast"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground hover:underline"
          >
            GitHub Repository
          </a>
          <span className="opacity-20">|</span>
          <span>© 2026 Python Block Blast</span>
        </div>
      </footer>
    </div>
  );
}
