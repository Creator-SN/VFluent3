import { onBeforeUnmount, onMounted, ref } from 'vue';

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
        syncTheme()
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
