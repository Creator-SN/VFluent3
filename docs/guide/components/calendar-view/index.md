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
            value: new Date()
        }
    },
    mounted () {
        this.value.setFullYear(2019);
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
<fv-CalendarView multiple="multiple" lang="global"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="multiple" lang="global"></fv-CalendarView>
```

### CalendarView Init Day

---

<ClientOnly>
<fv-CalendarView :value="value" multiple="multiple" lang="global"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView :value="value" multiple="multiple" lang="global"></fv-CalendarView>
```

### CalendarView Range Choose

---

<ClientOnly>
<fv-CalendarView multiple="range"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView multiple="range"></fv-CalendarView>
```

### CalendarView Dark Theme

---

<ClientOnly>
<fv-CalendarView theme="dark"></fv-CalendarView>
</ClientOnly>

```vue
<fv-CalendarView theme="dark"></fv-CalendarView>
```

### Propoties

---

| 属性(attr) |             类型(type)             | 必填(required) | 默认值(default) |    说明(statement)     |
|:----------:|:----------------------------------:|:--------------:|:---------------:|:----------------------:|
|   value    |               [date]               |       No       |   CurrentDate   |                        |
|   start    |              Number              |       No       |      1900       |      Minium Year.      |
|    end     |              Number              |       No       |      3000       |      Maxium Year.      |
|  multiple  |   ['single','multiple','range']    |       No       |     single      |                        |
|    lang     |            ['en','zh','global']             |       No       |       global        | CalendarView language. |
|     theme     | String |       No       |     system      |       主题样式, 包含`light`, `dark`, `system`, `custom`几种样式              |

### Events

---

| 事件名(Name)  | 参数类型(args) |                   说明(statement)                   |
|:-------------:|:--------------:|:---------------------------------------------------:|
|  choose-year  |     number     |                 选择年份后返回年份                  |
| choose-month  |     date     |                 选择月份后返回月份                  |
|  choose-date  |      date      |                 选择日期后返回日期                  |
| choosen-dates |     array      | 选择多个日期后返回日期数组, 类型为[{year,month,no}] |
