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

### 属性

---
| 属性        | 类型    | 必填  | 默认值                | 说明                                                             |
|:-----------:|:-------:|:-----:|:---------------------:|:----------------------------------------------------------------:|
| modelValue  | string  | 否    | ''                    | Checkbox value                                                   |
| foreground  | string  | 否    | ''                    | Checkbox foreground                                              |
| borderColor | string  | 否    | ''                    | Checkbox borderColor                                             |
| background  | string  | 否    | 'rgba(0, 90, 158, 1)' | Checkbox background                                              |
| boxSide     | string  | 否    | 'start'               | CheckBox text font weight                                        |
| disabled    | boolean | 否    | false                 | Disabled checkbox                                                |
| borderWidth | number  | 否    | 1.5                   | Checkbox border width                                            |
| theme       | string  | 否    | 'global'              | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang        | string  | 否    | "global"              | 参见组件的 `lang` 选项。                                         |

### 事件

---
| 事件名 | 参数  | 说明             |
|:------:|:-----:|:----------------:|
| click  | value | Checkbox onclick |
