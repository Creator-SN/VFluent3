import '@/libs/office-ui-fabric-core/dist/css/fabric.min.css';

export * from './button';
export * from './checkbox';
export * from './radio';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';
import FvButton from './button';
import FvCheckBox from './checkbox';
import FvRadio from './radio';
import { useThemeVariables } from './common/theme';

export const FvComponentPlugins: Plugin = {
    install(app: App, options: any) {
        const pinia = createPinia();
        useThemeVariables();
        app.use(pinia);
        app.use(FvButton);
        app.use(FvCheckBox);
        app.use(FvRadio);
    },
};
