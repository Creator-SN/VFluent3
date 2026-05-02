import { defineConfig } from 'vitepress';

const sidebarSections = [
    {
        key: 'design',
        items: [
            {
                text: 'Icons',
                link: '/guide/others/design/icons/index.md'
            }
        ]
    },
    {
        key: 'basicInput',
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
                text: 'TableView',
                link: '/guide/components/table-view/'
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
        key: 'collections',
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
            }
        ]
    },
    {
        key: 'dateTime',
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
            }
        ]
    },
    {
        key: 'dialogsFlyouts',
        items: [
            {
                text: 'Callout',
                link: '/guide/components/callout/'
            },
            {
                text: 'InfoBox',
                link: '/guide/components/info-box/'
            }
        ]
    },
    {
        key: 'layout',
        items: [
            {
                text: 'Affix',
                link: '/guide/components/affix/'
            },
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
            }
        ]
    },
    {
        key: 'media',
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
            }
        ]
    },
    {
        key: 'menuToolbars',
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
                text: 'RightMenu',
                link: '/guide/components/right-menu/'
            },
            {
                text: 'SwipeControl',
                link: '/guide/components/swipe-control/'
            }
        ]
    },
    {
        key: 'navigation',
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
                text: 'TabView',
                link: '/guide/components/tab-view/'
            },
            {
                text: 'Pivot',
                link: '/guide/components/pivot/'
            },
            {
                text: 'Pagination',
                link: '/guide/components/pagination/'
            }
        ]
    },
    {
        key: 'scrolling',
        items: [
            {
                text: 'InfiniteScrollView',
                link: '/guide/components/infinite-scroll-view/'
            },
            {
                text: 'ScrollStory',
                link: '/guide/components/scroll-story/'
            }
        ]
    },
    {
        key: 'statusInfo',
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
            }
        ]
    },
    {
        key: 'styles',
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
            }
        ]
    },
    {
        key: 'text',
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
            }
        ]
    },
    {
        key: 'windowing',
        items: [
            {
                text: 'WebWindow',
                link: '/guide/components/web-window/'
            }
        ]
    },
    {
        key: 'global',
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
        key: 'advance',
        items: [
            {
                text: 'ColorPicker',
                link: '/guide/components/color-picker/'
            }
        ]
    }
] as const;

const sidebarText = {
    en: {
        design: 'Design',
        basicInput: 'Basic input',
        collections: 'Collections',
        dateTime: 'Date & Time',
        dialogsFlyouts: 'Dialogs & flyouts',
        layout: 'Layout',
        media: 'Media',
        menuToolbars: 'Menu & toolbars',
        navigation: 'Navigation',
        scrolling: 'Scrolling',
        statusInfo: 'Status & info',
        styles: 'Styles',
        text: 'Text',
        windowing: 'Windowing',
        global: 'Global',
        advance: 'Advance'
    },
    zh: {
        design: '设计',
        basicInput: '基础输入',
        collections: '集合',
        dateTime: '日期与时间',
        dialogsFlyouts: '对话与浮层',
        layout: '布局',
        media: '媒体',
        menuToolbars: '菜单与工具栏',
        navigation: '导航',
        scrolling: '滚动',
        statusInfo: '状态与信息',
        styles: '样式',
        text: '文本',
        windowing: '窗口',
        global: '全局',
        advance: '进阶'
    }
} as const;

const createSidebar = (locale: 'en' | 'zh', prefix = '') => {
    return sidebarSections.map((section) => ({
        text: sidebarText[locale][section.key],
        collapsed: false,
        items: section.items.map((item) => ({
            ...item,
            link: `${prefix}${item.link}`
        }))
    }));
};

export default defineConfig({
    title: 'vfluent3',
    description: 'A Vue3 component library for Fluent UI',
    base: '/VFluent3/',
    locales: {
        root: {
            label: 'English',
            link: '/',
            lang: 'en-US',
            title: 'vfluent3',
            description: 'A Vue3 component library for Fluent UI'
        },
        'zh-CN': {
            label: '简体中文',
            link: '/zh-CN/',
            lang: 'zh-CN',
            title: 'vfluent3',
            description: '一个基于 Fluent UI 的 Vue3 组件库',
            themeConfig: {
                langMenuLabel: '语言',
                nav: [
                    {
                        text: '首页',
                        link: '/zh-CN/'
                    },
                    {
                        text: '指南',
                        link: '/zh-CN/guide/'
                    }
                ],
                sidebar: createSidebar('zh', '/zh-CN')
            }
        }
    },
    themeConfig: {
        i18nRouting: true,
        siteTitle: 'VFluent3',
        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright (c) Creator SN - 2026'
        },
        search: {
            provider: 'local'
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
        sidebar: createSidebar('en')
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
