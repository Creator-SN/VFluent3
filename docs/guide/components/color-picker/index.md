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

ColorPicker supports `box` and `ring` picking modes, string-based `v-model`, and a richer color payload for listeners that need structured channel values.

## Quick Start

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
            <h3>Structured Color Payload</h3>
            <p class="cp-meta">
                `v-model` still receives the hex string. The same `update:modelValue` event now exposes a second argument with `hex`, `rgba`, and `hsla`, and the `color-info` event emits the same object directly.
            </p>
            <pre class="cp-code">{{ JSON.stringify(colorInfo, null, 2) }}</pre>
        </article>

        <article class="cp-panel cp-example">
            <h3>Compact Mode</h3>
            <p class="cp-meta">
                Hide the fields section and only keep the sliders you need.
            </p>
            <fv-color-picker
                v-model="compactColor"
                :theme="theme"
                hideFields
                :showSaturationSlider="false"
            />
        </article>

        <article class="cp-panel cp-example">
            <h3>Preview Only Sliders</h3>
            <p class="cp-meta">
                You can independently toggle the value, saturation, and alpha sliders.
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

## More Examples

### Hide The Fields Area

```vue
<fv-color-picker
  v-model="color"
  hideFields
/>
```

### Show Only The Alpha Slider

```vue
<fv-color-picker
  v-model="color"
  hideFields
  :showValueSlider="false"
  :showSaturationSlider="false"
  :showAlphaSlider="true"
/>
```

### Listen Only To Structured Color Data

```vue
<fv-color-picker
  v-model="color"
  @color-info="(info) => console.log(info.hsla)"
/>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
