---
page: true
title: TextBox
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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


### Properties
---
| Property              | Type    | Required | Default    | Description                                                              |
|:---------------------:|:-------:|:--------:|:----------:|:------------------------------------------------------------------------:|
| modelValue            | string  | No       | ''         | Using v-model binding input value                                        |
| mode                  | string  | No       | 'default'  | Choose TextBox mode                                                      |
| inputmode             | string  | No       | 'text'     | Input mode. Options:`numeric`, `tel`, `text`, `decimal`, `email`, `url`  |
| placeholder           | string  | No       | ''         | Same as the native HTML input attribute.                                 |
| type                  | string  | No       | 'text'     | Same as the native HTML input attribute.                                 |
| mask                  | string  | No       | 'mask:___' | The mask mode input template                                             |
| flag                  | string  | No       | '_'        | The mask mode input flag                                                 |
| pattern               | string  | No       | '[Ss]*'    | See the TextBox `pattern` option.                                        |
| inputRules            | string  | No       | '[\S\s]*'  | See the TextBox `inputRules` option.                                     |
| readonly              | boolean | No       | false      | Same as the native HTML input attribute.                                 |
| maxlength             | string  | No       | ''         | Same as the native HTML input attribute.                                 |
| prefix                | string  | No       | ''         | Prefix.                                                                  |
| suffix                | string  | No       | ''         | Suffix.                                                                  |
| leftIcon              | string  | No       | ''         | Left icon.                                                               |
| icon                  | string  | No       | ''         | Right icon.                                                              |
| iconForeground        | string  | No       | ''         |                                                                          |
| underline             | boolean | No       | false      | Whether to use the underline style for TextBox                           |
| background            | string  | No       | ''         |                                                                          |
| borderWidth           | number  | No       | 1          |                                                                          |
| borderColor           | string  | No       | ''         |                                                                          |
| focusBorderColor      | string  | No       | ''         |                                                                          |
| revealBorderColor     | boolean | No       | false      |                                                                          |
| revealBackgroundColor | boolean | No       | false      |                                                                          |
| fontSize              | number  | No       | 13.3       |                                                                          |
| fontWeight            | string  | No       | 'normal'   |                                                                          |
| foreground            | string  | No       | ''         |                                                                          |
| textAlign             | string  | No       | 'left'     |                                                                          |
| borderRadius          | number  | No       | 3          | See the TextBox `borderRadius` option.                                   |
| isBoxShadow           | boolean | No       | false      | Enable `TextBox` shadow.                                                 |
| revealBorder          | boolean | No       | false      |                                                                          |
| status                | string  | No       | ''         | Preset status border. Built-in values are warning and correct.           |
| debounceDelay         | number  | No       | 300        | Debounced input delay.                                                   |
| disabled              | boolean | No       | false      |                                                                          |
| cursor                | string  | No       | ''         |                                                                          |
| theme                 | string  | No       | 'global'   | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang                  | string  | No       | "global"   | See the TextBox `lang` option.                                           |

### Events
---
| Event           | Arguments | Description                           |
|:---------------:|:---------:|:-------------------------------------:|
| keydown         | event     |                                       |
| keyup           | event     |                                       |
| change          | event     |                                       |
| paste           | event     |                                       |
| left-icon-click | event     |                                       |
| icon-click      | event     |                                       |
| debounce-input  | string    | Emitted with debounced input content. |

### Slots
---

1. left-icon



```html
<template #left-icon>
   <i class="ms-Icon ms-Icon--Search"></i>
</template>
```

2. icon



```html
<template #icon>
   <i class="ms-Icon ms-Icon--Cancel"></i>
</template>
```
