import { ComparisonResult } from "../types";
import { logMutation } from "./logMutation";

/**
 * Logs a full recording of the comparison results
 */
export const logResult = (component: string, result: Record<string, ComparisonResult>) => {
    console.groupCollapsed(`${component} rendered ${new Date().toLocaleTimeString()}`);

    logMutations(result);

    console.group("Breakdown");
    logBreakdown(result);
    console.groupEnd();
    

    console.groupEnd();
};

/**
 * Log the set of mutated fields
 */
const logMutations = (result: Record<string, ComparisonResult>) => {
    const flat = flattenObject(result);

    console.group(`The following mutations were detected: `);

    const mutated = flat.filter(f => f.looseEqual === false).forEach(f => logMutation(f));
    const refMutated = flat.filter(f => !f.strictEqual && f.looseEqual).forEach(f => logMutation(f));

    console.groupEnd();
}

/**
 * Log the full breakdown of state
 * @type {[type]}
 */
const logBreakdown = (result: Record<string, ComparisonResult>) => {


    console.log(result);

   
}

const flattenObject = (obj: Record<string, ComparisonResult>): ComparisonResult[] => {
    const nested = Object
        .keys(obj)
        .filter((key) => obj.hasOwnProperty(key) && typeof obj[key] === 'object');

    const current = obj.key ? [obj] : [];
    // @ts-ignore-error
    return [...current, ...nested.flatMap(key => flattenObject(obj[key]))];

}
