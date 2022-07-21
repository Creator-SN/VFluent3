
import "office-ui-fabric-core/dist/css/fabric.min.css"

export * from "./button"

import type { App, Plugin } from "vue"
import { createPinia } from "pinia"
import FvButton from "./button"

export const FvComponentPlugins: Plugin = {
    install(app: App) {
        const pinia = createPinia()
        app.use(pinia)
        app.use(FvButton)
    }
}
