---
page: true
title: CalendarDatePicker
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### CalendarDatePicker-DEMO
---

<script>
export default {

    data () {
        return {
            value: [new Date()]
        }
    }

}
</script>

<div>

<ClientOnly>
<fv-CalendarDatePicker v-model="value"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Multiple

---

<div>
<ClientOnly>
<fv-CalendarDatePicker v-model="value" multiple="range"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Editable

---

<div>
<ClientOnly>
<fv-CalendarDatePicker v-model="value" multiple="range" editable="true"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" editable="true"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Disabled

---

<div style="z-index: 2">
<ClientOnly>
<fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
</ClientOnly>
</div>

```vue
<fv-CalendarDatePicker v-model="value" multiple="range" disabled style="z-index: 2"></fv-CalendarDatePicker>
```

### CalendarDatePicker-Dark Theme

---

<div style="z-index: 1">
<ClientOnly>
<fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
</ClientOnly>

</div>

```vue
<fv-CalendarDatePicker v-model="value" theme="dark" style="z-index: 2"></fv-CalendarDatePicker>
```

### 属性

---
| 属性                   | 类型         | 必填  | 默认值        | 说明                                                             |
|:----------------------:|:------------:|:-----:|:-------------:|:----------------------------------------------------------------:|
| modelValue             | array        | 否    | []            |                                                                  |
| borderWidth            | number       | 否    | 1             | CalendarDatePicker border width                                  |
| borderRadius           | string       | 否    | ''            | CalendarDatePicker border radius                                 |
| placeholder            | string       | 否    | 'Pick a day'  | CalendarDatePicker placeholder                                   |
| inputForeground        | string       | 否    | ''            | 输入框文字前景色。                                               |
| inputBackground        | string       | 否    | ''            | 输入框背景色。                                                   |
| dropDownIcon           | string       | 否    | 'CalendarDay' | Icon with Fabric-Icon                                            |
| dropDownRevealBorder   | boolean      | 否    | true          |                                                                  |
| dropDownIsBoxShadow    | boolean      | 否    | true          |                                                                  |
| dropDownStyles         | object       | 否    | {}            |                                                                  |
| editable               | boolean      | 否    | false         |                                                                  |
| background             | string       | 否    | ''            |                                                                  |
| borderRadius           | string       | 否    | ''            |                                                                  |
| nowDayColor            | string       | 否    | ''            |                                                                  |
| rangeChooseColorFE     | string       | 否    | ''            |                                                                  |
| rangeChooseColorMiddle | string       | 否    | ''            |                                                                  |
| disabled               | boolean      | 否    | false         |                                                                  |
| multiple               | string       | 否    | 'single'      | 多选模式，有单选、多选和范围日期选择。                           |
| lan                    | ['en', 'zh'] | No    | en            | CalendarDatePicker language.                                     |
| choosenDates           | array        | 否    | []            | CalendarView初始选中日期。                                       |
| foreground             | string       | 否    | ''            | CalendarView主题前景色。                                         |
| theme                  | string       | 否    | 'global'      | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| dropDownBorderRadius   | number       | 否    | 6             | 参见组件的 `dropDownBorderRadius` 选项。                         |
| dropDownIconForeground | string       | 否    | ''            | 参见组件的 `dropDownIconForeground` 选项。                       |
| lang                   | string       | 否    | "global"      | 参见组件的 `lang` 选项。                                         |

### 事件

---
| 事件名            | 参数  | 说明                                |
|:-----------------:|:-----:|:-----------------------------------:|
| choosen-dates     | array | 返回[{year，month，no}]类型的数组。 |
| choosen-dates-obj | array | 返回[Date]类型的数组。              |

### 插槽
---
1. Default
`Dropdown`文本框自定义
- displayContent: 默认显示内容
- showCalendar: 触发显示CalendarView
- disabled: 是否禁止

```vue
<template v-slot:default="x">
    <p></p>
</template>
```

2. Statement

`CalendarView`的显式栏描述内容
- value: 原文描述内容
- dayRange: 当前日期数据对象

```vue
<template v-slot:statement="x">
    <p></p>
</template>
```

3. Weekday Content

日期上方星期栏描述内容
- value: 默认星期描述内容

```vue
<template v-slot:weekday_content>
    <p></p>
</template>
```
