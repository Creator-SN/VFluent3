<div align="center">
  <img src="https://raw.githubusercontent.com/aleversn/VFluent/master/examples/assert/logo/VFluent.png" width="360" alt="VFluent3 Logo" />

[![Vue](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-3.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![NPM](https://img.shields.io/npm/v/@creatorsn/vfluent3?style=flat-square&color=2F80ED&logo=npm&logoColor=white)](https://www.npmjs.com/package/@creatorsn/vfluent3)
[![Downloads](https://img.shields.io/npm/dw/@creatorsn/vfluent3?style=flat-square&color=green)](https://www.npmjs.com/package/@creatorsn/vfluent3)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

</div>

<h4 align="center">
  <i>Fluent Design components for Vue 3, built for crisp Windows-like web experiences.</i>
</h4>

<p align="center">
  <a href="https://creator-sn.github.io/VFluent3/">Documentation</a>
  ·
  <a href="https://www.npmjs.com/package/@creatorsn/vfluent3">npm</a>
  ·
  <a href="https://github.com/Creator-SN/VFluent3/issues">Issues</a>
</p>

English | [简体中文](./README_zh.md)

## VFluent3

VFluent3 is a Vue 3 component library inspired by Microsoft's [Fluent Design System](https://developer.microsoft.com/en-us/fluentui#/). It brings Fluent-style components, icons, shadows, Acrylic-like surfaces, and Reveal interactions into modern Vue applications.

The project is powered by Vite and focuses on making desktop-inspired web interfaces feel clean, responsive, and delightful.

## Installation

Install the package with Yarn:

```sh
yarn add @creatorsn/vfluent3
```

npm and pnpm work in a similar way.

## Quick Start

Register VFluent3 in your Vue entry file, usually `main.js`:

```js
import { createApp } from 'vue';
import VueFluent from "@creatorsn/vfluent3";
import '@creatorsn/vfluent3/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueFluent);
app.mount('#app');
```

Then use components in your Vue app:

```vue
<template>
  <fv-button>Create something fluent</fv-button>
</template>
```

## Documentation

Read the full documentation and component examples:

[https://creator-sn.github.io/VFluent3/](https://creator-sn.github.io/VFluent3/)

## Development

Clone the repository and install dependencies:

```sh
yarn
```

Start the VitePress documentation site:

```sh
yarn docs:dev
```

Create a new component scaffold:

```sh
yarn bin:new
```

Build the library:

```sh
yarn build
```

## Contributing

VFluent3 is still growing, and contributions are welcome.

If you have ideas, feedback, bug reports, or design suggestions, please open an [issue](https://github.com/Creator-SN/VFluent3/issues). If you want to contribute a fix or improvement, please submit a pull request.

For commit messages, this project supports Commitizen:

```sh
yarn cz
```

## Fluent Icons

VFluent3 uses Microsoft Fabric UI and Fluent icon resources in several places, including icons and shadows.

Basic icon usage:

```vue
<i class="ms-Icon ms-Icon--AADLogo"></i>
```

When a VFluent3 component supports an icon prop, you can usually pass the icon name directly.

Windows 11 Fluent Icons reference:

[https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font](https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font)

## License

VFluent3 is released under the [MIT License](./LICENSE).

Copyright (c) 2026 Creator SN
