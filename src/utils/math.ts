export const sum = (arr: number[]): number => arr.reduce(add, 0); // with initial value to avoid when the array is empty

export function add(accumulator: number, n: number): number {
  return accumulator + n;
}
