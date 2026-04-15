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

### 属性
---
| 属性           | 类型    | 必填  | 默认值         | 说明                                                             |
|:--------------:|:-------:|:-----:|:--------------:|:----------------------------------------------------------------:|
| modelValue     | any     | 否    | !false         | 显示/隐藏`Panel`                                                 |
| title          | string  | 否    | 'Sample Panel' | 标题。                                                           |
| titleSize      | number  | 否    | 20             | 标题字体大小。                                                   |
| titleWeight    | number  | 否    | 600            | 标题字体粗细。                                                   |
| titleColor     | string  | 否    | ''             | 标题字体颜色。                                                   |
| width          | string  | 否    | '340'          | 宽度。                                                           |
| height         | string  | 否    | '100%'         | 宽度。                                                           |
| background     | string  | 否    | ''             | `Panel`背景色。                                                  |
| isNearSide     | boolean | 否    | false          | 是否从左侧显示。                                                 |
| isCentralSide  | boolean | 否    | false          | 是否从中央显示。                                                 |
| isLightDismiss | boolean | 否    | false          | 是否单击空白处关闭。                                             |
| showTitleBar   | boolean | 否    | true           | 是否显示标题栏。                                                 |
| isFooter       | boolean | 否    | false          | 是否显示底部控制。                                               |
| isAcrylic      | boolean | 否    | false          | 是否开启`Acrylic`效果。                                          |
| controlPadding | string  | 否    | '15px'         | 标题和控制栏内边距。                                             |
| contentPadding | string  | 否    | '0px'          | 内容内边距。                                                     |
| isBottomSide   | boolean | 否    | false          | 从底部显式。                                                     |
| isTopSide      | boolean | 否    | false          | 从顶部显示。                                                     |
| teleport       | boolean | 否    | false          | 穿越当前父容器全局放置。                                         |
| theme          | string  | 否    | 'global'       | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled       | boolean | 否    | false          | 参见组件的 `disabled` 选项。                                     |
| lang           | string  | 否    | "global"       | 参见组件的 `lang` 选项。                                         |

### 插槽
---
1. Container

自定义容器内容

```javascript
<template v-slot:container>
</template>
```

2. Header

自定义标题栏内容

```javascript
<template v-slot:header>
</template>
```

3. Footer

自定义`Footer`内容

```javascript
<template v-slot:footer>
</template>
```
