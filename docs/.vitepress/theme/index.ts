import DefaultTheme from "vitepress/theme"
import type { App, Plugin } from "vue"
import { FvComponentPlugins } from "@/packages"

export default {
    ...DefaultTheme,
    enhanceApp: ({ app }: { app: App }) => {
        app.use(FvComponentPlugins)
    }
}