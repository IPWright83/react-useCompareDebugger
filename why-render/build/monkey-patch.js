"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const { useState, useEffect, useLayoutEffect, useMemo } = react_1.default;
// @ts-expect-error
react_1.default.originalUseState = useState;
// @ts-expect-error
react_1.default.originalUseEffect = useEffect;
react_1.default.useState = (...args) => {
    // @ts-expect-error
    return react_1.default.originalUseState(...args);
};
react_1.default.useEffect = (...args) => {
    // @ts-expect-error
    return react_1.default.originalUseEffect(...args);
};
