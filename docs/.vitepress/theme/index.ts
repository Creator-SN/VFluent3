import Custom from "./custom.vue"
import type { App } from "vue"
import { FvComponentPlugins } from "@/packages"

export default {
    Layout: Custom,
    enhanceApp: ({ app }: { app: App }) => {
        app.use(FvComponentPlugins)
    }
}