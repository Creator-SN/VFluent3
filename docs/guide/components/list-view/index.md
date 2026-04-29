---
page: true
title: ListView
--- 


<!-- lang-switch -->
### ListView-DEMO
---

<script>
export default {
    data () {
        return {
            items: [
                { key: "fruitsHeader", name: "Fruits", type: "header" },
                { key: "apple", name: "Apple", choosen: true },
                { key: "banana", name: "Banana" },
                { key: "orange", name: "Orange", disabled: true },
                { key: "grape", name: "Grape" },
                { key: "divider_1", name: "", type: "divider" },
                { key: "vegetablesHeader", name: "Vegetables", type: "header" },
                { key: "broccoli", name: "Broccoli" },
                { key: "carrot", name: "Carrot" },
                { key: "lettuce", name: "Lettuce" }
            ]
        }
    }
}
</script>


<div style="width: 100%; height: 500px; padding: 15px;">
    
<ClientOnly>
<fv-ListView v-model="items" :showSlider="true">
</fv-ListView>
</ClientOnly>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items" :showSlider="true">
    </fv-ListView>
</div>
```

### ListView-Multiple
---
<div style="width: 100%; height: 500px; padding: 15px;">
    
<ClientOnly>
<fv-ListView v-model="items" :multiple="true">
</fv-ListView>
</ClientOnly>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px;">
    <fv-ListView v-model="items" :multiple="true">
    </fv-ListView>
</div>
```

### ListView-Dark Theme
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    
<ClientOnly>
<fv-ListView v-model="items" theme="dark">
</fv-ListView>
</ClientOnly>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark">
    </fv-ListView>
</div>
```

### ListView-Custom Choosen Background
---
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    
<ClientOnly>
<fv-ListView v-model="items" theme="dark" choosenBackground="rgba(0, 204, 153, 0.6)">
</fv-ListView>
</ClientOnly>
</div>

```vue
<div style="width: 100%; height: 500px; padding: 15px; background: black;">
    <fv-ListView v-model="items" theme="dark" choosenBackground="rgba(0, 204, 153, 0.6)">
    </fv-ListView>
</div>
```



### Properties
---
| Property              | Type    | Required | Default  | Description                                                              |
|:---------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue            | array   | No       | []       | See the ListView `modelValue` option.                                    |
| choosen               | array   | No       | []       | See the ListView `choosen` option.                                       |
| multiple              | boolean | No       | false    | See the ListView `multiple` option.                                      |
| rowHeight             | string  | No       | ''       | See the ListView `rowHeight` option.                                     |
| headerForeground      | string  | No       | ''       | See the ListView `headerForeground` option.                              |
| choosenBackground     | string  | No       | ''       | See the ListView `choosenBackground` option.                             |
| itemPadding           | string  | No       | ''       | See the ListView `itemPadding` option.                                   |
| itemBorderRadius      | number  | No       | 3        | See the ListView `itemBorderRadius` option.                              |
| revealBorderColor     | boolean | No       | false    | See the ListView `revealBorderColor` option.                             |
| revealBackgroundColor | boolean | No       | false    | See the ListView `revealBackgroundColor` option.                         |
| showSlider            | boolean | No       | false    | See the ListView `showSlider` option.                                    |
| v-model:sliderTarget  | object  | No       | () => {} | See the ListView `sliderTarget` option.                                  |
| v-model:sliderIndex   | number  | No       | -1       | See the ListView `sliderIndex` option.                                   |
| theme                 | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled              | boolean | No       | false    | See the ListView `disabled` option.                                      |
| lang                  | string  | No       | "global" | See the ListView `lang` option.                                          |

### Events
---
| Event            | Arguments      | Description                                            |
|:----------------:|:--------------:|:------------------------------------------------------:|
| item-click       | object         | See the component `item-click` option.                 |
| chooseItem       | object         | See the component `chooseItem` option.                 |
| choosen-items    | array          | See the component `choosen-items` option.              |
| selection-change | object         | See the component `selection-change` option.           |
| item-drag-over   | \{root, drop\} | Emitted when the dragged item enters the current item. |
| item-drag-leave  | \{root, drop\} | Emitted when the dragged item leaves the current item. |
| item-drop        | \{root, drop\} | Emitted when an item is dropped on the current item.   |

### Slots
---
1. ListItem






```vue
<template v-slot:listItem="x">
    <p>{{ valueTrigger(item.name) }}</p>
</template>
```

2. Header



```vue
<template v-slot:header>
    <p></p>
</template>
```

3. Footer



```vue
<template v-slot:footer>
    <p></p>
</template>
```

### Data
---
1. items



```javascript
items = [{key: '', name: '', type: '', disabled: '', show: ''}]

//e.g.//

items: [
    { key: "fruitsHeader", name: "Fruits", type: "header" },
    { key: "apple", name: "Apple" },
    { key: "banana", name: "Banana" },
    { key: "orange", name: "Orange", disabled: true },
    { key: "grape", name: "Grape" },
    { key: "divider_1", name: "", type: "divider" },
    { key: "vegetablesHeader", name: "Vegetables", type: "header" },
    { key: "broccoli", name: "Broccoli" },
    { key: "carrot", name: "Carrot" },
    { key: "lettuce", name: "Lettuce" }
]
```

### Appendix

---



```vue
<fv-ListView v-model="items" ref="list"></fv-ListView>
let item = this.$refs.list.$refs['list_item_<index>]'];
```






- event
