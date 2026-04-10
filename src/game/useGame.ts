import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, GameMode, GamePhase, Difficulty, BlockShape } from './types';
import { questions } from './questions';
import { generateBlock, canPlaceBlock, placeBlock, clearLines, hasValidPlacement, createEmptyGrid, getClearingCells } from './blocks';
import { validateAnswer } from './validation';

function getQuestionForLevel(level: Difficulty, exclude: Set<string>) {
  const pool = questions.filter(q => q.difficulty <= level && !exclude.has(q.id));
  if (pool.length === 0) {
    const fallback = questions.filter(q => q.difficulty <= level);
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function getLevelFromScore(score: number): Difficulty {
  if (score >= 2000) return 5;
  if (score >= 1200) return 4;
  if (score >= 600) return 3;
  if (score >= 200) return 2;
  return 1;
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    phase: 'menu',
    mode: 'classic',
    grid: createEmptyGrid(),
    score: 0,
    level: 1,
    combo: 0,
    currentQuestion: null,
    currentBlock: null,
    wrongCount: 0,
    showHint: false,
    questionsAnswered: 0,
    linesCleared: 0,
    timerSeconds: null,
    clearingCells: null,
  });

  const askedRef = useRef(new Set<string>());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback((seconds: number) => {
    clearTimer();
    setState(s => ({ ...s, timerSeconds: seconds }));
    timerRef.current = setInterval(() => {
      setState(s => {
        if (s.timerSeconds === null || s.timerSeconds <= 1) {
          clearTimer();
          
          if (s.mode === 'challenge' || s.mode === 'hardcore') {
            return { ...s, phase: 'gameover', timerSeconds: 0 };
          }

          // Fallback logic (should not be reached in timed modes)
          const q = getQuestionForLevel(s.level, askedRef.current);
          if (q) askedRef.current.add(q.id);
          return {
            ...s,
            currentQuestion: q,
            wrongCount: 0,
            showHint: false,
            combo: 0,
          };
        }
        return { ...s, timerSeconds: s.timerSeconds - 1 };
      });
    }, 1000);
  }, [clearTimer]);

  const startGame = useCallback((mode: GameMode) => {
    askedRef.current.clear();
    const q = getQuestionForLevel(1, askedRef.current);
    if (q) askedRef.current.add(q.id);

    const timerSec = mode === 'challenge' ? 30 : mode === 'hardcore' ? 15 : null;

    setState({
      phase: 'coding',
      mode,
      grid: createEmptyGrid(),
      score: 0,
      level: 1,
      combo: 0,
      currentQuestion: q,
      currentBlock: null,
      wrongCount: 0,
      showHint: false,
      questionsAnswered: 0,
      linesCleared: 0,
      timerSeconds: timerSec,
    });

    if (timerSec) startTimer(timerSec);
  }, [startTimer]);

  const submitAnswer = useCallback((answer: string): boolean => {
    const q = state.currentQuestion;
    if (!q) return false;

    if (validateAnswer(answer, q.expectedAnswers)) {
      clearTimer();
      const block = generateBlock(q.blockType);
      setState(s => ({
        ...s,
        phase: 'placing',
        currentBlock: block,
        wrongCount: 0,
        showHint: false,
        questionsAnswered: s.questionsAnswered + 1,
      }));
      return true;
    } else {
      if (state.mode === 'hardcore') {
        clearTimer();
        setState(s => ({ ...s, phase: 'gameover' }));
        return false;
      }
      setState(s => {
        const wc = s.wrongCount + 1;
        return {
          ...s,
          wrongCount: wc,
          showHint: wc >= 3,
          combo: 0,
        };
      });
      return false;
    }
  }, [state.currentQuestion, state.mode, clearTimer]);

  const placeBlockOnGrid = useCallback((row: number, col: number): boolean => {
    if (!state.currentBlock) return false;
    if (!canPlaceBlock(state.grid, state.currentBlock, row, col)) return false;

    const placed = placeBlock(state.grid, state.currentBlock, row, col);
    const clearingCells = getClearingCells(placed);
    const { newGrid, cleared } = clearLines(placed);

    const newScore = state.score + (cleared > 0 ? cleared * 100 * (state.combo + 1) : 10);
    const newCombo = cleared > 0 ? state.combo + 1 : state.combo;
    const newLevel = getLevelFromScore(newScore);
    const newLinesCleared = state.linesCleared + cleared;

    // Get next question
    const q = getQuestionForLevel(newLevel, askedRef.current);
    
    if (cleared > 0) {
      // First show the placing
      setState(s => ({
        ...s,
        grid: placed,
        clearingCells: clearingCells,
      }));

      // Then after animation, update everything
      setTimeout(() => {
        if (q) askedRef.current.add(q.id);
        const timerSec = state.mode === 'challenge' ? 30 : state.mode === 'hardcore' ? 15 : null;

        setState(s => ({
          ...s,
          grid: newGrid,
          score: newScore,
          combo: newCombo,
          level: newLevel,
          linesCleared: newLinesCleared,
          phase: 'coding',
          currentBlock: null,
          currentQuestion: q,
          wrongCount: 0,
          showHint: false,
          timerSeconds: timerSec,
          clearingCells: null,
        }));
        if (timerSec) startTimer(timerSec);
      }, 500); // 500ms animation duration
    } else {
      if (q) askedRef.current.add(q.id);
      const timerSec = state.mode === 'challenge' ? 30 : state.mode === 'hardcore' ? 15 : null;

      setState(s => ({
        ...s,
        grid: newGrid,
        score: newScore,
        combo: newCombo,
        level: newLevel,
        linesCleared: newLinesCleared,
        phase: 'coding',
        currentBlock: null,
        currentQuestion: q,
        wrongCount: 0,
        showHint: false,
        timerSeconds: timerSec,
        clearingCells: null,
      }));
      if (timerSec) startTimer(timerSec);
    }

    return true;
  }, [state, startTimer]);

  const checkGameOver = useCallback((block: BlockShape) => {
    if (!hasValidPlacement(state.grid, block)) {
      clearTimer();
      setState(s => ({ ...s, phase: 'gameover' }));
    }
  }, [state.grid, clearTimer]);

  // Check game over when block is set
  useEffect(() => {
    if (state.phase === 'placing' && state.currentBlock) {
      checkGameOver(state.currentBlock);
    }
  }, [state.phase, state.currentBlock, checkGameOver]);

  const goToMenu = useCallback(() => {
    clearTimer();
    setState(s => ({ ...s, phase: 'menu' }));
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    state,
    startGame,
    submitAnswer,
    placeBlockOnGrid,
    goToMenu,
  };
}
