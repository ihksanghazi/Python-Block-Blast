import { useGame } from '../game/useGame';
import MenuScreen from '@/components/MenuScreen';
import GameOverScreen from '@/components/GameOverScreen';
import CodingPanel from '@/components/CodingPanel';
import GameGrid from '@/components/GameGrid';
import BlockPreview from '@/components/BlockPreview';
import { Button } from '@/components/ui/button';

const GameScreen = () => {
  const { state, startGame, submitAnswer, placeBlockOnGrid, goToMenu } = useGame();

  if (state.phase === 'menu') {
    return <MenuScreen onStart={startGame} />;
  }

  if (state.phase === 'gameover') {
    return (
      <GameOverScreen
        score={state.score}
        questionsAnswered={state.questionsAnswered}
        linesCleared={state.linesCleared}
        level={state.level}
        onRestart={goToMenu}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-black tracking-tight">
            <span style={{ color: 'hsl(210 80% 60%)' }}>Python</span>{' '}
            <span style={{ color: 'hsl(45 90% 55%)' }}>Block</span>{' '}
            <span className="text-foreground">Blast</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={goToMenu}>
            ← Menu
          </Button>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">SKOR</span>
            <span className="text-xl font-black tabular-nums text-foreground">{state.score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">LEVEL</span>
            <span className="text-xl font-black tabular-nums text-foreground">{state.level}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">BARIS</span>
            <span className="text-xl font-black tabular-nums text-foreground">{state.linesCleared}</span>
          </div>
        </div>
      </header>

      {/* Main Content - Desktop: grid left + coding right, Mobile: grid top + coding bottom */}
      <main className="flex flex-1 flex-col items-center gap-6 p-4 lg:flex-row lg:items-start lg:justify-center lg:gap-8 lg:p-8">
        {/* Grid (left on desktop, top on mobile) */}
        <div className="order-1">
          <GameGrid
            grid={state.grid}
            currentBlock={state.currentBlock}
            onPlace={placeBlockOnGrid}
            phase={state.phase}
          />
        </div>

        {/* Coding / Block Preview (right on desktop, bottom on mobile) */}
        <div className="order-2 w-full max-w-md">
          {state.phase === 'coding' && state.currentQuestion && (
            <CodingPanel
              question={state.currentQuestion}
              onSubmit={submitAnswer}
              wrongCount={state.wrongCount}
              showHint={state.showHint}
              timerSeconds={state.timerSeconds}
              combo={state.combo}
            />
          )}
          {state.phase === 'placing' && state.currentBlock && (
            <BlockPreview block={state.currentBlock} />
          )}
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
