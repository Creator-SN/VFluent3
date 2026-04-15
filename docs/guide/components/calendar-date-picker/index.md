---
page: true
title: CalendarDatePicker
--- 

<!-- lang-switch -->
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

### Properties

---
| Property               | Type         | Required | Default       | Description                                                              |
|:----------------------:|:------------:|:--------:|:-------------:|:------------------------------------------------------------------------:|
| modelValue             | array        | No       | []            |                                                                          |
| borderWidth            | number       | No       | 1             | CalendarDatePicker border width                                          |
| borderRadius           | string       | No       | ''            | CalendarDatePicker border radius                                         |
| placeholder            | string       | No       | 'Pick a day'  | CalendarDatePicker placeholder                                           |
| inputForeground        | string       | No       | ''            | See the CalendarDatePicker `inputForeground` option.                     |
| inputBackground        | string       | No       | ''            | See the CalendarDatePicker `inputBackground` option.                     |
| dropDownIcon           | string       | No       | 'CalendarDay' | Icon with Fabric-Icon                                                    |
| dropDownRevealBorder   | boolean      | No       | true          |                                                                          |
| dropDownIsBoxShadow    | boolean      | No       | true          |                                                                          |
| dropDownStyles         | object       | No       | {}            |                                                                          |
| editable               | boolean      | No       | false         |                                                                          |
| background             | string       | No       | ''            |                                                                          |
| borderRadius           | string       | No       | ''            |                                                                          |
| nowDayColor            | string       | No       | ''            |                                                                          |
| rangeChooseColorFE     | string       | No       | ''            |                                                                          |
| rangeChooseColorMiddle | string       | No       | ''            |                                                                          |
| disabled               | boolean      | No       | false         |                                                                          |
| multiple               | string       | No       | 'single'      | Selection mode: single date, multiple dates, or date range.              |
| lan                    | ['en', 'zh'] | No       | en            | CalendarDatePicker language.                                             |
| choosenDates           | array        | No       | []            | CalendarViewInitial selected date.                                       |
| foreground             | string       | No       | ''            | See the CalendarDatePicker `foreground` option.                          |
| theme                  | string       | No       | 'global'      | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| dropDownBorderRadius   | number       | No       | 6             | See the CalendarDatePicker `dropDownBorderRadius` option.                |
| dropDownIconForeground | string       | No       | ''            | See the CalendarDatePicker `dropDownIconForeground` option.              |
| lang                   | string       | No       | "global"      | See the CalendarDatePicker `lang` option.                                |

### Events

---
| Event             | Arguments | Description                                          |
|:-----------------:|:---------:|:----------------------------------------------------:|
| choosen-dates     | array     | Returns an array in the shape `{ year, month, no }`. |
| choosen-dates-obj | array     | Returns an array of `Date` values.                   |

### Slots
---
1. Default





```vue
<template v-slot:default="x">
    <p></p>
</template>
```

2. Statement





```vue
<template v-slot:statement="x">
    <p></p>
</template>
```

3. Weekday Content




```vue
<template v-slot:weekday_content>
    <p></p>
</template>
```
