import type { ComponentPlugin } from "@/types/plugins/component-plugin";
import type { App } from "vue"

export const convertPlugin = <T>(component: T): ComponentPlugin<T> => {
    (component as ComponentPlugin<T>).install = (app: App): void => {
        app.component((component as any).name, component)
    }
    return component as ComponentPlugin<T>
}