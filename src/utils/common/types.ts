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

export function isNullOrUndefined<T>(obj: T | undefined|null): obj is T{
    return obj===null || obj===undefined;
}

export function isDefined<T>(obj: T | undefined): obj is T{
    return obj!==undefined;
}

export function isNotNull<T>(obj: T | null): obj is T{
    return obj!==null;
}

export type ItemOfArray<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
