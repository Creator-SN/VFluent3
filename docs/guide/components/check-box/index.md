---
page: true
title: CheckBox
---


<!-- lang-switch -->
### CheckBox-DEMO
--- 

<script>
export default {
    data () {
        return {
            value: true
        }
    }
}
</script>


<ClientOnly>
<fv-checkBox>Indeterminate checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox>Indeterminate checkbox</fv-checkBox>
```

### CheckBox-Disabled

---

<ClientOnly>
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox disabled>Disabled checkbox</fv-checkBox>
```

### CheckBox-Disabled

---

<ClientOnly>
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox boxSide="end">Checkbox rendered with boxSide "end"</fv-checkBox>
```

### CheckBox-Custom

---
1. Set border width.

<ClientOnly>
<fv-checkBox v-model="value" :borderWidth="2">Checkbox rendered with borderWidth "2"</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox v-model="value" :borderWidth="2">Checkbox rendered with borderWidth "2"</fv-checkBox>
```

2. Set background and border color.

<ClientOnly>
<fv-checkBox v-model="value" borderColor="rgba(0, 204, 153, 1)" foreground="rgba(0, 204, 153, 1)" background="rgba(0, 204, 153, 1)">Checkbox</fv-checkBox>
</ClientOnly>

```vue
<fv-checkBox v-model="value" borderColor="rgba(0,204,153,1)" foreground="rgba(0,204,153,1)" background="rgba(0,204,153,1)">Checkbox</fv-checkBox>
```

### Properties

---
| Property    | Type    | Required | Default               | Description                                                              |
|:-----------:|:-------:|:--------:|:---------------------:|:------------------------------------------------------------------------:|
| modelValue  | string  | No       | ''                    | Checkbox value                                                           |
| foreground  | string  | No       | ''                    | Checkbox foreground                                                      |
| borderColor | string  | No       | ''                    | Checkbox borderColor                                                     |
| background  | string  | No       | 'rgba(0, 90, 158, 1)' | Checkbox background                                                      |
| boxSide     | string  | No       | 'start'               | CheckBox text font weight                                                |
| disabled    | boolean | No       | false                 | Disabled checkbox                                                        |
| borderWidth | number  | No       | 1.5                   | Checkbox border width                                                    |
| theme       | string  | No       | 'global'              | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang        | string  | No       | "global"              | See the CheckBox `lang` option.                                          |

### Events

---
| Event | Arguments | Description      |
|:-----:|:---------:|:----------------:|
| click | value     | Checkbox onclick |
