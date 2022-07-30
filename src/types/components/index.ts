import type { ObjectEmitsOptions } from "vue";
import type { UnionToIntersection } from "@vue/shared";

export declare type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{
    [key in Event]: Options[key] extends (...args: infer Args) => any ? (event: key, ...args: Args) => void : (event: key, ...args: any[]) => void;
}[Event]>;