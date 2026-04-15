---
page: true
title: TextBox
---


<!-- lang-switch -->
### TextBox-DEMO
---

<script>
export default {
    data () {
        return {
            readOnlyText: "I am read-only.",
            maskValue: ""
        }
    }
}
</script>

Standard

<ClientOnly>
<fv-TextBox></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox></fv-TextBox>
```

Read-only

<ClientOnly>
<fv-TextBox v-model="readOnlyText" readonly></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox v-model="readOnlyText" readonly></fv-TextBox>
```

With placeholder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here."></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here."></fv-TextBox>
```

With an icon

<ClientOnly>
<fv-TextBox icon="Search"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox icon="Search"></fv-TextBox>
```

With type

<ClientOnly>
<fv-TextBox icon="RevealPasswordMedium" type="password"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox icon="RevealPasswordMedium" type="password"></fv-TextBox>
```

With pattern

<ClientOnly>
<fv-TextBox pattern="[a-zA-Z]"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox pattern="[a-zA-Z]"></fv-TextBox>
```

### TextBox-With Input Mask
---
Standard

<ClientOnly>
<fv-TextBox mode="mask"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox mode="mask"></fv-TextBox>
```

Customize

<ClientOnly>
<fv-TextBox v-model="maskValue" mode="mask" mask="Tel: +__ ___ - ____ - ____" flag="_"></fv-TextBox>
</ClientOnly>
<p>{{maskValue}}</p>

```vue
<fv-TextBox v-model="maskValue" mode="mask" mask="Tel: +__ ___ - ____ - ____" flag="_"></fv-TextBox>
<p>{{maskValue}}</p>
```

Customize Flag

<ClientOnly>
<fv-TextBox v-model="maskValue" mode="mask" mask="mask: xx-xxx-xxxx-xxxx" flag="x"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox v-model="maskValue" mode="mask" mask="mask: xx-xxx-xxxx-xxxx" flag="x"></fv-TextBox>
```

### TextBox-Disabled
---
1. Standard

<ClientOnly>
<fv-TextBox disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox disabled></fv-TextBox>
```

2. With Input Mask

<ClientOnly>
<fv-TextBox mode="mask" disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox mode="mask" disabled></fv-TextBox>
```

3. With placeholder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." disabled></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." disabled></fv-TextBox>
```

4. With underline

<ClientOnly>
<fv-TextBox underline disabled prefix="Disabled:"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox underline disabled prefix="Disabled:"></fv-TextBox>
```

### TextBox-With Limit
---

<ClientOnly>
<fv-TextBox maxlength="5" style="width: 120px;"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox maxlength="5" style="width: 120px;"></fv-TextBox>
```

### TextBox-With Underline And Borderless
---

<ClientOnly>
<fv-TextBox underline prefix="Standard:" focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox underline prefix="Standard:" focusBorderColor="rgba(0, 90, 158, 1)"></fv-TextBox>
```

### TextBox-With Prefix/Suffix
---
Prefix

<ClientOnly>
<fv-TextBox prefix="https://"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox prefix="https://"></fv-TextBox>
```

Suffix

<ClientOnly>
<fv-TextBox suffix=".com"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox suffix=".com"></fv-TextBox>
```

Prefix and Suffix

<ClientOnly>
<fv-TextBox prefix="https://" suffix=".com"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox prefix="https://" suffix=".com"></fv-TextBox>
```

### TextBox-With Status
---
Warn

<ClientOnly>
<fv-TextBox placeholder="Warn text." status="warn"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Warn text." status="warn"></fv-TextBox>
```

Correct

<ClientOnly>
<fv-TextBox placeholder="Correct text." status="correct"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Correct text." status="correct"></fv-TextBox>
```

### TextBox-RevealBorder

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-TextBox>
```

### TextBox-Customize
---
Customize border color

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-TextBox>
```

Customize background

<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextBox>
</ClientOnly>

```vue
<fv-TextBox placeholder="Please enter the text here." background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-TextBox>
```

### TextBox-Dark Theme
---
<div style="padding: 15px; background: black;">
<ClientOnly>
<fv-TextBox placeholder="Please enter the text here." theme="dark"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" theme="dark"></fv-TextBox>
<fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" disabled theme="dark"></fv-TextBox>
<fv-TextBox underline prefix="Standard:" theme="dark" focusBorderColor="rgba(118, 185, 237, 1)"></fv-TextBox>
<fv-TextBox underline prefix="Standard:" disabled theme="dark"></fv-TextBox>
</ClientOnly>
</div>

```vue
<div style="padding: 15px; background: black;">
    <fv-TextBox placeholder="Please enter the text here." theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." disabled theme="dark" value="123"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" theme="dark"></fv-TextBox>
    <fv-TextBox placeholder="Please enter the text here." prefix="https://" suffix=".com" disabled theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" theme="dark"></fv-TextBox>
    <fv-TextBox underline prefix="Standard:" disabled theme="dark"></fv-TextBox>
</div>
```


### 属性
---
| 属性                  | 类型    | 必填  | 默认值     | 说明                                                                  |
|:---------------------:|:-------:|:-----:|:----------:|:---------------------------------------------------------------------:|
| modelValue            | string  | 否    | ''         | Using v-model binding input value                                     |
| mode                  | string  | 否    | 'default'  | Choose TextBox mode                                                   |
| inputmode             | string  | 否    | 'text'     | 输入模式，可选值为`numeric`，`tel`，`text`，`decimal`，`email`，`url` |
| placeholder           | string  | 否    | ''         | 等同于原生 HTML input 属性。                                          |
| type                  | string  | 否    | 'text'     | 等同于原生 HTML input 属性。                                          |
| mask                  | string  | 否    | 'mask:___' | The mask mode input template                                          |
| flag                  | string  | 否    | '_'        | The mask mode input flag                                              |
| pattern               | string  | 否    | '[Ss]*'    | 输入字符的正则限制。                                                  |
| inputRules            | string  | 否    | '[\S\s]*'  | 输入文本的正则限制，在Mask模式下无效。                                |
| readonly              | boolean | 否    | false      | 等同于原生 HTML input 属性。                                          |
| maxlength             | string  | 否    | ''         | 等同于原生 HTML input 属性。                                          |
| prefix                | string  | 否    | ''         | 前缀。                                                                |
| suffix                | string  | 否    | ''         | 后缀。                                                                |
| leftIcon              | string  | 否    | ''         | 左图标。                                                              |
| icon                  | string  | 否    | ''         | 右图标。                                                              |
| iconForeground        | string  | 否    | ''         |                                                                       |
| underline             | boolean | 否    | false      | 是否开启Underline风格的TextBox                                        |
| background            | string  | 否    | ''         |                                                                       |
| borderWidth           | number  | 否    | 1          |                                                                       |
| borderColor           | string  | 否    | ''         |                                                                       |
| focusBorderColor      | string  | 否    | ''         |                                                                       |
| revealBorderColor     | boolean | 否    | false      |                                                                       |
| revealBackgroundColor | boolean | 否    | false      |                                                                       |
| fontSize              | number  | 否    | 13.3       |                                                                       |
| fontWeight            | string  | 否    | 'normal'   |                                                                       |
| foreground            | string  | 否    | ''         |                                                                       |
| textAlign             | string  | 否    | 'left'     |                                                                       |
| borderRadius          | number  | 否    | 3          | Textbox圆角大小，启用revealBorder时将失效。                           |
| isBoxShadow           | boolean | 否    | false      | 开启`TextBox`阴影。                                                   |
| revealBorder          | boolean | 否    | false      |                                                                       |
| status                | string  | 否    | ''         | 状态边框预设，默认有警告和正确两种。                                  |
| debounceDelay         | number  | 否    | 300        | 搜索节流延迟时间。                                                    |
| disabled              | boolean | 否    | false      |                                                                       |
| cursor                | string  | 否    | ''         |                                                                       |
| theme                 | string  | 否    | 'global'   | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。      |
| lang                  | string  | 否    | "global"   | 参见组件的 `lang` 选项。                                              |

### 事件
---
| 事件名          | 参数   | 说明               |
|:---------------:|:------:|:------------------:|
| keydown         | event  |                    |
| keyup           | event  |                    |
| change          | event  |                    |
| paste           | event  |                    |
| left-icon-click | event  |                    |
| icon-click      | event  |                    |
| debounce-input  | string | 搜索节流内容反馈。 |

### 插槽
---

1. left-icon

用户可以自定义左图标插槽, 插槽名称为`left-icon`

```html
<template #left-icon>
   <i class="ms-Icon ms-Icon--Search"></i>
</template>
```

2. icon

用户可以自定义右图标插槽, 插槽名称为`icon`

```html
<template #icon>
   <i class="ms-Icon ms-Icon--Cancel"></i>
</template>
```
