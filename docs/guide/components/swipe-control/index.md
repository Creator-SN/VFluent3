---
page: true
title: SwipeControl
---


<!-- lang-switch -->
### SwipeControl-DEMO
---

<script>
export default {
    data () {
        return {
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
            ],
            leftOptions: [
                {
                    icon: 'QuietHours',
                    func: () => {},
                    type: 'tool',
                },
                {
                    icon: 'Info',
                    func: () => {},
                    type: 'info',
                }
            ],
            options: [
                {
                    icon: 'Pin',
                    func: () => {},
                    type: 'warning',
                },
                {
                    icon: 'Delete',
                    func: () => {},
                    type: 'delete',
                }
            ],
            listOptions: [
                {
                    icon: 'Pin',
                    func: () => {},
                    type: 'warning',
                },
                {
                    icon: 'Delete',
                    func: this.deleteItem,
                    type: 'delete',
                }
            ],
            disabledLeft: true
        }
    },
    methods: {
        deleteItem (item) {
            let index = this.items.findIndex(it => it.key === item.key);
            console.log(index, this.items[index].key, item.key);
            if(!item.disabled)
                this.items.splice(index, 1);
        }
    }
}
</script>

<fv-SwipeControl>
</fv-SwipeControl>

```vue
<fv-SwipeControl>
</fv-SwipeControl>
```

Slide Side

<div>
<fv-SwipeControl :disabledLeft="disabledLeft" :leftOptions="leftOptions" style="width: 80%; border: white solid thin;">
    <strong :style="{color: disabledLeft ? 'rgba(0, 98, 158, 1)' : 'rgba(248, 176, 75, 1)'}">{{disabledLeft ? 'Only Right Side' : 'Both Side'}}</strong>
</fv-SwipeControl>
</div>

```vue
<fv-SwipeControl :disabledLeft="disabledLeft" :leftOptions="leftOptions" style="width: 80%; border: white solid thin;">
    <strong :style="{color: disabledLeft ? 'rgba(0, 98, 158, 1)' : 'rgba(248, 176, 75, 1)'}">{{disabledLeft ? 'Only Right Side' : 'Both Side'}}</strong>
</fv-SwipeControl>
```

- leftOptions

```javascript
export default {
    data () {
        return {
            leftOptions: [
                {
                    icon: 'QuietHours',
                    func: () => {},
                    type: 'tool',
                },
                {
                    icon: 'Info',
                    func: () => {},
                    type: 'info',
                }
            ]
        }
    }
}
```

<fv-button :is-box-shadow="true" style="width: 200px; margin-top: 5px;" @click="disabledLeft ^= true">{{disabledLeft ? 'Only Right Side' : 'Both Side'}}</fv-button>

### SwipeControl-Customize Options
---

<fv-SwipeControl :leftOptions="leftOptions" :options="options" :disabledLeft="false" style="width: 100%; border: white solid thin;">
</fv-SwipeControl>

```vue
<fv-SwipeControl :leftOptions="leftOptions" :options="options" :disabledLeft="false" style="width: 100%; border: white solid thin;">
</fv-SwipeControl>
```

- options
- leftOptions

```javascript
export default {
    data () {
        return {
            options: [
                {
                    icon: 'Pin',
                    func: () => {},
                    type: 'warning',
                },
                {
                    icon: 'Delete',
                    func: () => {},
                    type: 'delete',
                }
            ],
            leftOptions: [
                {
                    icon: 'QuietHours',
                    func: () => {},
                    type: 'tool',
                },
                {
                    icon: 'Info',
                    func: () => {},
                    type: 'info',
                }
            ]
        }
    }
}
```

### SwipeControl-With ListView
---

<div style="width: 100%; height: 300px; padding: 15px;">
<fv-ListView v-model="items" itemPadding="0">
    <template v-slot:listItem="x">
        <fv-swipe-control v-if="x.item.type != 'header'" :value="x.item" :leftOptions="leftOptions" :options="listOptions" :disabledLeft="false" style="width: 100%; height: 100%;">
            {{x.item.name}}
        </fv-swipe-control>
        <p v-else style="padding-left: 10px;">{{x.item.name}}</p>
    </template>
</fv-ListView>
</div>

```vue
<fv-ListView v-model="items" itemPadding="0">
    <template v-slot:listItem="x">
        <fv-swipe-control v-if="x.item.type != 'header'" :value="x.item" :leftOptions="leftOptions" :options="listOptions" :disabledLeft="false" style="width: 100%; height: 100%;">
            {{x.item.name}}
        </fv-swipe-control>
        <p v-else style="padding-left: 10px;">{{x.item.name}}</p>
    </template>
</fv-ListView>
```

- items
- options
- leftOptions

```javascript
export default {
    data () {
        return {
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
            ],
            leftOptions: [
                {
                    icon: 'QuietHours',
                    func: () => {},
                    type: 'tool',
                },
                {
                    icon: 'Info',
                    func: () => {},
                    type: 'info',
                }
            ],
            listOptions: [
                {
                    icon: 'Pin',
                    func: () => {},
                    type: 'warning',
                },
                {
                    icon: 'Delete',
                    func: this.deleteItem,
                    type: 'delete',
                }
            ],
        }
    },
    methods: {
        deleteItem (item) {
            let index = this.items.findIndex(it => it.key === item.key);
            console.log(index, this.items[index].key, item.key);
            if(!item.disabled)
                this.items.splice(index, 1);
        }
    }
}
```


### SwipeControl-Disabled
---

<fv-SwipeControl :leftOptions="leftOptions" :options="options" :disabledLeft="false" disabled style="width: 100%; border: white solid thin;">
</fv-SwipeControl>

```vue
<fv-SwipeControl :leftOptions="leftOptions" :options="options" :disabledLeft="false" disabled style="width: 100%; border: white solid thin;">
</fv-SwipeControl>
```



### Properties
---
| Property          | Type    | Required | Default                                                | Description                                                              |
|:-----------------:|:-------:|:--------:|:------------------------------------------------------:|:------------------------------------------------------------------------:|
| value             | object  | No       | {}                                                     | See the SwipeControl `value` option.                                     |
| minOpWidth        | number  | No       | 60                                                     | See the SwipeControl `minOpWidth` option.                                |
| maxOpWidth        | number  | No       | 300                                                    | See the SwipeControl `maxOpWidth` option.                                |
| leftOptions       | array   | No       | []                                                     | See the SwipeControl `leftOptions` option.                               |
| options           | any     | No       | [ { icon: 'Delete', func: () => {}, type: 'delete' } ] | See the SwipeControl `options` option.                                   |
| itemPadding       | string  | No       | '0 10px'                                               | See the SwipeControl `itemPadding` option.                               |
| disabledLeft      | boolean | No       | true                                                   | See the SwipeControl `disabledLeft` option.                              |
| disabledRight     | boolean | No       | false                                                  | See the SwipeControl `disabledRight` option.                             |
| disabledLeftFull  | boolean | No       | true                                                   | See the SwipeControl `disabledLeftFull` option.                          |
| disabledRightFull | boolean | No       | false                                                  | See the SwipeControl `disabledRightFull` option.                         |
| disabled          | boolean | No       | false                                                  | See the SwipeControl `disabled` option.                                  |
| theme             | string  | No       | 'global'                                               | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang              | string  | No       | "global"                                               | See the SwipeControl `lang` option.                                      |

### Events
---
| Event         | Arguments | Description                               |
|:-------------:|:---------:|:-----------------------------------------:|
| status-change | String    | See the component `status-change` option. |

### Slots
---
1. Default



```vue
<template>
    <p></p>
</template>
```
  
### Data
---




```javascript
options = [{icon: '', text: '', type: '', disabled: ''}]

//e.g.//

options: [
    {
        icon: 'QuietHours',
        func: () => {},
        type: 'tool',
    },
    {
        icon: 'Info',
        func: () => {},
        type: 'info',
    }
]
```
