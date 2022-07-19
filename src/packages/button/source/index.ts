import { commonProps } from "@/packages/common/props";
import { ExtractPropTypes } from "vue";

// subscribe https://github.com/vuejs/core/issues/4294
// see why not use typescript

// props
export const buttonProps = {
    ...commonProps,
    icon: {
        type: String,
    },
    foreground: {
        type: String
    },
    background: {
        type: String
    },
    borderRadius: {
        type: [Number, String],
        default: 2
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

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

// emits
export const buttonEmits = {
    click(evt: Event): boolean {
        return true;
    }
}

export type ButtonEmits = typeof buttonEmits;