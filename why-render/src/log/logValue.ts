import { styles } from "../styles";
import { isObject, isFunction } from "../utils";

/**
 * Gets the format of a value
 * @param  {Any}    value       The value to format
 * @return {String}             The value for logging
 */
const getFormat = (value: any) => {
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
export const logValue = (key: string, previous: any, current: any) => {
    const areReferentiallyEqual = previous === current;
    const nextStyle = areReferentiallyEqual ? styles.prevStyle : styles.nextStyle;
    const matchStyle = areReferentiallyEqual ? styles.matchStyle : styles.unmatchStyle;
    const identicalText = areReferentiallyEqual ? "values are indentical" : "value has changed";

    console.log(
        `%c${key}: %c${getFormat(previous)} %c=== %c${getFormat(current)} %c(%c${areReferentiallyEqual}%c ${identicalText})`,
        styles.keyStyle,
        styles.prevStyle,
        styles.arrowStyle,
        nextStyle,
        styles.arrowStyle,
        matchStyle,
        styles.arrowStyle,
    );
};

