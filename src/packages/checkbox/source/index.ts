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
    borderWidth: {
        type: [Number, String],
        default: 1.5
    },
    borderColor: {
        type: [String],
    },
    foreground: {
        type: [String],
    },
    background: {
        type: [String],
    },
    hoverColor: {
        type: [String]
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
            } else if (props.value === null) {
                return undefined;
            }
            return props.value
        },
        set: (val) => {
            checked.value = val;
            emits("input", val);
        }
    })
    // events
    const onClick = (evt: Event) => {
        emits("click", computedChecked.value)
    }
    return {
        onClick,
        computedChecked
    }
}

