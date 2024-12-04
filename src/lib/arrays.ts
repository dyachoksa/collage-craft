/**
 * Shuffles an array and returns a new array.
 */
export function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * Generates a sequence of numbers from 1 to the given length.
 */
export function makeSequence(length: number): number[] {
  return Array.from({ length }, (_, index) => index + 1);
}
