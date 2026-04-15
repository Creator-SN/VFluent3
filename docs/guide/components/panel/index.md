---
page: true
title: Panel
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Panel-DEMO
---

<script>
export default {
    data () {
        return {
            basic: false,
            nearSide: false,
            centralSide: false,
            topSide: false,
            bottomSide: false,
            lightDismiss: false,
            acrylic: false,
            footer: false,
            dark: false,
            acrylicDark: false
        }
    }
}
</script>

<ClientOnly>
<fv-button style="width: 200px;" @click="basic = true">Open Panel</fv-button>
<fv-Panel v-model="basic">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="basic">
</fv-Panel>
```

### Panel Near Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="nearSide = true">Open Panel</fv-button>
<fv-Panel v-model="nearSide" :isNearSide="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="nearSide" :isNearSide="true">
</fv-Panel>
```

### Panel Central Side
---

Global Append

<ClientOnly>
<fv-button style="width: 200px;" @click="centralSide = true">Open Panel</fv-button>
<fv-Panel v-model="centralSide" :isCentralSide="true" :teleport="true" width="calc(90% - 50px)" height="calc(90% - 50px)">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="centralSide" :isCentralSide="true" :teleport="true" width="calc(90% - 50px)" height="calc(90% - 50px)">
</fv-Panel>
```

### Panel Top Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="topSide = true">Open Panel</fv-button>
<fv-Panel v-model="topSide" :isTopSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="topSide" :isTopSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
```

### Panel Bottom Side
---

<ClientOnly>
<fv-button style="width: 200px;" @click="bottomSide = true">Open Panel</fv-button>
<fv-Panel v-model="bottomSide" :isBottomSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="bottomSide" :isBottomSide="true" :isLightDismiss="true" width="100%" height="500px">
</fv-Panel>
```

### Panel Light Dismiss
---

<ClientOnly>
<fv-button style="width: 200px;" @click="lightDismiss = true">Open Panel</fv-button>
<fv-Panel v-model="lightDismiss" :isLightDismiss="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="lightDismiss" :isLightDismiss="true">
</fv-Panel>
```

### Panel Acrylic
---

<ClientOnly>
<fv-button style="width: 200px;" @click="acrylic = true">Open Panel</fv-button>
<fv-Panel v-model="acrylic" :isLightDismiss="true" :isAcrylic="true">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="acrylic" :isLightDismiss="true" :isAcrylic="true">
</fv-Panel>
```

### Panel Footer
---

<ClientOnly>
<fv-button style="width: 200px;" @click="footer = true">Open Panel</fv-button>
<fv-Panel v-model="footer" :isFooter="true" :isAcrylic="true">
<template v-slot:footer>
    <fv-button theme="dark" background="rgba(0, 90, 158, 1)">OK</fv-button>
    <fv-button @click="footer = false">Cancel</fv-button>
</template>
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="footer" :isFooter="true" :isAcrylic="true">
    <template v-slot:footer>
        <fv-button theme="dark" background="rgba(0, 90, 158, 1)">OK</fv-button>
        <fv-button>Cancel</fv-button>
    </template>
</fv-Panel>
```

### Panel Dark Theme
---

Standard

<ClientOnly>
<fv-button style="width: 200px;" @click="dark = true">Open Panel</fv-button>
<fv-Panel v-model="dark" :isLightDismiss="true" theme="dark">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="dark" :isLightDismiss="true" theme="dark">
</fv-Panel>
```

Acrylic

<ClientOnly>
<fv-button style="width: 200px;" @click="acrylicDark = true">Open Panel</fv-button>
<fv-Panel v-model="acrylicDark" :isLightDismiss="true" :isAcrylic="true" theme="dark">
</fv-Panel>
</ClientOnly>

```vue
<fv-Panel v-model="acrylicDark" :isLightDismiss="true" :isAcrylic="true" theme="dark">
</fv-Panel>
```

### Properties
---
| Property       | Type    | Required | Default        | Description                                                              |
|:--------------:|:-------:|:--------:|:--------------:|:------------------------------------------------------------------------:|
| modelValue     | any     | No       | !false         | See the Panel `modelValue` option.                                       |
| title          | string  | No       | 'Sample Panel' | Title.                                                                   |
| titleSize      | number  | No       | 20             | See the Panel `titleSize` option.                                        |
| titleWeight    | number  | No       | 600            | See the Panel `titleWeight` option.                                      |
| titleColor     | string  | No       | ''             | See the Panel `titleColor` option.                                       |
| width          | string  | No       | '340'          | See the Panel `width` option.                                            |
| height         | string  | No       | '100%'         | See the Panel `height` option.                                           |
| background     | string  | No       | ''             | See the Panel `background` option.                                       |
| isNearSide     | boolean | No       | false          | See the Panel `isNearSide` option.                                       |
| isCentralSide  | boolean | No       | false          | See the Panel `isCentralSide` option.                                    |
| isLightDismiss | boolean | No       | false          | See the Panel `isLightDismiss` option.                                   |
| showTitleBar   | boolean | No       | true           | See the Panel `showTitleBar` option.                                     |
| isFooter       | boolean | No       | false          | See the Panel `isFooter` option.                                         |
| isAcrylic      | boolean | No       | false          | See the Panel `isAcrylic` option.                                        |
| controlPadding | string  | No       | '15px'         | See the Panel `controlPadding` option.                                   |
| contentPadding | string  | No       | '0px'          | See the Panel `contentPadding` option.                                   |
| isBottomSide   | boolean | No       | false          | See the Panel `isBottomSide` option.                                     |
| isTopSide      | boolean | No       | false          | See the Panel `isTopSide` option.                                        |
| teleport       | boolean | No       | false          | See the Panel `teleport` option.                                         |
| theme          | string  | No       | 'global'       | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled       | boolean | No       | false          | See the Panel `disabled` option.                                         |
| lang           | string  | No       | "global"       | See the Panel `lang` option.                                             |

### Slots
---
1. Container



```javascript
<template v-slot:container>
</template>
```

2. Header



```javascript
<template v-slot:header>
</template>
```

3. Footer



```javascript
<template v-slot:footer>
</template>
```
