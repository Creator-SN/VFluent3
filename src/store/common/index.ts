import { defineStore } from "pinia";
import { ref } from "vue"

/**
 * global config for components 
 */
export const useFvConfig = defineStore('FvConfig', () => {
    const theme = ref<string>("light")

    function changeTheme(val: string) {
        theme.value = val
    }

    return { theme, changeTheme }
})