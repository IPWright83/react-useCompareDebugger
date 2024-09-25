"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logValue = void 0;
const styles_1 = require("../styles");
const utils_1 = require("../utils");
/**
 * Gets the format of a value
 * @param  {Any}    value       The value to format
 * @return {String}             The value for logging
 */
const getFormat = (value) => {
    if ((0, utils_1.isFunction)(value)) {
        return "Function";
    }
    if ((0, utils_1.isObject)(value)) {
        return "Object";
    }
    return value;
};
/**
 * Log a primitive value to the console
 * @param  {String} key         The key of the values being compared
 * @param  {Any}    previous    The previous value
 * @param  {Any}    current     The current value
 */
const logValue = (key, previous, current) => {
    const areReferentiallyEqual = previous === current;
    const nextStyle = areReferentiallyEqual ? styles_1.styles.prevStyle : styles_1.styles.nextStyle;
    const matchStyle = areReferentiallyEqual ? styles_1.styles.matchStyle : styles_1.styles.unmatchStyle;
    const identicalText = areReferentiallyEqual ? "values are indentical" : "value has changed";
    console.log(`%c${key}: %c${getFormat(previous)} %c=== %c${getFormat(current)} %c(%c${areReferentiallyEqual}%c ${identicalText})`, styles_1.styles.keyStyle, styles_1.styles.prevStyle, styles_1.styles.arrowStyle, nextStyle, styles_1.styles.arrowStyle, matchStyle, styles_1.styles.arrowStyle);
};
exports.logValue = logValue;
