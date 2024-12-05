/**
 * Returns a new string with the first character of the given string capitalized.
 *
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('world') // 'World'
 * capitalize('hello world') // 'Hello world'
 */
export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
