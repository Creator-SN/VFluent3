---
page: true
title: Combobox
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Combobox-DEMO
---

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple" },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape" },
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


<ClientOnly>
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
</fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
</fv-Combobox>
```

### Combobox-Disabled
---

<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" disabled>
</fv-Combobox>
```

### Combobox-Dark Theme
---
<div style="width: 100%; background: black;">
    
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-Combobox>
</div>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option" theme="dark">
</fv-Combobox>
```

### Combobox Customize
---

<fv-Combobox v-model="value" :options="options" placeholder="Pick a option"><template v-slot:default="x"><i>{{x.item.text}}</i></template></fv-Combobox>

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
    <template v-slot:default="x">
        <i>{{x.item.text}}</i>
    </template>
</fv-Combobox>
```

Default Styles

```vue
<fv-Combobox v-model="value" :options="options" placeholder="Pick a option">
    <template v-slot:default="x">
        <i class="before-choosen" :style="{background: choosenSliderBackground}"></i>
        {{valueTrigger(x.item.type) !== 'divider' ? valueTrigger(x.item.text) : ''}}
    </template>
</fv-Combobox>
```

</ClientOnly>

### 属性
---
| 属性                    | 类型    | 必填  | 默认值        | 说明                                                             |
|:-----------------------:|:-------:|:-----:|:-------------:|:----------------------------------------------------------------:|
| modelValue              | object  | 否    | {}            | Combobox当前项绑定。                                             |
| options                 | array   | 否    | []            | Combobox数据。                                                   |
| borderWidth             | number  | 否    | 1             |                                                                  |
| placeholder             | string  | 否    | 'Combobox'    |                                                                  |
| borderColor             | string  | 否    | ''            |                                                                  |
| borderRadius            | number  | 否    | 6             |                                                                  |
| background              | string  | 否    | ''            |                                                                  |
| choosenBackground       | string  | 否    | ''            |                                                                  |
| choosenSliderBackground | string  | 否    | ''            |                                                                  |
| inputForeground         | string  | 否    | ''            |                                                                  |
| inputBackground         | string  | 否    | ''            |                                                                  |
| titleForeground         | string  | 否    | ''            |                                                                  |
| itemHeight              | number  | 否    | 40            | Combobox Item 高度。                                             |
| dropDownIcon            | string  | 否    | 'ChevronDown' |                                                                  |
| dropDownIconForeground  | string  | 否    | ''            |                                                                  |
| revealBorderColor       | boolean | 否    | false         |                                                                  |
| revealBackgroundColor   | boolean | 否    | false         |                                                                  |
| disabled                | boolean | 否    | false         |                                                                  |
| theme                   | string  | 否    | 'global'      | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang                    | string  | 否    | "global"      | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名      | 参数         | 说明                 |
|:-----------:|:------------:|:--------------------:|
| choose-item | value/object | Combobox choose item |

### 插槽

---

1. Default

用户可自定义 Combobx Item 内容

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

### Data
---
1. options

```javascript
options = [{key: '', text: '', type: '', disabled: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", text: "Fruits", type: "header" },
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "orange", text: "Orange", disabled: true },
    { key: "grape", text: "Grape" },
    { key: "divider_1", text: "-", type: "divider" },
    { key: "vegetablesHeader", text: "Vegetables", type: "header" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
]
```
  
**特别地** 0.1.62版本后支持采用函数式字段, 其中支持的字段包括`text`, `disabled`, `type`
