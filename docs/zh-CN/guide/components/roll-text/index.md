---
page: true
title: RollText
---

<script lang="ts" setup>
import { useTheme } from '../common/index.js';

const { theme } = useTheme();
</script>

# RollText

## 快速开始

RollText 用于展示在元素自身宽度/高度内无法完整显示的文字。通过 `forward` 控制滚动方向，并将需要滚动的文本放在默认插槽中。需要限制可视区域时，直接在组件上设置 `width` / `height` 即可。

### 水平滚动

<ClientOnly>
<fv-roll-text style="width: 260px;" :theme="theme" forward="right" mode="once" :duration="2500" :offset="160">
这段标题太长了，在窄导航栏中显示不下
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 260px;"
    :theme="theme"
    forward="right"
    mode="once"
    :duration="2500"
    :offset="160"
>
    这段标题太长了，在窄导航栏中显示不下
</fv-roll-text>
```

### 垂直滚动

<ClientOnly>
<fv-roll-text style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;" :theme="theme" forward="down" mode="loop" :duration="2500" :interval="600">
<div style="height: 22px; line-height: 22px;">1. 第一条公告</div>
<div style="height: 22px; line-height: 22px;">2. 第二条公告</div>
<div style="height: 22px; line-height: 22px;">3. 第三条公告</div>
<div style="height: 22px; line-height: 22px;">4. 第四条公告</div>
<div style="height: 22px; line-height: 22px;">5. 第五条公告</div>
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;"
    :theme="theme"
    forward="down"
    mode="loop"
    :duration="2500"
    :interval="600"
>
    <div style="height: 22px; line-height: 22px;">1. 第一条公告</div>
    <div style="height: 22px; line-height: 22px;">2. 第二条公告</div>
    <div style="height: 22px; line-height: 22px;">3. 第三条公告</div>
    <div style="height: 22px; line-height: 22px;">4. 第四条公告</div>
    <div style="height: 22px; line-height: 22px;">5. 第五条公告</div>
</fv-roll-text>
```

### 滚动模式

`mode` 支持以下值：

- `once`：一次性单向滚动。
- `repeat`：多次单向滚动，每次到终点后等待 `interval`，再从起点重新开始。
- `bounce`：来回滚动一次。
- `loop`：循环来回滚动。
- `none`：关闭自动滚动，适合只用手动滚动的场景。

<ClientOnly>
<fv-roll-text style="width: 260px;" :theme="theme" forward="right" mode="loop" :duration="1800" :interval="400" :offset="120">
循环来回滚动
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 260px;"
    :theme="theme"
    forward="right"
    mode="loop"
    :duration="1800"
    :interval="400"
    :offset="120"
>
    循环来回滚动
</fv-roll-text>
```

### 手动滚动

设置 `manual` 可以允许鼠标滚轮或触摸手动滚动。自动滚动过程中会锁定手动滚动，因此纯手动示例请使用 `mode="none"`。

<ClientOnly>
<fv-roll-text style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;" :theme="theme" forward="down" mode="none" :manual="true">
<div style="height: 22px; line-height: 22px;">1. 第一条公告</div>
<div style="height: 22px; line-height: 22px;">2. 第二条公告</div>
<div style="height: 22px; line-height: 22px;">3. 第三条公告</div>
<div style="height: 22px; line-height: 22px;">4. 第四条公告</div>
<div style="height: 22px; line-height: 22px;">5. 第五条公告</div>
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;"
    :theme="theme"
    forward="down"
    mode="none"
    :manual="true"
>
    <div style="height: 22px; line-height: 22px;">1. 第一条公告</div>
    <div style="height: 22px; line-height: 22px;">2. 第二条公告</div>
    <div style="height: 22px; line-height: 22px;">3. 第三条公告</div>
    <div style="height: 22px; line-height: 22px;">4. 第四条公告</div>
    <div style="height: 22px; line-height: 22px;">5. 第五条公告</div>
</fv-roll-text>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
