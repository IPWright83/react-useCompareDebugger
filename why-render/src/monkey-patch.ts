import React from "react";

const { useState, useEffect, useLayoutEffect, useMemo } = React;

// @ts-expect-error
React.originalUseState = useState;

// @ts-expect-error
React.originalUseEffect = useEffect;

React.useState = (...args: any[]) => {
    // @ts-expect-error
    return React.originalUseState(...args);
}

React.useEffect = (...args: any[]) => {
    // @ts-expect-error
    return React.originalUseEffect(...args);
}
