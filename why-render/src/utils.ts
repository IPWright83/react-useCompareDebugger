/**
 * Determine if a given value is a Function
 */
export const isFunction = (value: any) => value && {}.toString.call(value) === "[object Function]";

/**
 * Determine if a given value is an Object
 */
export const isObject = (value: any) => value ? typeof value === "object" : false;
