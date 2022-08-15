export function isNumber(obj: unknown): obj is number {
    return typeof obj === 'number';
}

export function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}

export function isFunction(obj: unknown): obj is Function {
    return typeof obj === 'function';
}

export function isBoolean(obj: unknown): obj is boolean {
    return typeof obj === 'boolean';
}

export function isArray(obj: unknown): obj is Array<any> {
    return Array.isArray(obj);
}

export function isObject(obj: unknown): obj is object {
    return typeof obj === 'object';
}
