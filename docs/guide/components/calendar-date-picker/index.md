---
page: true
title: CalendarDatePicker
--- 
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

### Propoties

---
|       属性(attr)       |           类型(type)            | 必填(required) | 默认值(default) |                      说明(statement)                      |
| :--------------------: | :-----------------------------: | :------------: | :-------------: | :-------------------------------------------------------: |
|     value/v-model      |             [date]              |       No       |   CurrentDate   |                                                           |
|      borderWidth       |             Number              |       No       |        2        |              CalendarDatePicker border width              |
|      borderRadius      |             Number              |       No       |        3        |             CalendarDatePicker border radius              |
|      placeholder       |             String              |       No       |   Pick a day    |              CalendarDatePicker placeholder               |
|    inputForeground     |         [string(color)]         |       No       |       N/A       |                     输入框文字前景色                      |
|    inputBackground     |         [string(color)]         |       No       |       N/A       |                       输入框背景色                        |
|      dropDownIcon      |             String              |       No       |   CalendarDay   |                   Icon with Fabric-Icon                   |
|  dropDownRevealBorder  |             Boolean             |       No       |      true       |                                                           |
|  dropDownIsBoxShadow   |             Boolean             |       No       |      true       |                                                           |
|     dropDownStyles     |             Object              |       No       |       {}        |                                                           |
|        editable        |             Boolean             |       No       |       N/A       |                                                           |
|       background       |         [string(color)]         |       No       |       N/A       |                                                           |
|      borderRadius      |             Number              |       No       |       N/A       |                                                           |
|      nowDayColor       |         [string(color)]         |       No       |       N/A       |                                                           |
|   rangeChooseColorFE   |         [string(color)]         |       No       |       N/A       |                                                           |
| rangeChooseColorMiddle |         [string(color)]         |       No       |       N/A       |                                                           |
|        disabled        |             Boolean             |       No       |      false      |                                                           |
|        multiple        | ['single', 'multiple', 'range'] |       No       |     single      |           多选模式, 有单选、多选和范围日期选择            |
|          lan           |          ['en', 'zh']           |       No       |       en        |               CalendarDatePicker language.                |
|      choosenDates      |              Array              |       No       |       []        |                 CalendarView初始选中日期                  |
|       foreground       |         [string(color)]         |       No       |       N/A       |                  CalendarView主题前景色                   |
|         theme          |             String              |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events

---
|   事件名(Name)    | 参数类型(args) |          说明(statement)          |
| :---------------: | :------------: | :-------------------------------: |
|   choosen-dates   |     array      | 返回[{year, month, no}]类型的数组 |
| choosen-dates-obj |     array      |       返回[Date]类型的数组        |

### Slot
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