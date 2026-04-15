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

### Properties
---
| Property                | Type    | Required | Default       | Description                                                              |
|:-----------------------:|:-------:|:--------:|:-------------:|:------------------------------------------------------------------------:|
| modelValue              | object  | No       | {}            | See the Combobox `modelValue` option.                                    |
| options                 | array   | No       | []            | See the Combobox `options` option.                                       |
| borderWidth             | number  | No       | 1             |                                                                          |
| placeholder             | string  | No       | 'Combobox'    |                                                                          |
| borderColor             | string  | No       | ''            |                                                                          |
| borderRadius            | number  | No       | 6             |                                                                          |
| background              | string  | No       | ''            |                                                                          |
| choosenBackground       | string  | No       | ''            |                                                                          |
| choosenSliderBackground | string  | No       | ''            |                                                                          |
| inputForeground         | string  | No       | ''            |                                                                          |
| inputBackground         | string  | No       | ''            |                                                                          |
| titleForeground         | string  | No       | ''            |                                                                          |
| itemHeight              | number  | No       | 40            | See the Combobox `itemHeight` option.                                    |
| dropDownIcon            | string  | No       | 'ChevronDown' |                                                                          |
| dropDownIconForeground  | string  | No       | ''            |                                                                          |
| revealBorderColor       | boolean | No       | false         |                                                                          |
| revealBackgroundColor   | boolean | No       | false         |                                                                          |
| disabled                | boolean | No       | false         |                                                                          |
| theme                   | string  | No       | 'global'      | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang                    | string  | No       | "global"      | See the Combobox `lang` option.                                          |

### Events
---
| Event       | Arguments    | Description          |
|:-----------:|:------------:|:--------------------:|
| choose-item | value/object | Combobox choose item |

### Slots

---

1. Default



```vue
<slot :item="item">
    {{valueTrigger(item.type) !== 'divider' ? valueTrigger(item.text) : ''}}
</slot>
```





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
