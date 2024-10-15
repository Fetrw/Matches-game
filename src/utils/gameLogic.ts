export const makeOptimalMove = (matches: number, m: number): number => {
  const optimalTake =
    (matches - 3) % (m + 1) === 0 || (matches - 3) % (m + 1) === 1 ? 3 : 1;
  return limitValue(optimalTake, 1, Math.min(m, matches));
};

export const findWinningMove = (
  maxMatches: number,
  matches: number,
  computerMatches: number
): number => {
  for (let i = 1; i <= maxMatches; i++) {
    if (matches - i === 0 || matches - i === 1) {
      if ((computerMatches + i) % 2 === 0) {
        return limitValue(i, 1, matches);
      }
    }
  }
  return 0;
};

export const limitValue = (
  number: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(number, min), max);
};
