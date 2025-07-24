/**
 * Utility function for exhaustive checking in TypeScript
 * Use this in switch statements to ensure all cases are handled
 * @param value - Should be of type 'never' if all cases are properly handled
 * @throws Error if this function is ever reached at runtime
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
