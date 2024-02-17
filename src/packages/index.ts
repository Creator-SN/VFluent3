import '@/libs/office-ui-fabric-core/css/fabric.min.css';

export * from "./animated-icon"
export * from "./badge"
export * from "./breadcrumb"
export * from "./button"
export * from "./calendar-date-picker"
export * from "./calendar-view"
export * from "./check-box"
export * from "./color-picker"
export * from "./combo-box"
export * from "./img"
export * from "./info-box"
export * from "./message-bar"
export * from "./progress-bar"
export * from "./progress-ring"
export * from "./radio"
export * from "./reveal-container"
export * from "./text-box"
export * from "./toggle-switch"

import '@/styles/theme/index.scss';
import { SDate } from '@/utils/common/usual';
import { SUtility } from '@/utils/common/usual';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';

import AnimatedIcon from "./animated-icon"
import Badge from "./badge"
import Breadcrumb from "./breadcrumb"
import Button from "./button"
import CalendarDatePicker from "./calendar-date-picker"
import CalendarView from "./calendar-view"
import CheckBox from "./check-box"
import ColorPicker from "./color-picker"
import ComboBox from "./combo-box"
import Img from "./img"
import InfoBox from "./info-box"
import MessageBar from "./message-bar"
import ProgressBar from "./progress-bar"
import ProgressRing from "./progress-ring"
import Radio from "./radio"
import RevealContainer from "./reveal-container"
import TextBox from "./text-box"
import ToggleSwitch from "./toggle-switch"

const components = [
    AnimatedIcon,
    Badge,
    Breadcrumb,
    Button,
    CalendarDatePicker,
    CalendarView,
    CheckBox,
    ColorPicker,
    ComboBox,
    Img,
    InfoBox,
    MessageBar,
    ProgressBar,
    ProgressRing,
    Radio,
    RevealContainer,
    TextBox,
    ToggleSwitch
];

export const FvComponentPlugins: Plugin = {
    install(app: App, options: any) {
        const pinia = createPinia();
        app.use(pinia);
        app.config.globalProperties.$SDate = SDate;
        app.config.globalProperties.$SUtility = SUtility;
        for (const component of components) {
            app.use(component);
        }
    },
};
