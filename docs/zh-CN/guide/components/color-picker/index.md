---
page: true
title: ColorPicker
---

<!-- lang-switch -->
<script lang="ts" setup>
import { ref } from 'vue';
import { useTheme } from '../common/index.js';

const { theme } = useTheme();

const colorMode = ref<'ring' | 'box'>('ring');
const color = ref('#4F6BEDCC');
const compactColor = ref('#0F6CBDFF');
const alphaColor = ref('#CA5010FF');
const infoColor = ref('#6B69D6CC');
const colorInfo = ref({
    hex: '#6B69D6CC',
    rgba: { r: 107, g: 105, b: 214, a: 0.8 },
    hsla: { h: 241.1, s: 57.59, l: 62.55, a: 0.8 }
});

function handleModelUpdate(value: string, info?: any) {
    if (info) {
        colorInfo.value = info;
    }
}

function handleColorInfo(info: any) {
    colorInfo.value = info;
}
</script>

<style scoped>
.cp-panel {
    margin: 12px 0 18px;
    padding: 18px 20px;
    border-radius: 16px;
    border: 1px solid rgba(120, 120, 120, 0.14);
    background:
        radial-gradient(circle at top right, rgba(15, 108, 189, 0.08), transparent 34%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 251, 0.96));
}

.cp-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}

.cp-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.04);
    font-size: 12px;
}

.cp-swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.cp-note {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.68);
    line-height: 1.6;
}

.cp-code {
    margin: 12px 0 0;
    padding: 14px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.96);
    color: #dbeafe;
    font-size: 12px;
    line-height: 1.7;
    overflow: auto;
}
</style>

### ColorPicker-Demo

<div class="cp-panel">
    <div class="cp-toolbar">
        <span class="cp-chip">
            <span class="cp-swatch" :style="{ background: color }"></span>
            <strong>{{ color }}</strong>
        </span>
        <fv-radio :theme="theme" v-model="colorMode" label="ring">Ring</fv-radio>
        <fv-radio :theme="theme" v-model="colorMode" label="box">Box</fv-radio>
    </div>
    <fv-color-picker
        v-model="color"
        :theme="theme"
        :type="colorMode"
    />
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#4F6BEDCC');
const colorMode = ref<'ring' | 'box'>('ring');
</script>

<template>
  <fv-color-picker
    v-model="color"
    :type="colorMode"
  />
</template>
```

### ColorPicker-Color Info

<div class="cp-panel">
    <p class="cp-note">
        `v-model` 仍然返回十六进制字符串。如果你需要更多颜色信息，可以通过 `update:modelValue` 的第二个参数拿到 `hex`、`rgba`、`hsla`，也可以直接监听 `color-info`。
    </p>
    <fv-color-picker
        v-model="infoColor"
        :theme="theme"
        @update:modelValue="handleModelUpdate"
        @color-info="handleColorInfo"
    />
    <pre class="cp-code">{{ JSON.stringify(colorInfo, null, 2) }}</pre>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#6B69D6CC');

function handleUpdate(value: string, info?: {
  hex: string;
  rgba: { r: number; g: number; b: number; a: number };
  hsla: { h: number; s: number; l: number; a: number };
}) {
  console.log(value);
  console.log(info);
}
</script>

<template>
  <fv-color-picker
    v-model="color"
    @update:modelValue="handleUpdate"
  />
</template>
```

### ColorPicker-Hide Fields

<div class="cp-panel">
    <p class="cp-note">
        `hideFields` 可以隐藏下方的数值编辑区和颜色模式切换，让组件更适合紧凑布局。
    </p>
    <fv-color-picker
        v-model="compactColor"
        :theme="theme"
        hideFields
    />
</div>

```vue
<fv-color-picker
  v-model="color"
  hideFields
/>
```

### ColorPicker-Control Sliders

<div class="cp-panel">
    <p class="cp-note">
        `value`、`saturation`、`alpha` 三个滑条可以分别控制显示状态，适合按业务场景做简化。
    </p>
    <fv-color-picker
        v-model="alphaColor"
        :theme="theme"
        hideFields
        :showValueSlider="false"
        :showSaturationSlider="false"
        :showAlphaSlider="true"
    />
</div>

```vue
<fv-color-picker
  v-model="color"
  hideFields
  :showValueSlider="false"
  :showSaturationSlider="false"
  :showAlphaSlider="true"
/>
```

### ColorPicker-Ring Only

<div class="cp-panel">
    <p class="cp-note">
        `type="ring"` 会把颜色区域切换成圆环取色形式，适合更强调 Hue 选择的场景。
    </p>
    <fv-color-picker
        v-model="color"
        :theme="theme"
        type="ring"
    />
</div>

```vue
<fv-color-picker
  v-model="color"
  type="ring"
/>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
