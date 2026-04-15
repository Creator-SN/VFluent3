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

### 属性
---
| 属性               | 类型    | 必填  | 默认值                         | 说明                                                             |
|:------------------:|:-------:|:-----:|:------------------------------:|:----------------------------------------------------------------:|
| modelValue         | object  | 否    | () => { return null; }         | 当前选中项值。                                                   |
| items              | array   | 否    | [{ name: 'Pivot', width: 80 }] | 选项卡数据。                                                     |
| tab                | boolean | 否    | false                          | 是否开启tab样式。                                                |
| padding            | string  | 否    | ''                             | 内边距。                                                         |
| itemPadding        | string  | 否    | ''                             | 选项卡内边距。                                                   |
| fontSize           | string  | 否    | ''                             | 默认字体大小。                                                   |
| foreground         | string  | 否    | ''                             | 前景色。                                                         |
| choosenForeground  | string  | 否    | ''                             | 选中项前景色。                                                   |
| sliderBackground   | string  | 否    | ''                             | 滑块背景色。                                                     |
| sliderBoxshadow    | boolean | 否    | false                          | 是否开启滑块阴影。                                               |
| sliderBorderRadius | string  | 否    | '3'                            | 滑块圆角。                                                       |
| background         | string  | 否    | ''                             | 背景色。                                                         |
| borderRadius       | string  | 否    | ''                             | 边框圆角。                                                       |
| theme              | string  | 否    | 'global'                       | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled           | boolean | 否    | false                          | 参见组件的 `disabled` 选项。                                     |
| lang               | string  | 否    | "global"                       | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数   | 说明                          |
|:------:|:------:|:-----------------------------:|
| input  | value  | 当选中项发生改变时，返回value |
| change | object | 当选中项发生改变时，返回value |

### 插槽
---
1. Container

自定义项目内的内容, 包含以下属性:
- item: 当前项目数据
- index: 当前项目索引
- equal: 当前项目是否为选中项, 是一个`function`, 参数为当前项目数据, 返回值为`boolean`
- valueTrigger: 选中项触发函数, 是一个`function`

```javascript
<template v-slot:container="x">
</template>
```

### Data
---
1. items

Pivot只针对对象的`key`和`name`进行匹配, 当`value`传入的这两个属性能够在`options`中匹配时, 选中项即为被匹配项.

```javascript
items = [{ key: 0, name: "Pivot", width: 80, show: true, disabled: false }]

//e.g.//

items: [{ key: 0, name: "Pivot", width: 80 }]
```
**特别地** 1.0.3版本后支持采用函数式字段, 其中支持的字段包括`name`, `disabled`, `show`, `width`
1.1.0版本后`width`支持数值和CSS字符串赋值
