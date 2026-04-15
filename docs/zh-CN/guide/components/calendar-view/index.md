---
page: true
title: CalendarView
--- 


<!-- lang-switch -->
### CalendarView-DEMO
---

<script>
export default {
    data () {
        return {
            value: new Date(),
            resetValue: new Date(),
            currentChoosen: []
        }
    },
    mounted () {
        this.value.setFullYear(2019);
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        for (let i = 0; i < 10; i++) {
            this.currentChoosen.push(new Date(
                year,
                month,
                day + i
            ));
        }
    },
    methods: {
        reset () {
            this.resetValue = new Date(this.resetValue);
        }
    }
}
</script>

<ClientOnly>
<fv-CalendarView>
</fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView></fv-CalendarView>
```

### CalendarView Multiple Choose

---

<ClientOnly>
<fv-CalendarView :modelValue="resetValue" multiple="multiple" ref="c1"></fv-CalendarView>
<fv-button style="margin-top: 10px;" @click="reset">Reset</fv-button>
</ClientOnly>

```vue
<fv-CalendarView :modelValue="resetValue" multiple="multiple"></fv-CalendarView>
```

```javascript
reset () {
    this.resetValue = new Date(this.resetValue);
}
```

### CalendarView Specific Day

---

<ClientOnly>
<fv-CalendarView :modelValue="value" multiple="multiple"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView :modelValue="value" multiple="multiple"></fv-CalendarView>
```

### CalendarView Range Choose

---

<ClientOnly>
<fv-CalendarView multiple="range" :choosenDates="currentChoosen"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="range"></fv-CalendarView>
```

```javascript
export default {
    data () {
        return {
            currentChoosen: []
        }
    },
    mounted () {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        for (let i = 0; i < 10; i++) {
            this.currentChoosen.push(new Date(
                year,
                month,
                day + i
            ));
        }
    }
}
```

### CalendarView Dark Theme

---

<ClientOnly>
<fv-CalendarView theme="dark"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark"></fv-CalendarView>
```

### CalendarView Custom Theme

---

Custom Selected Color

<ClientOnly>
<fv-CalendarView theme="dark" background="rgba(30, 19, 57, 1)" foreground="rgba(0, 204, 153, 1)" nowDayColor="rgba(0, 180, 153, 1)" rangeChooseColorFE="rgba(0, 220, 153, 0.9)" rangeChooseColorMiddle="rgba(0, 220, 153, 0.6)" borderRadius="50" multiple="range"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark" background="rgba(30, 19, 57, 1)" foreground="rgba(0, 204, 153, 1)" nowDayColor="rgba(0, 180, 153, 1)" rangeChooseColorFE="rgba(0, 220, 153, 0.9)" rangeChooseColorMiddle="rgba(0, 220, 153, 0.6)" borderRadius="50" multiple="range"></fv-CalendarView>
```

### 属性

---

| 属性                   | 类型     | 必填  | 默认值                                                                                                                       | 说明                                                             |
|:----------------------:|:--------:|:-----:|:----------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------:|
| modelValue             | function | 否    | () => new Date()                                                                                                             |                                                                  |
| multiple               | string   | 否    | 'single'                                                                                                                     |                                                                  |
| choosenDates           | array    | 否    | []                                                                                                                           | CalendarView初始选中日期。                                       |
| foreground             | string   | 否    | ''                                                                                                                           | CalendarView主题前景色。                                         |
| background             | string   | 否    | ''                                                                                                                           | CalendarView 背景色。                                            |
| nowDayColor            | string   | 否    | ''                                                                                                                           | 今日颜色。                                                       |
| rangeChooseColorFE     | string   | 否    | ''                                                                                                                           | 起始日开头结尾按钮背景色。                                       |
| rangeChooseColorMiddle | string   | 否    | ''                                                                                                                           | 起始日中间日期按钮背景色。                                       |
| theme                  | string   | 否    | 'global'                                                                                                                     | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| start                  | number   | 否    | 1900                                                                                                                         | 参见组件的 `start` 选项。                                        |
| weekdays               | array    | 否    | ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']                                                                                   | 参见组件的 `weekdays` 选项。                                     |
| monthList              | array    | 否    | [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] | 参见组件的 `monthList` 选项。                                    |
| borderRadius           | string   | 否    | ''                                                                                                                           | 参见组件的 `borderRadius` 选项。                                 |
| disabled               | boolean  | 否    | false                                                                                                                        | 参见组件的 `disabled` 选项。                                     |
| lang                   | string   | 否    | "global"                                                                                                                     | 参见组件的 `lang` 选项。                                         |

### 事件

---

| 事件名              | 参数   | 说明                                                |
|:-------------------:|:------:|:---------------------------------------------------:|
| choose-year         | string | 选择年份后返回年份。                                |
| choose-month        | string | 选择月份后返回月份。                                |
| update:choosenDates | array  | 双向绑定choosenDates                                |
| choose-date         | date   | 选择日期后返回日期。                                |
| choosen-dates       | array  | 选择多个日期后返回日期数组，类型为[{year,month,no}] |
| choosen-dates-obj   | array  | 返回[Date]类型的数组。                              |

### 插槽
---
1. Statement

`CalendarView`的显式栏描述内容
- value: 原文描述内容
- dayRange: 当前日期数据对象

```vue
<template v-slot:statement="x">
    <p></p>
</template>
```

2. Weekday Content

日期上方星期栏描述内容
- value: 默认星期描述内容

```vue
<template v-slot:weekday_content>
    <p></p>
</template>
```
