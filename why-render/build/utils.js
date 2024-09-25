"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isFunction = void 0;
/**
 * Determine if a given value is a Function
 */
const isFunction = (value) => value && {}.toString.call(value) === "[object Function]";
exports.isFunction = isFunction;
/**
 * Determine if a given value is an Object
 */
const isObject = (value) => value ? typeof value === "object" : false;
exports.isObject = isObject;
