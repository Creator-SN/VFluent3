import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * global config for components
 */
export const useFvConfig = defineStore('FvConfig', () => {
    const theme = ref<string>('light');
    const variables = ref<Record<string, string>>({});

    function changeTheme(val: string) {
        theme.value = val;
    }

    function refreshVariables() {
        if (document !== undefined) {
            const t = (Array.from(document.styleSheets)
                .map((e) => {
                    return Array.from(e.cssRules)
                        .map((rule) => {
                            // @ts-ignore
                            if (rule.selectorText===":root"){
                                return rule.cssText.split("{")[1].split("}")[0].split(";").filter(e=>e.trim().startsWith("--fv")).map(e=>{
                                    const [name,value] = e.split(":").map(i=>i.trim())
                                    return {
                                        name,value
                                    }
                                })
                            }
                            return []
                        })
                        .filter((e) => e.length>0);
                })
                .filter((e) => e.length > 0).flat(2))
            variables.value = {}
            for (const item of t){
                variables.value[item.name] = item.value
            }
        }
    }

    return { theme, changeTheme, refreshVariables };
});
