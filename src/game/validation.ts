export function validateAnswer(input: string, expectedAnswers: string[]): boolean {
  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/'/g, '"');
  const normalizedInput = normalize(input);
  return expectedAnswers.some(a => normalize(a) === normalizedInput);
}
