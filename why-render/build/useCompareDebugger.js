"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const deepCompare_1 = __importDefault(require("./deepCompare"));
const log_1 = require("./log");
/**
 * Debug state changes
 * @param  {String}         component   The name of the component you are testing
 * @param  {Object}         value       The current props
 * @param  {Array<String>}  ignoreKeys  Any fields to ignore recursing into
 * @return {Object}                     The old props
 */
function useCompareDebugger(component, value, ignoreKeys) {
    // @ts-expect-error
    if (process.env.NODE_ENV !== "development") {
        console.warn(`The useCompareDebugger should only be used when developing. It is still registered for ${component}`);
    }
    const ref = (0, react_1.useRef)();
    // Record the previous value so we can compare later
    // @ts-expect-error
    react_1.default.originalUseEffect(() => {
        ref.current = value;
    }, [value]);
    // Log the comparison to the console
    const result = (0, deepCompare_1.default)(ref.current, value, ignoreKeys);
    (0, log_1.logResult)(component, result);
    return ref.current;
}
exports.default = useCompareDebugger;
