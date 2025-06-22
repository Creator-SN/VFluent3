import Custom from "./custom.vue"
import type { App } from "vue"
import { FvComponentPlugins } from "@/packages"
import './style.css'

export default {
    Layout: Custom,
    enhanceApp: ({ app }: { app: App }) => {
        app.use(FvComponentPlugins)
    }
}