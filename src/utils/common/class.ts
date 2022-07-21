import { isBoolean, isFunction, isString } from "./types"
import { computed } from "vue"

export class ClassBuilder {
    _constructorFunctions: Array<{
        name: string | Function,
        value?: boolean | Function,
        condition?: boolean | Function
    }>

    constructor() {
        this._constructorFunctions = []
    }

    add(name: string | Function, value?: boolean | Function, condition?: boolean | Function): ClassBuilder {
        this._constructorFunctions.push({
            name,
            value,
            condition
        })
        return this
    }

    computed() {
        const computedCls = computed(() => {
            const cls: Record<string, boolean> = {}
            for (let _class of this._constructorFunctions) {
                if (_class.condition !== undefined) {
                    if (isBoolean(_class.condition) && _class.condition === false) {
                        continue
                    } else if (isFunction(_class.condition) && _class.condition() === false) {
                        continue
                    }
                }
                let name: string | undefined = undefined
                if (isString(_class.name)) {
                    name = _class.name
                } else if (isFunction(_class.name)) {
                    name = _class.name()
                }
                let value: boolean | undefined = undefined
                if (isBoolean(_class.value)) {
                    value = _class.value
                } else if (isFunction(_class.value)) {
                    value = _class.value()
                } else if (_class.value == undefined) {
                    value = true
                }
                if (name !== undefined && value !== undefined)
                    cls[name] = value;
            }
            return cls;
        })
        return { cls: computedCls }
    }
}