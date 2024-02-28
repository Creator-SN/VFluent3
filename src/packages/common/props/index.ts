export const commonProps = {
    theme: {
        type: String,
        default: 'global'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    lang: {
        type: String,
        default: "global"
    }
}

export type commonPropsType = {
    theme?: "global" | "light" | "dark";
    disabled?: boolean,
    lang?: "global" | string,
}