---
page: true
title: 指南
---


# VFluent3

VFluent3 是一个受 Fluent Design 启发的 Vue 3 组件库。这篇指南会带你完成安装，并在 Vue 应用中注册组件库。

## 安装

使用 Yarn 安装 VFluent3：

```sh
yarn add @creatorsn/vfluent3
```

npm 和 pnpm 的操作类似。

## 快速开始

在 Vue 入口文件中引入并注册 VFluent3，通常是 `main.js`：

```js
import { createApp } from 'vue';
import VueFluent from "@creatorsn/vfluent3";
import '@creatorsn/vfluent3/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueFluent);
app.mount('#app');
```

之后就可以在应用中使用 VFluent3 组件：

```vue
<template>
  <fv-button>Hello VFluent3</fv-button>
</template>
```

## 全局主题

注册 VFluent3 后，可以通过 `$FvConfig` 在挂载应用前设置初始主题：

```js
app.use(VueFluent);
app.config.globalProperties.$FvConfig.changeTheme('dark');
app.mount('#app');
```

传入 `'light'` 或 `'dark'` 可指定主题，传入 `null` 可在两者之间切换。默认主题为 `'light'`。

在组件中使用组合式 API 切换主题：

```vue
<script setup>
import { getCurrentInstance } from 'vue';

const { appContext } = getCurrentInstance();
const fvConfig = appContext.config.globalProperties.$FvConfig;

function toggleTheme() {
  fvConfig.changeTheme(null);
}
</script>

<template>
  <fv-button @click="toggleTheme">切换主题</fv-button>
</template>
```

使用默认 `theme="global"` 的组件会跟随全局主题；显式设置 `theme="light"` 或 `theme="dark"` 的组件会保持指定主题。此设置影响 VFluent3 组件，页面自身的背景和文字样式需要另行设置。

## 下一步

- 从侧边栏浏览组件文档。
- 如果需要 Fluent 风格图标，可以查看图标字典。
- 如果发现问题或有建议，欢迎提交 issue。
