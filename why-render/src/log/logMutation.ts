import type { ComparisonResult } from "../types";
import { styles } from "../styles";

/**
 * Logs a value that has mutated to the console
 */
export const logMutation = (result: ComparisonResult) => {
    switch (result.type) {
        case "array":
        case "object":
            // If the object/array is not strictly equal but looks the same, that was likely an
            // unintended mutation so we'll let the user know
            if (result.strictEqual === false && result.looseEqual) {
                console.log(
                    `%c${result.path ?? result.key} - %cWARNING This is a new ${result.type} reference that looks identical to the previous. You may want to wrap this object within a useMemo hook.`,
                    styles.mutations.key,
                    styles.mutations.error
                );
            } else if (result.skipped) {
                // As some items were skipped, we can't be certain if this was an actual mutation or an accidental reference change
                console.log(
                    `%c${result.key} - %cWARNING This ${result.type} may be the same as the previous, however some fields were ignored in the comparison`,
                    styles.mutations.key,
                    styles.mutations.warning
                );
            }
            break;

        case "function":
            // This is bad, the same function string but a different reference
            if ((result.looseEqual && !result.strictEqual) || result.isNonReferentiallyEqual) {
                console.log(
                    `%c${result.path ?? result.key} - %cWARNING This is a new function that looks identical to the previous. You may want to wrap this function within a useCallback hook.`,
                    styles.mutations.key,
                    styles.mutations.error
                );
            } else {
                console.log(`%c${result.path ?? result.key}`, styles.mutations.key);
                break;
            }
            break;

        default:
            console.log(`%c${result.path ?? result.key}`, styles.mutations.key);
            break;
    }
};
