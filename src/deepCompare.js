import isObject from "./isObject";
import logValue from "./logValue";
import isFunction from "./isFunction";

/**
 * Deep compare and log the properties of 2 objects using reference equality
 * @param  {Object}         previous    The previous object tree
 * @param  {Object}         current     The current object tree
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @return {Array<Object>}              An array of fields that were mutated
 */
const deepCompare = (previous, current, ignoreKeys = [], depth = 0) => {
    // Grab the current set of keys
    const keys = Object.keys(current);
    const mutations = [];

    for (const key of keys) {
        // Grab the values out
        const currentValue = current[key];
        const previousValue = previous ? previous[key] : undefined;

        const _isObject = isObject(currentValue);
        const _isFunction = isFunction(currentValue);
        const _isMatch = currentValue === previousValue;

        // Recurse for nested objects, unless it's in the ignore list
        if (_isObject && !_isFunction) {
            if (ignoreKeys.includes(key)) {
                logValue(key, previousValue, currentValue);

                // Record the object is different, but we're not sure if it's nonReferentiallyEqual
                // as we haven't recursed into it
                if (_isMatch === false) {
                    mutations.push({ key, type: "Object", isNonReferentiallyEqual: false });
                }

                continue;
            }

            console.group(`${key} ${_isMatch}`);

            // Grab the set of mutations from the deepCompare
            const objMutations = deepCompare(previousValue, currentValue, depth++);
            if (objMutations.length === 0 && _isMatch === false) {
                mutations.push({ key, type: "Object", isNonReferentiallyEqual: true });
            } else {
                mutations.push(...objMutations.map((o) => ({ ...o, key: `${key}.${o.key}` })));
            }

            console.groupEnd();
            continue;
        }

        // Ignore some keys
        logValue(key, previousValue, currentValue);

        // Add to the list of mutations
        if (currentValue !== previousValue) {
            // If this is a function, determine if it is essentially the same
            if (_isFunction) {
                const currentF = (currentValue || "").toString();
                const previousF = (previousValue || "").toString();
                mutations.push({
                    key,
                    type: "Function",
                    isNonReferentiallyEqual: currentF == previousF,
                });
                continue;
            }

            mutations.push({ key, type: "Primitive" });
        }
    }

    return mutations;
};

export default deepCompare;
