import { defineConfig } from "vitepress"

export default defineConfig({
    title: "vfluent3",
    description: "A Vue3 component library for Fluent UI",
    lang: "en-US",
    themeConfig: {
        siteTitle: 'VFluent3',
        footer: {
            message: "MIT Licensed",
            copyright: "Copyright © Creator SN - 2022"
        },
        nav: [
            {
                text: "Home",
                link: "/"
            },
            {
                text: "Guide",
                link: "/guide/",
            }
        ],
        sidebar: [
            {
                text: 'Guide',
                collapsed: true,
                items: [
                    { text: 'Button', link: '/guide/components/button' },
                ],
            }
        ]
    },
    markdown: {
        lineNumbers: true,
        toc: {
            level: [1, 2, 3]
        }
    }
})