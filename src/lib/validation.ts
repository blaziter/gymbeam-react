/**
 * Checks if a value has value and is not null or undefined.
 */
export const isDefined = <T>(
    value: T | null | undefined
): value is NonNullable<T> => value !== undefined && value !== null;

/**
 * Checks if a value is an empty string.
 */
export const isEmptyString = (value: string | undefined): boolean =>
    isDefined(value) && value.trim() === '';
