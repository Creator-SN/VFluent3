import { computed, ExtractPropTypes } from 'vue';
import { useFvConfig } from '@/store/common';

export function useTheme(
    props: Readonly<ExtractPropTypes<{ theme?: string }>>
) {
    const config = useFvConfig();

    const computedTheme = computed(() => {
        if (props.theme === 'global' && props.theme !== undefined) {
            return config.theme;
        }
        if (props.theme===undefined){
            return "global"
        }
        return props.theme;
    });

    return { theme: computedTheme };
}
