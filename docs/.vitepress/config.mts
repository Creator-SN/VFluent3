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
                text: 'Basic input',
                collapsed: true,
                items: [
                    {
                        text: 'Button',
                        link: '/guide/components/button/'
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
                        text: 'DetailsList',
                        link: '/guide/components/details-list/'
                    },
                    {
                        text: 'DropDown',
                        link: '/guide/components/drop-down/'
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
                        text: 'Slider',
                        link: '/guide/components/slider/'
                    },
                    {
                        text: 'ToggleSwitch',
                        link: '/guide/components/toggle-switch/'
                    },
                    {
                        text: 'Tag',
                        link: '/guide/components/tag/'
                    }
                ]
            },
            {
                text: 'Collections',
                collapsed: true,
                items: [
                    {
                        text: 'FlipView',
                        link: '/guide/components/flip-view/'
                    },
                    {
                        text: 'ListView',
                        link: '/guide/components/list-view/'
                    },
                    {
                        text: 'TreeView',
                        link: '/guide/components/tree-view/'
                    },
                ]
            },
            {
                text: 'Date & Time',
                collapsed: true,
                items: [
                    {
                        text: 'CalendarDatePicker',
                        link: '/guide/components/calendar-date-picker/'
                    },
                    {
                        text: 'CalendarView',
                        link: '/guide/components/calendar-view/'
                    },
                    {
                        text: 'DatePicker',
                        link: '/guide/components/date-picker/'
                    },
                    {
                        text: 'TimePicker',
                        link: '/guide/components/time-picker/'
                    },
                ]
            },
            {
                text: 'Dialogs & flyouts',
                collapsed: true,
                items: [
                    {
                        text: 'Callout',
                        link: '/guide/components/callout/'
                    },
                    {
                        text: 'InfoBox',
                        link: '/guide/components/info-box/'
                    },
                ]
            },
            {
                text: 'Layout',
                collapsed: true,
                items: [
                    {
                        text: 'Collapse',
                        link: '/guide/components/collapse/'
                    },
                    {
                        text: 'Expander',
                        link: '/guide/components/expander/'
                    },
                    {
                        text: 'Drawer',
                        link: '/guide/components/drawer/'
                    },
                    {
                        text: 'Panel',
                        link: '/guide/components/panel/'
                    },
                ]
            },
            {
                text: 'Media',
                collapsed: true,
                items: [
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
                        text: 'Persona',
                        link: '/guide/components/persona/'
                    },
                ]
            },
            {
                text: 'Menu & toolbars',
                collapsed: true,
                items: [
                    {
                        text: 'CommandBar',
                        link: '/guide/components/command-bar/'
                    },
                    {
                        text: 'MenuFlyout',
                        link: '/guide/components/menu-flyout/'
                    },
                    {
                        text: 'SwipeControl',
                        link: '/guide/components/swipe-control/'
                    },
                ]
            },
            {
                text: 'Navigation',
                collapsed: true,
                items: [
                    {
                        text: 'Breadcrumb',
                        link: '/guide/components/breadcrumb/'
                    },
                    {
                        text: 'NavigationPanel',
                        link: '/guide/components/navigation-panel/'
                    },
                    {
                        text: 'NavigationView',
                        link: '/guide/components/navigation-view/'
                    },
                    {
                        text: 'Pivot',
                        link: '/guide/components/pivot/'
                    },
                    {
                        text: 'Pagination',
                        link: '/guide/components/pagination/'
                    },
                ]
            },
            {
                text: 'Scrolling',
                collapsed: true,
                items: [
                    {
                        text: 'InfiniteScrollView',
                        link: '/guide/components/infinite-scroll-view/'
                    },
                    {
                        text: 'ScrollStory',
                        link: '/guide/components/scroll-story/'
                    },
                ]
            },
            {
                text: 'Status & info',
                collapsed: true,
                items: [
                    {
                        text: 'Badge',
                        link: '/guide/components/badge/'
                    },
                    {
                        text: 'MessageBar',
                        link: '/guide/components/message-bar/'
                    },
                    {
                        text: 'ProgressBar',
                        link: '/guide/components/progress-bar/'
                    },
                    {
                        text: 'ProgressRing',
                        link: '/guide/components/progress-ring/'
                    },
                ]
            },
            {
                text: 'Styles',
                collapsed: true,
                items: [
                    {
                        text: 'AnimatedIcon',
                        link: '/guide/components/animated-icon/'
                    },
                    {
                        text: 'IconElement',
                        link: '/guide/components/icon-element/'
                    },
                    {
                        text: 'RevealContainer',
                        link: '/guide/components/reveal-container/'
                    },
                    {
                        text: 'Shimmer',
                        link: '/guide/components/shimmer/'
                    },
                ]
            },
            {
                text: 'Text',
                collapsed: true,
                items: [
                    {
                        text: 'SearchBox',
                        link: '/guide/components/search-box/'
                    },
                    {
                        text: 'TextBox',
                        link: '/guide/components/text-box/'
                    },
                    {
                        text: 'TextField',
                        link: '/guide/components/text-field/'
                    },
                    {
                        text: 'VerifyBox',
                        link: '/guide/components/verify-box/'
                    },
                ]
            },
            {
                text: 'Windowing',
                collapsed: true,
                items: [
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
