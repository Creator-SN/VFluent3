---
page: true
title: Radio
---

<!-- lang-switch -->
<script lang="ts" setup>
import { ref } from 'vue';
import { useTheme } from '../common/index.js';

const { theme } = useTheme();

const basicValue = ref('Option');
const groupValue = ref('Windows');
const darkGroupValue = ref('Email');
const iconValue = ref('NUIIris');
const imageValue = ref('Chart');
const customValue = ref('Mint');
</script>

[[toc]]

多个 `fv-radio` 只要共享同一个 `v-model`，并且各自提供不同的 `label`，就可以自然形成单选组效果，所以 `radio` 本身已经能覆盖 `radio-group` 的常见用法。

### 基础用法

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio v-model="basicValue" label="Option">Option</fv-radio>
    <fv-radio v-model="basicValue" label="Option2">Option2</fv-radio>
    <fv-radio label="Option3" disabled>Disabled</fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio v-model="basicValue" label="Option">Option</fv-radio>
  <fv-radio v-model="basicValue" label="Option2">Option2</fv-radio>
  <fv-radio label="Option3" disabled>Disabled</fv-radio>
</div>
```

### 分组示例

---

<ClientOnly>
<div :class="['radio-docs-card', { 'radio-docs-card--dark': theme === 'dark' }]">
    <div class="radio-docs-card__title">Choose a platform</div>
    <div class="radio-docs-row">
        <fv-radio v-model="groupValue" label="Windows">Windows</fv-radio>
        <fv-radio v-model="groupValue" label="macOS">macOS</fv-radio>
        <fv-radio v-model="groupValue" label="Linux">Linux</fv-radio>
    </div>
</div>
</ClientOnly>

```vue
<div :class="['radio-docs-card', { 'radio-docs-card--dark': theme === 'dark' }]">
  <div class="radio-docs-card__title">Choose a platform</div>
  <div class="radio-docs-row">
    <fv-radio v-model="groupValue" label="Windows">Windows</fv-radio>
    <fv-radio v-model="groupValue" label="macOS">macOS</fv-radio>
    <fv-radio v-model="groupValue" label="Linux">Linux</fv-radio>
  </div>
</div>
```

### 暗色分组

---

<ClientOnly>
<div class="radio-docs-card radio-docs-card--dark">
    <div class="radio-docs-card__title">Notification channel</div>
    <div class="radio-docs-row">
        <fv-radio v-model="darkGroupValue" label="Email" theme="dark">Email</fv-radio>
        <fv-radio v-model="darkGroupValue" label="Teams" theme="dark">Teams</fv-radio>
        <fv-radio v-model="darkGroupValue" label="SMS" theme="dark" disabled>SMS</fv-radio>
    </div>
</div>
</ClientOnly>

```vue
<div class="radio-docs-card radio-docs-card--dark">
  <div class="radio-docs-card__title">Notification channel</div>
  <div class="radio-docs-row">
    <fv-radio v-model="darkGroupValue" label="Email" theme="dark">Email</fv-radio>
    <fv-radio v-model="darkGroupValue" label="Teams" theme="dark">Teams</fv-radio>
    <fv-radio v-model="darkGroupValue" label="SMS" theme="dark" disabled>SMS</fv-radio>
  </div>
</div>
```

### 图标样式

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio v-model="iconValue" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
    <fv-radio v-model="iconValue" label="MSN" icon="NUIFace">MSN</fv-radio>
    <fv-radio v-model="iconValue" label="DisabledIcon" icon="NUIFace" disabled>Disabled</fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio v-model="iconValue" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
  <fv-radio v-model="iconValue" label="MSN" icon="NUIFace">MSN</fv-radio>
  <fv-radio v-model="iconValue" label="DisabledIcon" icon="NUIFace" disabled>Disabled</fv-radio>
</div>
```

### 图片样式

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio
        v-model="imageValue"
        label="Chart"
        image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png"
        activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png"
    >
        Chart
    </fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio
    v-model="imageValue"
    label="Chart"
    image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png"
    activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png"
  >
    Chart
  </fv-radio>
</div>
```

### 自定义颜色

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio
        icon="NUIIris"
        v-model="customValue"
        label="Mint"
        style="background:#00cc99;"
        theme="dark"
    >
        Mint
    </fv-radio>
    <fv-radio
        icon="NUIIris"
        v-model="customValue"
        label="MintDisabled"
        style="background:#00cc99;"
        theme="dark"
        disabled
    >
        Disabled
    </fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio
    icon="NUIIris"
    v-model="customValue"
    label="Mint"
    style="background:#00cc99;"
    theme="dark"
  >
    Mint
  </fv-radio>
  <fv-radio
    icon="NUIIris"
    v-model="customValue"
    label="MintDisabled"
    style="background:#00cc99;"
    theme="dark"
    disabled
  >
    Disabled
  </fv-radio>
</div>
```

### 属性

---

| 属性                  | 类型                        | 必填 | 默认值                  | 说明                                                                 |
|:---------------------:|:---------------------------:|:----:|:-----------------------:|:--------------------------------------------------------------------:|
| modelValue            | string \| number \| boolean | 否   | ''                      | `v-model` 绑定值。多个 `radio` 共享同一个 `v-model` 时会形成单选组。 |
| label                 | string \| number            | 是   | undefined               | 当前选项被选中后写入的值。                                           |
| theme                 | string                      | 否   | 'global'                | 主题色。                                                             |
| icon                  | string                      | 否   | null                    | Fluent 图标名称。                                                    |
| color                 | string                      | 否   | ''                      | 文本颜色。                                                           |
| foreground            | string                      | 否   | 'rgba(0, 90, 158, 0.8)' | 选中态前景色。                                                       |
| iconBlockBorderRadius | number                      | 否   | 6                       | 图标或图片模式下的圆角大小。                                         |
| iconBlockBorderWidth  | number                      | 否   | 2                       | 图标或图片模式下的边框宽度。                                         |
| image                 | string                      | 否   | null                    | 预览图片地址。                                                       |
| activeImage           | string                      | 否   | null                    | 选中态下使用的预览图片地址。                                         |
| disabled              | boolean                     | 否   | false                   | 是否禁用。                                                           |
| lang                  | string                      | 否   | "global"                | 继承组件库的语言设置。                                               |

### 事件

---

| 事件    | 参数  | 说明                     |
|:-------:|:-----:|:------------------------:|
| click   | event | 点击当前选项时触发。     |
| actived | event | 当前选项进入选中态时触发。 |

<style>
.radio-docs-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 18px;
}

.radio-docs-card {
    padding: 18px 20px;
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(244, 247, 251, 0.96));
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.radio-docs-card--dark {
    border-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(18, 24, 33, 0.98), rgba(36, 44, 58, 0.95));
    color: #fff;
}

.radio-docs-card__title {
    margin-bottom: 14px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.7;
}
</style>
