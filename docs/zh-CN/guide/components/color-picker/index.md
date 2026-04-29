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
const previewColor = ref('#CA5010FF');
const colorInfo = ref({
    hex: '#4F6BEDCC',
    rgba: { r: 79, g: 107, b: 237, a: 0.8 },
    hsla: { h: 229.37, s: 81.44, l: 61.96, a: 0.8 }
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
.cp-docs {
    display: grid;
    gap: 20px;
}

.cp-panel {
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

.cp-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.cp-meta {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.68);
    line-height: 1.6;
}

.cp-code {
    margin: 0;
    padding: 14px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.96);
    color: #dbeafe;
    font-size: 12px;
    line-height: 1.7;
    overflow: auto;
}

.cp-example {
    display: grid;
    gap: 12px;
}
</style>

# ColorPicker

ColorPicker 支持 `box` 和 `ring` 两种取色模式，`v-model` 继续保持字符串输出，同时也能为事件监听提供结构化的颜色对象。

## 快速开始

<div class="cp-docs">
    <section class="cp-panel">
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
            @update:modelValue="handleModelUpdate"
            @color-info="handleColorInfo"
        />
    </section>

    <section class="cp-grid">
        <article class="cp-panel cp-example">
            <h3>结构化颜色对象</h3>
            <p class="cp-meta">
                `v-model` 仍然返回十六进制字符串。现在同一个 `update:modelValue` 事件会额外返回第二个参数，包含 `hex`、`rgba`、`hsla`，同时 `color-info` 事件会直接返回同样的对象。
            </p>
            <pre class="cp-code">{{ JSON.stringify(colorInfo, null, 2) }}</pre>
        </article>

        <article class="cp-panel cp-example">
            <h3>紧凑模式</h3>
            <p class="cp-meta">
                可以隐藏 fields 区域，并且只保留你真正需要的拖动条。
            </p>
            <fv-color-picker
                v-model="compactColor"
                :theme="theme"
                hideFields
                :showSaturationSlider="false"
            />
        </article>

        <article class="cp-panel cp-example">
            <h3>单独控制滑条</h3>
            <p class="cp-meta">
                `value`、`saturation`、`alpha` 三个滑条都可以分别开启或关闭。
            </p>
            <fv-color-picker
                v-model="previewColor"
                :theme="theme"
                type="box"
                :showValueSlider="false"
                :showSaturationSlider="true"
                :showAlphaSlider="true"
            />
        </article>
    </section>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue';

const color = ref('#4F6BEDCC');

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
    type="ring"
    @update:modelValue="handleUpdate"
  />
</template>
```

## 更多示例

### 隐藏 Fields 区域

```vue
<fv-color-picker
  v-model="color"
  hideFields
/>
```

### 只显示透明度滑条

```vue
<fv-color-picker
  v-model="color"
  hideFields
  :showValueSlider="false"
  :showSaturationSlider="false"
  :showAlphaSlider="true"
/>
```

### 只监听结构化颜色对象

```vue
<fv-color-picker
  v-model="color"
  @color-info="(info) => console.log(info.hsla)"
/>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
