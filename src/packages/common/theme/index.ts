export const ThemeVariables: Record<string, Record<string, string>> = {
    light: {
        "--fv-light-bgcolor": "rgba(237, 235, 233, 1)",
        "--fv-light-hover-bgcolor": "rgba(237, 235, 233, 0.8)",
        "--fv-light-color": "rgba(0, 0, 0, 1)",
        "--fv-light-disabled-bgcolor": "rgba(239, 239, 239, 0.5)",
        "--fv-light-disabled-color": "rgba(220, 220, 220,1)"
    },
    dark: {
        "--fv-dark-bgcolor": "rgba(96, 94, 92, 1)",
        "--fv-dark-hover-bgcolor": "rgba(96, 94, 92, 0.8)",
        "--fv-dark-color": "rgba(255, 255, 255, 1)",
        "--fv-dark-disabled-bgcolor": "rgba(62, 63, 66, 0.5)",
        "--fv-dark-disabled-color": "rgba(143, 145, 147,1)"
    }
}

export function useThemeVariables() {
    if (document !== null && document !== undefined) {
        for (const theme in ThemeVariables) {
            for (const key in ThemeVariables[theme]) {
                document.documentElement.style.setProperty(key, ThemeVariables[theme][key])
            }
        }
    }
}