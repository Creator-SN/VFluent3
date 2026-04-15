---
page: true
title: Pivot
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Pivot-DEMO
---

<script>
export default {
    data () {
        return {
            value: null,
            items: [
                { key: 0, name: "All", width: 60},
                { key: 1, name: "Unread", width: 80},
                { key: 2, name: "Flagged", width: 80, disabled: true },
                { key: 3, name: "Urgent", width: 80}
            ]
        }
    }
}
</script>

<ClientOnly>

<fv-Pivot v-model="value" :items="items"></fv-Pivot>

```vue
<fv-Pivot :items="items"></fv-Pivot>
```

### Pivot-Tab Style
---

<fv-Pivot v-model="value" :items="items" :tab="true"></fv-Pivot>

```vue
<fv-Pivot :items="items" :tab="true"></fv-Pivot>
```

### Pivot-Tab Customize
---

<fv-Pivot v-model="value" :items="items" :tab="true" :sliderBoxshadow="true" style="height: 35px;" :background="'rgba(238, 238, 239, 1)'"></fv-Pivot>

```vue
<fv-Pivot v-model="value" :items="items" :tab="true" :sliderBoxshadow="true" :background="'rgba(238, 238, 239, 1)'"></fv-Pivot>
```

### Pivot-Dark Theme
---
<div style="width: 100%; background: black;">
    
<fv-Pivot v-model="value" :items="items" theme="dark"></fv-Pivot>
<fv-Pivot v-model="value" :items="items" :tab="true" theme="dark"></fv-Pivot>
</div>

```vue
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark"></fv-Pivot>
</div>
```

### Pivot-Custom Style
---
<div style="width: 100%; background: black;">
    <fv-Pivot v-model="value" :items="items" theme="dark" foreground="rgba(0, 204, 153, 1)" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
    <fv-Pivot v-model="value" :items="items" :tab="true" theme="dark" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
</div>

```vue
<div style="width: 100%; background: black;">
    <fv-Pivot :items="items" theme="dark" foreground="rgba(0, 204, 153, 1)" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
    <fv-Pivot :items="items" :tab="true" theme="dark" sliderBackground="rgba(0, 204, 153, 1)"></fv-Pivot>
</div>
```

</ClientOnly>

### Properties
---
| Property           | Type    | Required | Default                        | Description                                                              |
|:------------------:|:-------:|:--------:|:------------------------------:|:------------------------------------------------------------------------:|
| modelValue         | object  | No       | () => { return null; }         | See the Pivot `modelValue` option.                                       |
| items              | array   | No       | [{ name: 'Pivot', width: 80 }] | See the Pivot `items` option.                                            |
| tab                | boolean | No       | false                          | See the Pivot `tab` option.                                              |
| padding            | string  | No       | ''                             | See the Pivot `padding` option.                                          |
| itemPadding        | string  | No       | ''                             | See the Pivot `itemPadding` option.                                      |
| fontSize           | string  | No       | ''                             | See the Pivot `fontSize` option.                                         |
| foreground         | string  | No       | ''                             | Foreground color.                                                        |
| choosenForeground  | string  | No       | ''                             | See the Pivot `choosenForeground` option.                                |
| sliderBackground   | string  | No       | ''                             | See the Pivot `sliderBackground` option.                                 |
| sliderBoxshadow    | boolean | No       | false                          | See the Pivot `sliderBoxshadow` option.                                  |
| sliderBorderRadius | string  | No       | '3'                            | See the Pivot `sliderBorderRadius` option.                               |
| background         | string  | No       | ''                             | Background color.                                                        |
| borderRadius       | string  | No       | ''                             | See the Pivot `borderRadius` option.                                     |
| theme              | string  | No       | 'global'                       | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled           | boolean | No       | false                          | See the Pivot `disabled` option.                                         |
| lang               | string  | No       | "global"                       | See the Pivot `lang` option.                                             |

### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| input  | value     | See the component `input` option.  |
| change | object    | See the component `change` option. |

### Slots
---
1. Container







```javascript
<template v-slot:container="x">
</template>
```

### Data
---
1. items



```javascript
items = [{ key: 0, name: "Pivot", width: 80, show: true, disabled: false }]

//e.g.//

items: [{ key: 0, name: "Pivot", width: 80 }]
```
