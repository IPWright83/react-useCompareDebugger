"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logResult = void 0;
const logMutation_1 = require("./logMutation");
/**
 * Logs a full recording of the comparison results
 */
const logResult = (component, result) => {
    console.groupCollapsed(`${component} rendered ${new Date().toLocaleTimeString()}`);
    logMutations(result);
    console.group("Breakdown");
    logBreakdown(result);
    console.groupEnd();
    console.groupEnd();
};
exports.logResult = logResult;
/**
 * Log the set of mutated fields
 */
const logMutations = (result) => {
    const flat = flattenObject(result);
    console.group(`The following mutations were detected: `);
    const mutated = flat.filter(f => f.looseEqual === false).forEach(f => (0, logMutation_1.logMutation)(f));
    const refMutated = flat.filter(f => !f.strictEqual && f.looseEqual).forEach(f => (0, logMutation_1.logMutation)(f));
    console.groupEnd();
};
/**
 * Log the full breakdown of state
 * @type {[type]}
 */
const logBreakdown = (result) => {
    console.log(result);
};
const flattenObject = (obj) => {
    const nested = Object
        .keys(obj)
        .filter((key) => obj.hasOwnProperty(key) && typeof obj[key] === 'object');
    const current = obj.key ? [obj] : [];
    // @ts-ignore-error
    return [...current, ...nested.flatMap(key => flattenObject(obj[key]))];
};
