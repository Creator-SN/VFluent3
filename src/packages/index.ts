import '@/libs/office-ui-fabric-core/css/fabric.min.css';

export * from "./button"
export * from "./check-box"
export * from "./progress-bar"
export * from "./radio"

import '@/styles/theme/index.scss';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';

import Button from "./button"
import CheckBox from "./check-box"
import ProgressBar from "./progress-bar"
import Radio from "./radio"

const components = [
    Button,
    CheckBox,
    ProgressBar,
    Radio
];

export const FvComponentPlugins: Plugin = {
    install(app: App, options: any) {
        const pinia = createPinia();
        app.use(pinia);
        for (const component of components) {
            app.use(component);
        }
    },
};
