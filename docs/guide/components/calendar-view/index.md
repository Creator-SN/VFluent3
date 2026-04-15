---
page: true
title: CalendarView
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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

### Properties

---

| Property               | Type     | Required | Default                                                                                                                      | Description                                                              |
|:----------------------:|:--------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------:|
| modelValue             | function | No       | () => new Date()                                                                                                             |                                                                          |
| multiple               | string   | No       | 'single'                                                                                                                     |                                                                          |
| choosenDates           | array    | No       | []                                                                                                                           | CalendarViewInitial selected date.                                       |
| foreground             | string   | No       | ''                                                                                                                           | See the CalendarView `foreground` option.                                |
| background             | string   | No       | ''                                                                                                                           | See the CalendarView `background` option.                                |
| nowDayColor            | string   | No       | ''                                                                                                                           | Color for today.                                                         |
| rangeChooseColorFE     | string   | No       | ''                                                                                                                           | See the CalendarView `rangeChooseColorFE` option.                        |
| rangeChooseColorMiddle | string   | No       | ''                                                                                                                           | See the CalendarView `rangeChooseColorMiddle` option.                    |
| theme                  | string   | No       | 'global'                                                                                                                     | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| start                  | number   | No       | 1900                                                                                                                         | See the CalendarView `start` option.                                     |
| weekdays               | array    | No       | ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']                                                                                   | See the CalendarView `weekdays` option.                                  |
| monthList              | array    | No       | [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] | See the CalendarView `monthList` option.                                 |
| borderRadius           | string   | No       | ''                                                                                                                           | See the CalendarView `borderRadius` option.                              |
| disabled               | boolean  | No       | false                                                                                                                        | See the CalendarView `disabled` option.                                  |
| lang                   | string   | No       | "global"                                                                                                                     | See the CalendarView `lang` option.                                      |

### Events

---

| Event               | Arguments | Description                                     |
|:-------------------:|:---------:|:-----------------------------------------------:|
| choose-year         | string    | See the component `choose-year` option.         |
| choose-month        | string    | See the component `choose-month` option.        |
| update:choosenDates | array     | See the component `update:choosenDates` option. |
| choose-date         | date      | See the component `choose-date` option.         |
| choosen-dates       | array     | See the component `choosen-dates` option.       |
| choosen-dates-obj   | array     | Returns an array of `Date` values.              |

### Slots
---
1. Statement





```vue
<template v-slot:statement="x">
    <p></p>
</template>
```

2. Weekday Content




```vue
<template v-slot:weekday_content>
    <p></p>
</template>
```
