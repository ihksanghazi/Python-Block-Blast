export type GameMode = 'classic' | 'challenge' | 'hardcore';
export type GamePhase = 'menu' | 'coding' | 'placing' | 'gameover';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  prompt: string;
  code?: string;
  options: string[];
  expectedAnswers: string[];
  hint: string;
  difficulty: Difficulty;
  blockType: 'small' | 'medium' | 'large' | 'l-shape' | 't-shape';
}

export interface BlockShape {
  cells: [number, number][];
  color: string;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode;
  grid: (string | null)[][];
  score: number;
  level: Difficulty;
  combo: number;
  currentQuestion: Question | null;
  currentBlock: BlockShape | null;
  wrongCount: number;
  showHint: boolean;
  questionsAnswered: number;
  linesCleared: number;
  timerSeconds: number | null;
}
