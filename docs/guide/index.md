---
page: true
title: Guide
---

[English](./) | [简体中文](./index.zh-CN.md)

# VFluent3

VFluent3 is a Vue 3 component library inspired by Fluent Design. This guide walks you through installing the package and registering it in your Vue app.

## Installation

Install VFluent3 with Yarn:

```sh
yarn add @creatorsn/vfluent3
```

npm and pnpm work in a similar way.

## Quick Start

Import and register VFluent3 in your Vue entry file, usually `main.js`:

```js
import { createApp } from 'vue';
import VueFluent from "@creatorsn/vfluent3";
import '@creatorsn/vfluent3/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueFluent);
app.mount('#app');
```

Now you can use VFluent3 components in your app:

```vue
<template>
  <fv-button>Hello VFluent3</fv-button>
</template>
```

## Next Steps

- Browse the component docs from the sidebar.
- Check the icon dictionary if you need Fluent-style icons.
- Open an issue if you find a problem or have a suggestion.
