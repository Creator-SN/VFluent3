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



### 属性
---
| 属性              | 类型    | 必填  | 默认值                                                 | 说明                                                             |
|:-----------------:|:-------:|:-----:|:------------------------------------------------------:|:----------------------------------------------------------------:|
| value             | object  | 否    | {}                                                     | 当前绑定的项目，作为`options`中的`func`参数。                    |
| minOpWidth        | number  | 否    | 60                                                     | 操作按钮区域最小宽度。                                           |
| maxOpWidth        | number  | 否    | 300                                                    | 操作按钮区域最大宽度。                                           |
| leftOptions       | array   | 否    | []                                                     | 左侧操作按钮选项。                                               |
| options           | any     | 否    | [ { icon: 'Delete', func: () => {}, type: 'delete' } ] | 右侧操作按钮选项。                                               |
| itemPadding       | string  | 否    | '0 10px'                                               | 主体内容内边距。                                                 |
| disabledLeft      | boolean | 否    | true                                                   | 禁用左侧操作按钮。                                               |
| disabledRight     | boolean | 否    | false                                                  | 禁用右侧操作按钮。                                               |
| disabledLeftFull  | boolean | 否    | true                                                   | 禁用左滑到底。                                                   |
| disabledRightFull | boolean | 否    | false                                                  | 禁用右滑到底。                                                   |
| disabled          | boolean | 否    | false                                                  | 禁用。                                                           |
| theme             | string  | 否    | 'global'                                               | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang              | string  | 否    | "global"                                               | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名        | 参数   | 说明                                                                 |
|:-------------:|:------:|:--------------------------------------------------------------------:|
| status-change | String | 内部滑动状态，包含`normal`，`left`，`right`，`leftFull`，`rightFull` |

### 插槽
---
1. Default

自定义主体内容

```vue
<template>
    <p></p>
</template>
```
  
### Data
---
1. options 及 leftOptions

其中`type`包含`info`, `correct`, `warning`, `tool`, `delete`几种预设样式.

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
  
**其中** `icon`, `text`, `disabled`, `type`属性支持函数式声明.
