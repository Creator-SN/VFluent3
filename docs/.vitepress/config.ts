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
            copyright: 'Copyright © Creator SN - 2022',
        },
        nav: [
            {
                text: 'Home',
                link: '/',
            },
            {
                text: 'Guide',
                link: '/guide/',
            },
        ],
        sidebar: [
            {
                text: 'Basic',
                collapsed: true,
                items: [
                    {
                        text: 'Button',
                        link: '/guide/components/button/',
                    },
                    {
                        text: 'CheckBox',
                        link: '/guide/components/check-box/',
                    },
                    {
                        text: 'Radio',
                        link: '/guide/components/radio/',
                    },
                    {
                        text: 'ProgressBar',
                        link: '/guide/components/progress-bar/',
                    },
                    {
                        text: 'ProgressRing',
                        link: '/guide/components/progress-ring/',
                    },
                    {
                        text: 'ToggleSwitch',
                        link: '/guide/components/toggle-switch/',
                    },
                    {
                        text: 'Img',
                        link: '/guide/components/img/',
                    },
                ],
            },
            {
                text: 'Global',
                collapsed: true,
                items: [
                    {
                        text: 'MessageBar',
                        link: '/guide/components/message-bar/',
                    },
                ],
            },
        ],
    },
    markdown: {
        lineNumbers: true,
        toc: {
            level: [1, 2, 3],
            listType: 'ul',
        },
        theme: 'material-palenight',
    },
});
