---
page: true
title: TextField
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### TextField-DEMO
--- 

<script>
export default {
    data () {
        return {
            readOnlyText: "I am read-only."
        }
    }
}
</script>



<ClientOnly>
<fv-TextField>
</fv-TextField>
</ClientOnly>

```vue
<fv-TextField>
</fv-TextField>
```

Read-only


<ClientOnly>
<fv-TextField v-model="readOnlyText" readonly></fv-TextField>
</ClientOnly>

```vue
<fv-TextField v-model="readOnlyText" readonly></fv-TextField>
```

With placeholder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here."></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here."></fv-TextField>
```

### TextField-Disabled
---
1. Standard


<ClientOnly>
<fv-TextField disabled></fv-TextField>
</ClientOnly>

```vue
<fv-TextField disabled></fv-TextField>
```

2. With placeholder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." disabled></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." disabled></fv-TextField>
```

3. With underline


<ClientOnly>
<fv-TextField underline disabled></fv-TextField>
</ClientOnly>

```vue
<fv-TextField underline disabled></fv-TextField>
```

### TextField-With Limit
---

<ClientOnly>
<fv-TextField maxlength="5" style="width: 120px;"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField maxlength="5" style="width: 120px;"></fv-TextField>
```

### TextField-With Underline And Borderless
---

<ClientOnly>
<fv-TextField underline focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField underline focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextField>
```

### TextField-With Status
---
Warn


<ClientOnly>
<fv-TextField placeholder="Warn text." status="warn"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Warn text." status="warn"></fv-TextField>
```

Correct


<ClientOnly>
<fv-TextField placeholder="Correct text." status="correct"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Correct text." status="correct"></fv-TextField>
```

### TextField-RevealBorder


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextField>
```

### TextField-Customize
---
Customize border color


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextField>
```

Customize background


<ClientOnly>
<fv-TextField placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextField>
</ClientOnly>

```vue
<fv-TextField placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextField>
```

### TextField-Dark Theme
---
<div style="padding: 15px; background: black;">
<ClientOnly>
    <fv-TextField placeholder="Please enter the text here." theme="dark"></fv-TextField>
    <fv-TextField placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextField>
    <fv-TextField underline theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextField>
    <fv-TextField underline disabled theme="dark"></fv-TextField>
</ClientOnly>
</div>

```vue
<fv-TextField placeholder="Please enter the text here." theme="dark"></fv-TextField>
<fv-TextField placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextField>
<fv-TextField underline theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextField>
<fv-TextField underline disabled theme="dark"></fv-TextField>
```



### 属性
---
| 属性                  | 类型    | 必填  | 默认值   | 说明                                                             |
|:---------------------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| modelValue            | string  | 否    | ''       | Using v-model binding input value                                |
| placeholder           | string  | 否    | ''       | 等同于原生 HTML input 属性。                                     |
| readonly              | boolean | 否    | false    | 等同于原生 HTML input 属性。                                     |
| maxlength             | string  | 否    | ''       | 等同于原生 HTML input 属性。                                     |
| underline             | boolean | 否    | false    | 是否开启Underline风格的TextField                                 |
| background            | string  | 否    | ''       |                                                                  |
| borderWidth           | number  | 否    | 1        |                                                                  |
| borderColor           | string  | 否    | ''       |                                                                  |
| focusBorderColor      | string  | 否    | ''       |                                                                  |
| fontSize              | number  | 否    | 13.8     |                                                                  |
| fontWeight            | string  | 否    | 'normal' | normal                                                           |
| foreground            | string  | 否    | ''       |                                                                  |
| textAlign             | string  | 否    | 'left'   |                                                                  |
| borderRadius          | number  | 否    | 3        | TextField圆角大小，启用revealBorder时将失效。                    |
| isBoxShadow           | boolean | 否    | false    | 开启`TextField`阴影。                                            |
| revealBorder          | boolean | 否    | false    |                                                                  |
| revealBorderColor     | boolean | 否    | false    |                                                                  |
| revealBackgroundColor | boolean | 否    | false    |                                                                  |
| status                | string  | 否    | ''       | 状态边框预设，默认有警告和正确两种。                             |
| disabled              | boolean | 否    | false    |                                                                  |
| theme                 | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang                  | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名  | 参数  | 说明  |
|:-------:|:-----:|:-----:|
| keydown | event |       |
| keyup   | event |       |
| change  | event |       |
| paste   | event |       |
