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

## 下一步

- 从侧边栏浏览组件文档。
- 如果需要 Fluent 风格图标，可以查看图标字典。
- 如果发现问题或有建议，欢迎提交 issue。
