---
page: true
title: MenuFlyout
---


<!-- lang-switch -->
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

### Properties
---
| Property                | Type    | Required | Default              | Description                                                              |
|:-----------------------:|:-------:|:--------:|:--------------------:|:------------------------------------------------------------------------:|
| modelValue              | object  | No       | () => { return []; } | See the MenuFlyout `modelValue` option.                                  |
| options                 | array   | No       | []                   | See the MenuFlyout `options` option.                                     |
| borderWidth             | number  | No       | 1                    |                                                                          |
| placeholder             | string  | No       | 'menuFlyout'         |                                                                          |
| borderRadius            | string  | No       | '3'                  |                                                                          |
| background              | string  | No       | ''                   |                                                                          |
| choosenBackground       | string  | No       | ''                   |                                                                          |
| choosenSliderBackground | string  | No       | ''                   |                                                                          |
| inputForeground         | string  | No       | ''                   |                                                                          |
| inputBackground         | string  | No       | ''                   |                                                                          |
| titleForeground         | string  | No       | ''                   |                                                                          |
| dropDownIcon            | string  | No       | 'ChevronDown'        |                                                                          |
| dropDownIconForeground  | string  | No       | ''                   |                                                                          |
| menuWidth               | number  | No       | 200                  |                                                                          |
| menuMaxHeight           | number  | No       | 350                  |                                                                          |
| rootTriggerMode         | string  | No       | 'click'              | See the MenuFlyout `rootTriggerMode` option.                             |
| triggerMode             | string  | No       | 'enter'              | See the MenuFlyout `triggerMode` option.                                 |
| wrapperNode             | any     | No       | null                 | See the MenuFlyout `wrapperNode` option.                                 |
| revealBorderColor       | boolean | No       | false                |                                                                          |
| revealBackgroundColor   | boolean | No       | false                |                                                                          |
| mobileMode              | boolean | No       | false                | See the MenuFlyout `mobileMode` option.                                  |
| isBoxShadow             | boolean | No       | true                 |                                                                          |
| disabled                | boolean | No       | false                |                                                                          |
| theme                   | string  | No       | 'global'             | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| revealBorder            | boolean | No       | true                 | See the MenuFlyout `revealBorder` option.                                |
| lang                    | string  | No       | "global"             | See the MenuFlyout `lang` option.                                        |

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

2. Input





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
