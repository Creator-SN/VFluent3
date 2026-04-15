---
page: true
title: MenuFlyout
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
export default {
    data () {
        return {
            value: [],
            options: [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple", children: [
                    { key: "A", text: "A" },
                    { key: "B", text: "B" },
                    { key: "Apple C", text: "Apple C", children: [
                        { key: "A", text: "A" },
                        { key: "B", text: "B" },
                        { key: "Apple C-C", text: "Apple C-C", children: [
                            { key: "A", text: "A" },
                            { key: "B", text: "B" },
                            { key: "Apple C-C-C", text: "Apple C-C-C" }
                        ] }
                    ] }
                ] },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape", children: [
                    { key: "A", text: "A" },
                    { key: "B", text: "B" },
                    { key: "C", text: "C" }
                ] },
                { key: "divider_1", text: "-", type: "divider" },
                { key: "vegetablesHeader", text: "Vegetables", type: "header" },
                { key: "broccoli", text: "Broccoli" },
                { key: "carrot", text: "Carrot" },
                { key: "lettuce", text: "Lettuce" }
            ]
        }
    }
}
</script>

### MenuFlyout
---

<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option">
</fv-menuFlyout>
</ClientOnly>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option">
</fv-menuFlyout>
```

### menuFlyout-Disabled
---

<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-menuFlyout>
</ClientOnly>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-menuFlyout>
```

### menuFlyout-Dark Theme
---
<div style="width: 100%; background: black;">
    
<ClientOnly>
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-menuFlyout>
</ClientOnly>
</div>

```vue
<fv-menuFlyout v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-menuFlyout>
```

### 属性
---
| 属性                    | 类型    | 必填  | 默认值               | 说明                                                             |
|:-----------------------:|:-------:|:-----:|:--------------------:|:----------------------------------------------------------------:|
| modelValue              | object  | 否    | () => { return []; } | Combobox当前项绑定。                                             |
| options                 | array   | 否    | []                   | Combobox数据。                                                   |
| borderWidth             | number  | 否    | 1                    |                                                                  |
| placeholder             | string  | 否    | 'menuFlyout'         |                                                                  |
| borderRadius            | string  | 否    | '3'                  |                                                                  |
| background              | string  | 否    | ''                   |                                                                  |
| choosenBackground       | string  | 否    | ''                   |                                                                  |
| choosenSliderBackground | string  | 否    | ''                   |                                                                  |
| inputForeground         | string  | 否    | ''                   |                                                                  |
| inputBackground         | string  | 否    | ''                   |                                                                  |
| titleForeground         | string  | 否    | ''                   |                                                                  |
| dropDownIcon            | string  | 否    | 'ChevronDown'        |                                                                  |
| dropDownIconForeground  | string  | 否    | ''                   |                                                                  |
| menuWidth               | number  | 否    | 200                  |                                                                  |
| menuMaxHeight           | number  | 否    | 350                  |                                                                  |
| rootTriggerMode         | string  | 否    | 'click'              | 外层触发方式，click 点击触发，enter 移动触发。                   |
| triggerMode             | string  | 否    | 'enter'              | 内层触发方式，click 点击触发，enter 移动触发。                   |
| wrapperNode             | any     | 否    | null                 | 外层元素包括的滚动容器，如果要考虑滚动同步，则需要设置该属性。   |
| revealBorderColor       | boolean | 否    | false                |                                                                  |
| revealBackgroundColor   | boolean | 否    | false                |                                                                  |
| mobileMode              | boolean | 否    | false                | 是否开启移动端显示。                                             |
| isBoxShadow             | boolean | 否    | true                 |                                                                  |
| disabled                | boolean | 否    | false                |                                                                  |
| theme                   | string  | 否    | 'global'             | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| revealBorder            | boolean | 否    | true                 | 参见组件的 `revealBorder` 选项。                                 |
| lang                    | string  | 否    | "global"             | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名      | 参数         | 说明                 |
|:-----------:|:------------:|:--------------------:|
| choose-item | value/object | Combobox choose item |

### 插槽

---

1. Default

用户可自定义 MenuFlyout Item 内容

```vue
<slot :item="item">
    {{valueTrigger(item.type) !== 'divider' ? valueTrigger(item.text) : ''}}
</slot>
```

用户自定义样式时, 包含以下可选属性

- item: 当前组数据

```vue
<template v-slot:default="x">
  <i>{{x.item.text}}</i>
</template>
```

2. Input

用户可自定义 MenuFlyout Input 内容

- switchStatus: 切换状态函数

```vue
<slot name="input" :switch="switchStatus">
    <fv-text-box
        :model-value="computedValue"
        :placeholder="placeholder"
        :theme="$theme"
        readonly
        :background="inputBackground"
        :foreground="inputForeground"
        :border-radius="borderRadius"
        :icon="dropDownIcon"
        :icon-foreground="dropDownIconForeground"
        :reveal-background-color="revealBorderColor"
        :reveal-border-color="revealBackgroundColor"
        :reveal-border-width="borderWidth"
        :reveal-border="revealBorder"
        :is-box-shadow="isBoxShadow"
        :disabled="isDisabled"
        :cursor="'default'"
        @click="switchStatus"
        @mouseenter="switchStatus"
    ></fv-text-box>
</slot>
```

### Data
---
1. options

```javascript
options = [{key: '', text: '', type: '', disabled: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", text: "Fruits", type: "header" },
    { key: "apple", text: "Apple", children: [
        { key: "A", text: "A" },
        { key: "B", text: "B" },
        { key: "Apple C", text: "Apple C", children: [
            { key: "A", text: "A" },
            { key: "B", text: "B" },
            { key: "Apple C-C", text: "Apple C-C", children: [
                { key: "A", text: "A" },
                { key: "B", text: "B" },
                { key: "Apple C-C-C", text: "Apple C-C-C" }
            ] }
        ] }
    ] },
    { key: "banana", text: "Banana" },
    { key: "orange", text: "Orange", disabled: true },
    { key: "grape", text: "Grape", children: [
        { key: "A", text: "A" },
        { key: "B", text: "B" },
        { key: "C", text: "C" }
    ] },
    { key: "divider_1", text: "-", type: "divider" },
    { key: "vegetablesHeader", text: "Vegetables", type: "header" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
]
```
  
**其中** `text`, `disabled`, `type`属性支持函数式声明.
