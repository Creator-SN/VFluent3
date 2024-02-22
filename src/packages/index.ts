import '@/libs/office-ui-fabric-core/css/fabric.min.css';
import '@/libs/global-transition/global-transition.css';

export * from "./animated-icon"
export * from "./badge"
export * from "./breadcrumb"
export * from "./button"
export * from "./calendar-date-picker"
export * from "./calendar-view"
export * from "./callout"
export * from "./check-box"
export * from "./collapse"
export * from "./color-picker"
export * from "./combo-box"
export * from "./combobox"
export * from "./command-bar"
export * from "./date-picker"
export * from "./details-list"
export * from "./drawer"
export * from "./drop-down"
export * from "./expander"
export * from "./flip-view"
export * from "./icon-element"
export * from "./image"
export * from "./img"
export * from "./img-box"
export * from "./infinite-scroll-view"
export * from "./info-box"
export * from "./list-view"
export * from "./menu-flyout"
export * from "./message-bar"
export * from "./navigation-panel"
export * from "./navigation-view"
export * from "./pagination"
export * from "./panel"
export * from "./persona"
export * from "./pivot"
export * from "./progress-bar"
export * from "./progress-ring"
export * from "./radio"
export * from "./radio-group"
export * from "./rating-control"
export * from "./reveal-container"
export * from "./scroll-story"
export * from "./search-box"
export * from "./shimmer"
export * from "./slider"
export * from "./swipe-control"
export * from "./tag"
export * from "./text-box"
export * from "./text-field"
export * from "./time-picker"
export * from "./toggle-switch"
export * from "./tree-view"
export * from "./verify-box"
export * from "./web-window"

import '@/styles/theme/index.scss';
import { UtilsPlugin } from '@/utils/plugins/install-utils';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';

import AnimatedIcon from "./animated-icon"
import Badge from "./badge"
import Breadcrumb from "./breadcrumb"
import Button from "./button"
import CalendarDatePicker from "./calendar-date-picker"
import CalendarView from "./calendar-view"
import Callout from "./callout"
import CheckBox from "./check-box"
import Collapse from "./collapse"
import ColorPicker from "./color-picker"
import ComboBox from "./combo-box"
import Combobox from "./combobox"
import CommandBar from "./command-bar"
import DatePicker from "./date-picker"
import DetailsList from "./details-list"
import Drawer from "./drawer"
import DropDown from "./drop-down"
import Expander from "./expander"
import FlipView from "./flip-view"
import IconElement from "./icon-element"
import Image from "./image"
import Img from "./img"
import ImgBox from "./img-box"
import InfiniteScrollView from "./infinite-scroll-view"
import InfoBox from "./info-box"
import ListView from "./list-view"
import MenuFlyout from "./menu-flyout"
import MessageBar from "./message-bar"
import NavigationPanel from "./navigation-panel"
import NavigationView from "./navigation-view"
import Pagination from "./pagination"
import Panel from "./panel"
import Persona from "./persona"
import Pivot from "./pivot"
import ProgressBar from "./progress-bar"
import ProgressRing from "./progress-ring"
import Radio from "./radio"
import RadioGroup from "./radio-group"
import RatingControl from "./rating-control"
import RevealContainer from "./reveal-container"
import ScrollStory from "./scroll-story"
import SearchBox from "./search-box"
import Shimmer from "./shimmer"
import Slider from "./slider"
import SwipeControl from "./swipe-control"
import Tag from "./tag"
import TextBox from "./text-box"
import TextField from "./text-field"
import TimePicker from "./time-picker"
import ToggleSwitch from "./toggle-switch"
import TreeView from "./tree-view"
import VerifyBox from "./verify-box"
import WebWindow from "./web-window"

const components = [
    AnimatedIcon,
    Badge,
    Breadcrumb,
    Button,
    CalendarDatePicker,
    CalendarView,
    Callout,
    CheckBox,
    Collapse,
    ColorPicker,
    ComboBox,
    Combobox,
    CommandBar,
    DatePicker,
    DetailsList,
    Drawer,
    DropDown,
    Expander,
    FlipView,
    IconElement,
    Image,
    Img,
    ImgBox,
    InfiniteScrollView,
    InfoBox,
    ListView,
    MenuFlyout,
    MessageBar,
    NavigationPanel,
    NavigationView,
    Pagination,
    Panel,
    Persona,
    Pivot,
    ProgressBar,
    ProgressRing,
    Radio,
    RadioGroup,
    RatingControl,
    RevealContainer,
    ScrollStory,
    SearchBox,
    Shimmer,
    Slider,
    SwipeControl,
    Tag,
    TextBox,
    TextField,
    TimePicker,
    ToggleSwitch,
    TreeView,
    VerifyBox,
    WebWindow
];

export const FvComponentPlugins: Plugin = {
    install(app: App, options: any) {
        const pinia = createPinia();
        app.use(pinia);
        app.use(UtilsPlugin);
        for (const component of components) {
            app.use(component);
        }
    },
};
