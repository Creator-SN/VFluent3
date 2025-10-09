---
page: true
title: CalendarView
--- 

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

### Propoties

---

|       属性(attr)       |          类型(type)           | 必填(required) | 默认值(default) |                      说明(statement)                      |
| :--------------------: | :---------------------------: | :------------: | :-------------: | :-------------------------------------------------------: |
|         value          |            [date]             |       No       |   CurrentDate   |                                                           |
|        multiple        | ['single','multiple','range'] |       No       |     single      |                                                           |
|      choosenDates      |             Array             |       No       |       []        |                 CalendarView初始选中日期                  |
|       foreground       |        [string(color)]        |       No       |       N/A       |                  CalendarView主题前景色                   |
|       background       |        [string(color)]        |       No       |       N/A       |                    CalendarView 背景色                    |
|      nowDayColor       |        [string(color)]        |       No       |       N/A       |                         今日颜色                          |
|   rangeChooseColorFE   |        [string(color)]        |       No       |       N/A       |                 起始日开头结尾按钮背景色                  |
| rangeChooseColorMiddle |        [string(color)]        |       No       |       N/A       |                 起始日中间日期按钮背景色                  |
|         theme          |            String             |       No       |     system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |

### Events

---

|    事件名(Name)     | 参数类型(args) |                   说明(statement)                   |
| :-----------------: | :------------: | :-------------------------------------------------: |
|     choose-year     |     string     |                 选择年份后返回年份                  |
|    choose-month     |     string     |                 选择月份后返回月份                  |
| update:choosenDates |     array      |                双向绑定choosenDates                 |
|     choose-date     |      date      |                 选择日期后返回日期                  |
|    choosen-dates    |     array      | 选择多个日期后返回日期数组, 类型为[{year,month,no}] |
|  choosen-dates-obj  |     array      |                返回[Date]类型的数组                 |

### Slot
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
