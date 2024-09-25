type NestedFields = Record<string, unknown>;

export type ComparisonResult = {
    /** Name of the field */
    _key: string;
    /** Type of the field being checked */
    _type: "array" | "object" | "function" | "string" | "number" | "boolean" | "undefined" | "null" | "bigint" | "symbol",
    /** The full path to the field for a nested object */
    _path: string;
    /** Whether some fields in the object have been skipped */
    _skipped: boolean;
    /** Whether the two values are strictly equal */
    _strictEqual: boolean;
    /** Whether the values look equal, even though they're not equal referentially */
    _looseEqual: boolean | null;
    /** The previous value */
    _previous?: any;
    /** The current value */
    _current?: any;
} & NestedFields;
