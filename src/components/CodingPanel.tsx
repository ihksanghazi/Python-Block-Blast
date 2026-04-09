import React, { useState, useEffect } from 'react';
import { Question } from '../game/types';

interface CodingPanelProps {
  question: Question;
  onSubmit: (answer: string) => boolean;
  wrongCount: number;
  showHint: boolean;
  timerSeconds: number | null;
  combo: number;
}

const labels = ['A', 'B', 'C', 'D'];

const KEYWORDS = new Set(['for', 'in', 'if', 'else', 'elif', 'while', 'def', 'return', 'import', 'from', 'class', 'and', 'or', 'not', 'is', 'True', 'False', 'None']);
const BUILTINS = new Set(['print', 'len', 'range', 'list', 'int', 'float', 'str', 'type', 'sum', 'max', 'min', 'abs', 'bool', 'sorted', 'join']);

function highlightPython(code: string) {
  const lines = code.split('\n');
  return lines.map((line, li) => {
    const prefix = li === 0 ? '>>> ' : '... ';
    const tokens: React.ReactNode[] = [];
    const regex = /("[^"]*"|'[^']*'|\b\d+\.?\d*\b|[a-zA-Z_]\w*|#.*|[^\s]|\s+)/g;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = regex.exec(line)) !== null) {
      const t = match[0];
      key++;
      if (/^["']/.test(t)) {
        // strings — orange
        tokens.push(<span key={key} style={{ color: 'hsl(30, 80%, 65%)' }}>{t}</span>);
      } else if (/^\d/.test(t)) {
        // numbers — cyan
        tokens.push(<span key={key} style={{ color: 'hsl(180, 70%, 65%)' }}>{t}</span>);
      } else if (t.startsWith('#')) {
        // comments — gray
        tokens.push(<span key={key} style={{ color: 'hsl(220, 10%, 45%)' }}>{t}</span>);
      } else if (KEYWORDS.has(t)) {
        // keywords — purple
        tokens.push(<span key={key} style={{ color: 'hsl(280, 70%, 70%)' }}>{t}</span>);
      } else if (BUILTINS.has(t)) {
        // builtins — blue
        tokens.push(<span key={key} style={{ color: 'hsl(200, 80%, 70%)' }}>{t}</span>);
      } else if (/^[a-zA-Z_]/.test(t)) {
        // identifiers — light blue
        tokens.push(<span key={key} style={{ color: 'hsl(200, 50%, 85%)' }}>{t}</span>);
      } else {
        // operators, punctuation, whitespace
        tokens.push(<span key={key} style={{ color: 'hsl(0, 0%, 85%)' }}>{t}</span>);
      }
    }
    return (
      <span key={li}>
        <span style={{ color: 'hsl(220, 10%, 45%)' }}>{prefix}</span>
        {tokens}
        {li < lines.length - 1 && '\n'}
      </span>
    );
  });
}

export default function CodingPanel({
  question,
  onSubmit,
  wrongCount,
  showHint,
  timerSeconds,
  combo,
}: CodingPanelProps) {
  const [feedback, setFeedback] = useState<{ index: number; correct: boolean } | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setFeedback(null);
    const opts = [...question.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(opts);
  }, [question.id]);

  const handleSelect = (option: string, index: number) => {
    if (feedback) return;
    const correct = onSubmit(option);
    setFeedback({ index, correct });
    setTimeout(() => setFeedback(null), 600);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      {/* Timer */}
      {timerSeconds !== null && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">⏱️ TIMER</span>
          <span
            className={`text-2xl font-black tabular-nums ${
              timerSeconds <= 5 ? 'text-destructive animate-pulse' : 'text-foreground'
            }`}
          >
            {timerSeconds}s
          </span>
        </div>
      )}

      {/* Combo */}
      {combo > 0 && (
        <div className="text-center text-sm font-bold" style={{ color: 'hsl(45 90% 55%)' }}>
          🔥 Combo x{combo}!
        </div>
      )}

      {/* Level badge */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
          Level {question.difficulty}
        </span>
        <span className="text-xs text-muted-foreground">
          {question.difficulty === 1 && 'Dasar'}
          {question.difficulty === 2 && 'List'}
          {question.difficulty === 3 && 'len() & range()'}
          {question.difficulty === 4 && 'Loop'}
          {question.difficulty === 5 && 'Kondisi'}
        </span>
      </div>

      {/* Question text */}
      <p className="text-sm font-medium text-foreground">{question.prompt}</p>

      {/* Terminal */}
      {question.code && (
        <div className="rounded-lg bg-[hsl(220,20%,10%)] p-4 font-mono text-sm">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(0,70%,55%)]" />
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(45,70%,55%)]" />
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(120,50%,50%)]" />
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
            {highlightPython(question.code)}
          </pre>
        </div>
      )}

      {/* Multiple choice */}
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((option, i) => {
          let btnClass =
            'w-full text-left rounded-lg border border-border bg-muted px-4 py-3 text-sm font-medium transition-all hover:bg-accent hover:border-accent cursor-pointer';

          if (feedback && feedback.index === i) {
            btnClass += feedback.correct
              ? ' bg-[hsl(120,50%,25%)] border-[hsl(120,50%,40%)] text-[hsl(120,80%,90%)]'
              : ' bg-[hsl(0,50%,25%)] border-[hsl(0,50%,40%)] text-[hsl(0,80%,90%)] animate-[shake_0.4s_ease-in-out]';
          }

          return (
            <button
              key={`${question.id}-${i}`}
              className={btnClass}
              onClick={() => handleSelect(option, i)}
              disabled={feedback !== null}
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-xs font-bold text-primary">
                {labels[i]}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Hint & wrong count */}
      <div className="flex flex-col gap-2">
        {showHint && (
          <div className="rounded-lg border border-border bg-accent/50 p-3 text-sm text-accent-foreground">
            💡 Hint: {question.hint}
          </div>
        )}
        {wrongCount > 0 && (
          <span className="text-xs text-muted-foreground">❌ Salah: {wrongCount}</span>
        )}
      </div>
    </div>
  );
}
