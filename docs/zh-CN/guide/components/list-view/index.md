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



### 属性
---
| 属性                  | 类型    | 必填  | 默认值   | 说明                                                                       |
|:---------------------:|:-------:|:-----:|:--------:|:--------------------------------------------------------------------------:|
| modelValue            | array   | 否    | []       | ListView数据绑定。                                                         |
| choosen               | array   | 否    | []       | 外部设置ListView选中项。                                                   |
| multiple              | boolean | 否    | false    | 是否开启多选。                                                             |
| rowHeight             | string  | 否    | ''       | 每一项高度。                                                               |
| headerForeground      | string  | 否    | ''       | 标题前景色。                                                               |
| choosenBackground     | string  | 否    | ''       | 选中项背景色。                                                             |
| itemPadding           | string  | 否    | ''       | 每一项的`padding`值。                                                      |
| itemBorderRadius      | number  | 否    | 3        | 每一项的边框圆角。                                                         |
| revealBorderColor     | boolean | 否    | false    | Reveal边框颜色。                                                           |
| revealBackgroundColor | boolean | 否    | false    | Reveal背景颜色。                                                           |
| showSlider            | boolean | 否    | false    | 是否显示选中项滑动条。                                                     |
| sliderTarget          | object  | 否    | () => {} | 修改滑动条绑定元素，可通过`sync`方法同步，注意元素需要存在于`ListView`中。 |
| sliderIndex           | number  | 否    | -1       | 修改滑动条绑定元素索引，可通过`sync`方法同步。                             |
| theme                 | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。           |
| disabled              | boolean | 否    | false    | 参见组件的 `disabled` 选项。                                               |
| lang                  | string  | 否    | "global" | 参见组件的 `lang` 选项。                                                   |

### 事件
---
| 事件名           | 参数           | 说明                           |
|:----------------:|:--------------:|:------------------------------:|
| item-click       | object         | 选中项点击后返回选项。         |
| chooseItem       | object         | 选中项点击后返回选项。         |
| choosen-items    | array          | 选中项点击后返回所有被选中项。 |
| selection-change | object         | 光标选择某一项后返回选中项。   |
| item-drag-over   | \{root, drop\} | 当前项被放置进入。             |
| item-drag-leave  | \{root, drop\} | 当前项被放置离开。             |
| item-drop        | \{root, drop\} | 当前项被放置。                 |

### 插槽
---
1. ListItem

默认以value中每一项的属性name作为默认显示, 包含以下可选属性
- item: 当前项
- index: 当前项索引
- valueTrigger: 计算函数式定义的字段, 例如`item.name: () => '@' + item.name`

```vue
<template v-slot:listItem="x">
    <p>{{ valueTrigger(item.name) }}</p>
</template>
```

2. Header

ListView前置内容

```vue
<template v-slot:header>
    <p></p>
</template>
```

3. Footer

ListView后置内容

```vue
<template v-slot:footer>
    <p></p>
</template>
```

### Data
---
1. items

其中`key`字段建议开发者在有重复名称和类型字段时声明用来区别项目

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

1. 获取`ListView`中第`index`项`item`的`dom`方法(其中`<index>`代表`items`索引):

```vue
<fv-ListView v-model="items" ref="list"></fv-ListView>
let item = this.$refs.list.$refs['list_item_<index>]'];
```

**特别地** 0.1.32版本后支持采用函数式字段, 其中支持的字段包括`name`, `disabled`, `choosen`, `type`
0.1.54版本后支持`show`

2. 需要模拟键盘上下移动可以执行`move`方法

- event
- direction: 移动方向, 可选值`1`, `-1`
