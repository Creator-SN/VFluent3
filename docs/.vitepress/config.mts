import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'vfluent3',
    description: 'A Vue3 component library for Fluent UI',
    lang: 'en-US',
    base: '/VFluent3/',
    themeConfig: {
        siteTitle: 'VFluent3',
        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright © Creator SN - 2022'
        },
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            }
        ],
        sidebar: [
            {
                text: 'Basic',
                collapsed: true,
                items: [
                    {
                        text: 'AnimatedIcon',
                        link: '/guide/components/animated-icon/'
                    },
                    {
                        text: 'Badge',
                        link: '/guide/components/badge/'
                    },
                    {
                        text: 'Breadcrumb',
                        link: '/guide/components/breadcrumb/'
                    },
                    {
                        text: 'Button',
                        link: '/guide/components/button/'
                    },
                    {
                        text: 'Callout',
                        link: '/guide/components/callout/'
                    },
                    {
                        text: 'CalendarDatePicker',
                        link: '/guide/components/calendar-date-picker/'
                    },
                    {
                        text: 'CalendarView',
                        link: '/guide/components/calendar-view/'
                    },
                    {
                        text: 'CheckBox',
                        link: '/guide/components/check-box/'
                    },
                    {
                        text: 'ColorPicker',
                        link: '/guide/components/color-picker/'
                    },
                    {
                        text: 'Combobox',
                        link: '/guide/components/combobox/'
                    },
                    {
                        text: 'CommandBar',
                        link: '/guide/components/command-bar/'
                    },
                    {
                        text: 'DatePicker',
                        link: '/guide/components/date-picker/'
                    },
                    {
                        text: 'DetailsList',
                        link: '/guide/components/details-list/'
                    },
                    {
                        text: 'Drawer',
                        link: '/guide/components/drawer/'
                    },
                    {
                        text: 'DropDown',
                        link: '/guide/components/drop-down/'
                    },
                    {
                        text: 'Expander',
                        link: '/guide/components/expander/'
                    },
                    {
                        text: 'FlipView',
                        link: '/guide/components/flip-view/'
                    },
                    {
                        text: 'IconElement',
                        link: '/guide/components/icon-element/'
                    },
                    {
                        text: 'Image',
                        link: '/guide/components/image/'
                    },
                    {
                        text: 'Img',
                        link: '/guide/components/img/'
                    },
                    {
                        text: 'ImgBox',
                        link: '/guide/components/img-box/'
                    },
                    {
                        text: 'InfiniteScrollView',
                        link: '/guide/components/infinite-scroll-view/'
                    },
                    {
                        text: 'InfoBox',
                        link: '/guide/components/info-box/'
                    },
                    {
                        text: 'ListView',
                        link: '/guide/components/list-view/'
                    },
                    {
                        text: 'MenuFlyout',
                        link: '/guide/components/menu-flyout/'
                    },
                    {
                        text: 'MessageBar',
                        link: '/guide/components/message-bar/'
                    },
                    {
                        text: 'NavigationView',
                        link: '/guide/components/navigation-view/'
                    },
                    {
                        text: 'Panel',
                        link: '/guide/components/panel/'
                    },
                    {
                        text: 'Pagination',
                        link: '/guide/components/pagination/'
                    },
                    {
                        text: 'Persona',
                        link: '/guide/components/persona/'
                    },
                    {
                        text: 'ProgressRing',
                        link: '/guide/components/progress-ring/'
                    },
                    {
                        text: 'Radio',
                        link: '/guide/components/radio/'
                    },
                    {
                        text: 'RadioGroup',
                        link: '/guide/components/radio-group/'
                    },
                    {
                        text: 'RatingControl',
                        link: '/guide/components/rating-control/'
                    },
                    {
                        text: 'RevealContainer',
                        link: '/guide/components/reveal-container/'
                    },
                    {
                        text: 'SearchBox',
                        link: '/guide/components/search-box/'
                    },
                    {
                        text: 'Shimmer',
                        link: '/guide/components/shimmer/'
                    },
                    {
                        text: 'Slider',
                        link: '/guide/components/slider/'
                    },
                    {
                        text: 'SwipeControl',
                        link: '/guide/components/swipe-control/'
                    },
                    {
                        text: 'Tag',
                        link: '/guide/components/tag/'
                    },
                    {
                        text: 'TextBox',
                        link: '/guide/components/text-box/'
                    },
                    {
                        text: 'TimePicker',
                        link: '/guide/components/time-picker/'
                    },
                    {
                        text: 'ToggleSwitch',
                        link: '/guide/components/toggle-switch/'
                    },
                    {
                        text: 'TreeView',
                        link: '/guide/components/tree-view/'
                    },
                    {
                        text: 'VerifyBox',
                        link: '/guide/components/verify-box/'
                    },
                    {
                        text: 'WebWindow',
                        link: '/guide/components/web-window/'
                    }
                ]
            },
            {
                text: 'Global',
                collapsed: true,
                items: [
                    {
                        text: 'MessageBar',
                        link: '/guide/components/message-bar/'
                    },
                    {
                        text: 'InfoBox',
                        link: '/guide/components/info-box/'
                    }
                ]
            },
            {
                text: 'Advance',
                collapsed: true,
                items: [
                    {
                        text: 'ColorPicker',
                        link: '/guide/components/color-picker/'
                    }
                ]
            }
        ]
    },
    markdown: {
        lineNumbers: true,
        toc: {
            level: [1, 2, 3],
            listType: 'ul'
        }
        // theme: 'material-palenight',
    }
});
