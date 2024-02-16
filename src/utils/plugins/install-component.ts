import type { ComponentPlugin } from '@/types/plugins/component-plugin';
import type { App, Component, Plugin } from 'vue';

export const convertPlugin = <T>(component: T): ComponentPlugin<T> => {
    (component as ComponentPlugin<T>).install = (app: App): void => {
        app.component((component as any).name, component as Component);
    };
    return component as ComponentPlugin<T>;
};

export const convertPluginWithOthers = <T>(
    component: T,
    plugins: Plugin[]
): ComponentPlugin<T> => {
    (component as ComponentPlugin<T>).install = (app: App): void => {
        app.component((component as any).name, component as Component);
        if (Array.isArray(plugins)) {
            for (const plugin of plugins) {
                app.use(plugin);
            }
        }
    };
    return component as ComponentPlugin<T>;
};
