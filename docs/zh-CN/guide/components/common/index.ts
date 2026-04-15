import { MessageBarKey, MessageBarMethod } from '@/packages';
import { isString } from '@/utils/common';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';

export function useTheme() {
    const theme = ref<string>('light');
    let observer: MutationObserver | undefined = undefined;
    const syncTheme = () => {
        if (
            document !== undefined &&
            document.documentElement.classList.contains('dark')
        ) {
            theme.value = 'dark';
        } else {
            theme.value = 'light';
        }
    };
    onMounted(() => {
        syncTheme();
        observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
    });
    onBeforeUnmount(() => {
        observer?.disconnect();
    });
    return {
        theme,
    };
}

export function Toast(
    barWarning: MessageBarMethod | undefined,
    message: string | object,
    status: 'info' | 'correct' | 'warning' | 'error' | 'blocked' = 'correct'
) {
    if (!isString(message)) {
        message = JSON.stringify(message, null, 2);
    }
    if (barWarning !== undefined) {
        barWarning({
            status,
            message,
        });
    }
}
