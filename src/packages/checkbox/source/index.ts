import { commonProps } from "@/packages/common/props";
import { computed, ExtractPropTypes, ref, defineEmits, EmitsOptions } from "vue";
import { EmitFn } from "@/types/components";

// subscribe https://github.com/vuejs/core/issues/4294
// see why not use typescript

// props
export const checkboxProps = {
    ...commonProps,
    value: {
        type: [Boolean],
        default: undefined
    },
    foreground: {
        type: String
    },
    background: {
        type: String
    },
    borderRadius: {
        type: [Number, String],
        default: 3
    },
    fontSize: {
        type: [Number, String],
    },
    fontWeight: {
        type: [Number, String],
        default: "normal"
    },
    isBoxShadow: {
        type: Boolean,
        default: false
    },
    borderWidth: {
        type: [Number, String],
        default: 2
    }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

// emits
export const checkboxEmits = {
    click(val?: boolean): boolean {
        return true;
    },
    input(val?: boolean): boolean {
        return true;
    }
}

export type CheckboxEmits = typeof checkboxEmits;

export function useCheckbox(props: Readonly<CheckboxProps>, emits: EmitFn<CheckboxEmits>) {
    const checked = ref<boolean>()
    const computedChecked = computed({
        get: () => {
            if (props.value === undefined) {
                return checked.value
            }
            console.log(props.value)
            return props.value
        },
        set: (val) => {
            checked.value = val;
            emits("input", val);
        }
    })
    // events
    const onClick = (evt: Event) => {
        // if (typeof computedChecked.value === "string" || computedChecked.value === undefined)
        //     computedChecked.value = false
        // else
        //     computedChecked.value = !computedChecked.value
        emits("click", computedChecked.value)
    }
    return {
        onClick,
        computedChecked
    }
}

