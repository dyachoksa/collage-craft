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

/**
 * Returns true if the given string is a valid UUID, false otherwise.
 *
 * See https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
 * for more information about UUIDs.
 */
export function isUUID(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
