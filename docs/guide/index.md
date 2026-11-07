---
page: true
title: Guide
---


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

## Global Theme

After registering VFluent3, use `$FvConfig` to set the initial theme before mounting the app:

```js
app.use(VueFluent);
app.config.globalProperties.$FvConfig.changeTheme('dark');
app.mount('#app');
```

Pass `'light'` or `'dark'` to select a theme, or `null` to toggle between them. The default is `'light'`.

To switch the theme from a component using the Composition API:

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
  <fv-button @click="toggleTheme">Toggle theme</fv-button>
</template>
```

Components with the default `theme="global"` follow this setting. A component with an explicit `theme="light"` or `theme="dark"` keeps that theme. This setting affects VFluent3 components; style your own page background and text separately.

## Next Steps

- Browse the component docs from the sidebar.
- Check the icon dictionary if you need Fluent-style icons.
- Open an issue if you find a problem or have a suggestion.
