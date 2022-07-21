import { computed, ComputedRef } from "vue"
import { isBoolean, isFunction, isString } from "./types"
import * as CSS from 'csstype';

export class StyleBuilder {
    _constructorFunctions: Array<{
        name: keyof CSS.Properties | Function,
        value?: string | Function,
        condition?: boolean | Function
    }>

    constructor() {
        this._constructorFunctions = []
    }

    add(name: keyof CSS.Properties | Function, value?: string | Function, condition?: boolean | Function): StyleBuilder {
        this._constructorFunctions.push({
            name,
            value,
            condition
        })
        return this
    }

    computed() {
        const style = computed(() => {
            const style: Record<string,string> = {}
            for (let _style of this._constructorFunctions) {
                if (_style.condition !== undefined) {
                    if (isBoolean(_style.condition) && _style.condition === false) {
                        continue
                    } else if (isFunction(_style.condition) && _style.condition() === false) {
                        continue
                    }
                }
                let name: string | undefined = undefined
                if (isString(_style.name)) {
                    name = _style.name
                } else if (isFunction(_style.name)) {
                    name = _style.name()
                }
                let value: string | undefined = undefined
                if (isString(_style.value)) {
                    value = _style.value
                } else if (isFunction(_style.value)) {
                    value = _style.value()
                }
                if (isString(name) && isString(value))
                    style[name] = value;
            }
            return style;
        })
        return { style }
    }
}