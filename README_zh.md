<div align="center">
  <img src="https://raw.githubusercontent.com/aleversn/VFluent/master/examples/assert/logo/VFluent.png" width="360" alt="VFluent3 Logo" />

[![Vue](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-3.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![NPM](https://img.shields.io/npm/v/@creatorsn/vfluent3?style=flat-square&color=2F80ED&logo=npm&logoColor=white)](https://www.npmjs.com/package/@creatorsn/vfluent3)
[![Downloads](https://img.shields.io/npm/dw/@creatorsn/vfluent3?style=flat-square&color=green)](https://www.npmjs.com/package/@creatorsn/vfluent3)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

</div>

<h4 align="center">
  <i>为 Vue 3 打造的 Fluent Design 组件库，让 Web 界面更接近清爽、细腻的 Windows 体验。</i>
</h4>

<p align="center">
  <a href="https://creator-sn.github.io/VFluent3/">文档</a>
  ·
  <a href="https://www.npmjs.com/package/@creatorsn/vfluent3">npm</a>
  ·
  <a href="https://github.com/Creator-SN/VFluent3/issues">Issues</a>
</p>

[English](./README.md) | 简体中文

## VFluent3

VFluent3 是一个受 Microsoft [Fluent Design System](https://developer.microsoft.com/en-us/fluentui#/) 启发的 Vue 3 组件库。它为现代 Vue 应用提供 Fluent 风格组件、图标、阴影、类 Acrylic 表面以及 Reveal 交互效果。

项目基于 Vite 构建，目标是让桌面风格的 Web 界面更清晰、更响应式，也更有质感。

## 安装

使用 Yarn 安装：

```sh
yarn add @creatorsn/vfluent3
```

npm 和 pnpm 的操作类似。

## 快速开始

在 Vue 入口文件中注册 VFluent3，通常是 `main.js`：

```js
import { createApp } from 'vue';
import VueFluent from "@creatorsn/vfluent3";
import '@creatorsn/vfluent3/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueFluent);
app.mount('#app');
```

然后就可以在 Vue 中使用组件：

```vue
<template>
  <fv-button>创建一个 Fluent 界面</fv-button>
</template>
```

## 文档

完整文档与组件示例：

[https://creator-sn.github.io/VFluent3/](https://creator-sn.github.io/VFluent3/)

## 本地开发

克隆仓库后安装依赖：

```sh
yarn
```

启动 VitePress 文档站点：

```sh
yarn docs:dev
```

创建新的组件模板：

```sh
yarn bin:new
```

构建组件库：

```sh
yarn build
```

## 参与贡献

VFluent3 仍在持续完善中，欢迎一起让它变得更好。

如果你有想法、建议、问题反馈或设计意见，可以提交 [issue](https://github.com/Creator-SN/VFluent3/issues)。如果你愿意贡献修复或改进，请提交 pull request。

项目支持使用 Commitizen 生成提交信息：

```sh
yarn cz
```

## Fluent 图标

VFluent3 在多个场景中使用了 Microsoft Fabric UI 与 Fluent 图标资源，包括图标与阴影等视觉能力。

基础图标用法：

```vue
<i class="ms-Icon ms-Icon--AADLogo"></i>
```

当 VFluent3 组件的某个 prop 支持图标时，通常可以直接传入图标名称。

Windows 11 Fluent Icons 参考：

[https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font](https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font)

## License

VFluent3 基于 [MIT License](./LICENSE) 开源。

Copyright (c) 2025 Creator SN
