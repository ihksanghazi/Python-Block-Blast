import { BlockShape } from './types';

const BLOCK_COLORS = [
  '142 70% 55%',  // green
  '200 80% 55%',  // blue
  '45 90% 55%',   // yellow
  '280 65% 55%',  // purple
  '15 85% 55%',   // orange
  '340 75% 55%',  // pink
  '180 60% 50%',  // teal
];

function randomColor(): string {
  return BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
}

export function generateBlock(blockType: string): BlockShape {
  const color = randomColor();

  switch (blockType) {
    case 'small':
      return {
        cells: Math.random() > 0.5
          ? [[0, 0], [0, 1]]
          : [[0, 0]],
        color,
      };
    case 'medium':
      return {
        cells: [[0, 0], [0, 1], [0, 2]],
        color,
      };
    case 'large':
      return {
        cells: [[0, 0], [0, 1], [0, 2], [0, 3]],
        color,
      };
    case 'l-shape':
      return {
        cells: [[0, 0], [1, 0], [1, 1], [1, 2]],
        color,
      };
    case 't-shape':
      return {
        cells: [[0, 0], [0, 1], [0, 2], [1, 1]],
        color,
      };
    default:
      return { cells: [[0, 0]], color };
  }
}

export function canPlaceBlock(
  grid: (string | null)[][],
  block: BlockShape,
  row: number,
  col: number,
): boolean {
  for (const [dr, dc] of block.cells) {
    const r = row + dr;
    const c = col + dc;
    if (r < 0 || r >= 8 || c < 0 || c >= 8) return false;
    if (grid[r][c] !== null) return false;
  }
  return true;
}

export function placeBlock(
  grid: (string | null)[][],
  block: BlockShape,
  row: number,
  col: number,
): (string | null)[][] {
  const newGrid = grid.map(r => [...r]);
  for (const [dr, dc] of block.cells) {
    newGrid[row + dr][col + dc] = block.color;
  }
  return newGrid;
}

export function clearLines(grid: (string | null)[][]): {
  newGrid: (string | null)[][];
  cleared: number;
} {
  const rowsToClear = new Set<number>();
  const colsToClear = new Set<number>();

  for (let r = 0; r < 8; r++) {
    if (grid[r].every(c => c !== null)) rowsToClear.add(r);
  }
  for (let c = 0; c < 8; c++) {
    if (grid.every(row => row[c] !== null)) colsToClear.add(c);
  }

  if (rowsToClear.size === 0 && colsToClear.size === 0) {
    return { newGrid: grid, cleared: 0 };
  }

  const newGrid = grid.map(r => [...r]);
  for (const r of rowsToClear) {
    for (let c = 0; c < 8; c++) newGrid[r][c] = null;
  }
  for (const c of colsToClear) {
    for (let r = 0; r < 8; r++) newGrid[r][c] = null;
  }

  return { newGrid, cleared: rowsToClear.size + colsToClear.size };
}

export function getClearingCells(grid: (string | null)[][]): [number, number][] {
  const rowsToClear = new Set<number>();
  const colsToClear = new Set<number>();

  for (let r = 0; r < 8; r++) {
    if (grid[r].every(c => c !== null)) rowsToClear.add(r);
  }
  for (let c = 0; c < 8; c++) {
    if (grid.every(row => row[c] !== null)) colsToClear.add(c);
  }

  const cells: [number, number][] = [];
  for (const r of rowsToClear) {
    for (let c = 0; c < 8; c++) cells.push([r, c]);
  }
  for (const c of colsToClear) {
    for (let r = 0; r < 8; r++) {
      if (!rowsToClear.has(r)) cells.push([r, c]);
    }
  }

  return cells;
}

export function hasValidPlacement(grid: (string | null)[][], block: BlockShape): boolean {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (canPlaceBlock(grid, block, r, c)) return true;
    }
  }
  return false;
}

export function createEmptyGrid(): (string | null)[][] {
  return Array.from({ length: 8 }, () => Array(8).fill(null));
}
