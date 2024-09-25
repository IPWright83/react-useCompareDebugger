import React, { useRef } from "react";

import deepCompare from "./deepCompare";
import { logResult, logMutation } from "./log";
import { styles } from "./styles";

/**
 * Debug state changes
 * @param  {String}         component   The name of the component you are testing
 * @param  {Object}         value       The current props
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @return {Object}                     The old props
 */
function useCompareDebugger(component: string, value: any, ignoreKeys: any) {
    // @ts-expect-error
    if (process.env.NODE_ENV !== "development") {
        console.warn(
            `The useCompareDebugger should only be used when developing. It is still registered for ${component}`
        );
    }

    const ref = useRef();

    // Record the previous value so we can compare later
    // @ts-expect-error
    React.originalUseEffect(() => {
        ref.current = value;
    }, [value]);

    // Log the comparison to the console
    const result = deepCompare(ref.current, value, ignoreKeys);
    logResult(component, result);

    return ref.current;
}

export default useCompareDebugger;
