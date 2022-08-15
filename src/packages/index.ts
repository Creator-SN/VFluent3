import '@/libs/office-ui-fabric-core/css/fabric.min.css';

export * from "./button"
export * from "./check-box"
export * from "./img"
export * from "./info-box"
export * from "./message-bar"
export * from "./progress-bar"
export * from "./progress-ring"
export * from "./radio"
export * from "./toggle-switch"

import '@/styles/theme/index.scss';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';

import Button from "./button"
import CheckBox from "./check-box"
import Img from "./img"
import InfoBox from "./info-box"
import MessageBar from "./message-bar"
import ProgressBar from "./progress-bar"
import ProgressRing from "./progress-ring"
import Radio from "./radio"
import ToggleSwitch from "./toggle-switch"

const components = [
    Button,
    CheckBox,
    Img,
    InfoBox,
    MessageBar,
    ProgressBar,
    ProgressRing,
    Radio,
    ToggleSwitch
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
