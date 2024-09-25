import { isObject, isFunction } from "./utils";
import { logValue } from "./log";
import type { ComparisonResult } from "./types";

// /**
//  * Deep compare and log the properties of 2 objects using reference equality
//  * @param  {Object}         previous    The previous object tree
//  * @param  {Object}         current     The current object tree
//  * @param  {String}         lastKey     The key of the parent object
//  */
// const handleNoKeys = (previous, current, lastKey) => {
//     // Handle the case where we have an empty object or array
//     const _isMatch = current === previous;

//     // Determine what types things are, taking into account
//     // we could be dealing with some array to object switcharoos
//     const isPreviousArray = Array.isArray(previous);
//     const isPreviousObject = isObject(previous);
//     const isCurrentArray = Array.isArray(current);
//     const isCurrentObject = isObject(current);

//     const previousValue = isPreviousArray ? "[]" :
//         isPreviousObject ? "{}" :
//             previous;

//     const currentValue = isCurrentArray ? "[]" :
//         isCurrentObject ? "{}" :
//             current;

//     logValue("this", previousValue, currentValue);

//     if (!_isMatch) {
//         const type = isPreviousArray && isCurrentArray ? "Array" :
//             isCurrentObject && isPreviousObject ? "Object" :
//                 (isPreviousArray && isCurrentObject || isCurrentArray && isPreviousObject) ? "Mixed" : "Primitive";

//         return { lastKey, type, isNonReferentiallyEqual: true };
//     }
// }

/**
 * Deep compare and log the properties of 2 objects using reference equality
 * @param  {Object}         previousProps    The previous object tree
 * @param  {Object}         currentProps     The current object tree
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @param  {String}         lastKey     The key of the parent object
 * @return {Array<Object>}              An array of fields that were mutated
 */
const deepCompare = (previousProps: any, currentProps: any, ignoreKeys: string[] = [], depth: number = 0, lastKey: string | undefined = undefined): Record<string, ComparisonResult> => {
    // Abort due to excessive depth
    if (depth > 100) {
        return {};
    }

    // Grab the current set of keys
    const keys = Object.keys(currentProps);
    const result: Record<string, ComparisonResult> = {};

    // Handle the case where we have an empty object or array
    // if (keys.length === 0) {
    //     const mutation = handleNoKeys();
    //     if (mutation) {
    //         mutations.push(mutation);
    //     }
    // }

    for (const _key of keys) {
        // Grab the values out
        const _path = lastKey ? [lastKey, _key].join(".") : _key;
        const _current = currentProps[_key];
        const _previous = previousProps ? previousProps[_key] : undefined;

        const _isObject = isObject(_current);
        const _isArray = Array.isArray(_current);
        const _isFunction = isFunction(_current);
        const _strictEqual = _current === _previous;
        const _type = _isArray ? "array" : _isObject ? "object" : typeof _current;

        // Recurse for nested objects, unless it's in the ignore list
        if (_isObject && !_isFunction) {
            if (ignoreKeys.includes(_key)) {
                // logValue(key, previous, current);

                // Record the object is different, but we're not sure if it's nonReferentiallyEqual
                // as we haven't recursed into it
                const item: ComparisonResult = {
                    _key,
                    _type,
                    _path,
                    _skipped: true,
                    _strictEqual,
                    // The object is either the same, or we don't know because we've not recursed into it
                    _looseEqual: _strictEqual || null,
                }

                result[_key] = item;

                continue;
            }

            // For an Object or array, start a new nested console group
            const matchText = _strictEqual ? "true values are indentical" : "false value has changed";
            const groupName = `${_key} (${matchText}) - ${_type}`;
            if (_strictEqual) {
                console.groupCollapsed(groupName);
            } else {
                console.group(groupName);
            }

            // Grab the set of mutations from the deepCompare
            const nested = deepCompare(_previous, _current, ignoreKeys, depth++, _path);
            const looseEqual = Object.values(nested).every(r => r.looseEqual);
            const item: ComparisonResult = {
                ...nested,
                _key,
                _type,
                _path,
                _strictEqual,
                _looseEqual: _strictEqual || looseEqual,
                _skipped: false,
            }

            result[_key] = item;

            console.groupEnd();
            continue;
        }

        const item: ComparisonResult = { 
            _key, 
            _type, 
            _previous, 
            _path,
            _current, 
            _strictEqual, 
            _looseEqual: _strictEqual,
            _skipped: false,
        };
        result[_key] = item;

        logValue(_key, _previous, _current);
    }

    return result;
};

export default deepCompare;
