import DefaultTheme from "vitepress/theme"
import type { App, Plugin } from "vue"
import * as Components from "@/packages"

export default {
    ...DefaultTheme,
    enhanceApp: ({ app }: { app: App }) => {
        for (let key in Components) {
            app.use((Components as Record<string, Plugin>)[key])
        }
    }
}