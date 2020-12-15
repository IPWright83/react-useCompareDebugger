import styles from "./styles";
import isObject from "./isObject";
import isFunction from "./isFunction";

/**
 * Gets the format of a value
 * @param  {Any}    value       The value to format
 * @return {String}             The value for logging
 */
const getFormat = value => {
    if (isFunction(value)) {
        return "Function";
    }

    if (isObject(value)) {
        return "Object";
    }

    return value;
}

/**
 * Log a primitive value to the console
 * @param  {String} key         The key of the values being compared
 * @param  {Any}    previous    The previous value
 * @param  {Any}    current     The current value
 */
const logValue = (key, previous, current) => {
    const areReferentiallyEqual = previous === current;
    const matchStyle = areReferentiallyEqual ? styles.matchStyle : styles.unmatchStyle;

    console.log(
        `%c${key}: %c${getFormat(previous)} %c=== %c${getFormat(current)} %c${areReferentiallyEqual}`,
        styles.keyStyle,
        styles.prevStyle,
        styles.arrowStyle,
        styles.nextStyle,
        matchStyle
    );
};

export default logValue;
