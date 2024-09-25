"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMutation = void 0;
const styles_1 = require("../styles");
/**
 * Logs a value that has mutated to the console
 */
const logMutation = (result) => {
    var _a, _b, _c, _d;
    switch (result.type) {
        case "array":
        case "object":
            // If the object/array is not strictly equal but looks the same, that was likely an
            // unintended mutation so we'll let the user know
            if (result.strictEqual === false && result.looseEqual) {
                console.log(`%c${(_a = result.path) !== null && _a !== void 0 ? _a : result.key} - %cWARNING This is a new ${result.type} reference that looks identical to the previous. You may want to wrap this object within a useMemo hook.`, styles_1.styles.mutations.key, styles_1.styles.mutations.error);
            }
            else if (result.skipped) {
                // As some items were skipped, we can't be certain if this was an actual mutation or an accidental reference change
                console.log(`%c${result.key} - %cWARNING This ${result.type} may be the same as the previous, however some fields were ignored in the comparison`, styles_1.styles.mutations.key, styles_1.styles.mutations.warning);
            }
            break;
        case "function":
            // This is bad, the same function string but a different reference
            if ((result.looseEqual && !result.strictEqual) || result.isNonReferentiallyEqual) {
                console.log(`%c${(_b = result.path) !== null && _b !== void 0 ? _b : result.key} - %cWARNING This is a new function that looks identical to the previous. You may want to wrap this function within a useCallback hook.`, styles_1.styles.mutations.key, styles_1.styles.mutations.error);
            }
            else {
                console.log(`%c${(_c = result.path) !== null && _c !== void 0 ? _c : result.key}`, styles_1.styles.mutations.key);
                break;
            }
            break;
        default:
            console.log(`%c${(_d = result.path) !== null && _d !== void 0 ? _d : result.key}`, styles_1.styles.mutations.key);
            break;
    }
};
exports.logMutation = logMutation;
