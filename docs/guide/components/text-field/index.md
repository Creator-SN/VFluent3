---
page: true
title: TextField
--- 

<!-- lang-switch -->
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



### Properties
---
| Property              | Type    | Required | Default  | Description                                                              |
|:---------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue            | string  | No       | ''       | Using v-model binding input value                                        |
| placeholder           | string  | No       | ''       | Same as the native HTML input attribute.                                 |
| readonly              | boolean | No       | false    | Same as the native HTML input attribute.                                 |
| maxlength             | string  | No       | ''       | Same as the native HTML input attribute.                                 |
| underline             | boolean | No       | false    | Whether to use the underline style for TextField                         |
| background            | string  | No       | ''       |                                                                          |
| borderWidth           | number  | No       | 1        |                                                                          |
| borderColor           | string  | No       | ''       |                                                                          |
| focusBorderColor      | string  | No       | ''       |                                                                          |
| fontSize              | number  | No       | 13.8     |                                                                          |
| fontWeight            | string  | No       | 'normal' | normal                                                                   |
| foreground            | string  | No       | ''       |                                                                          |
| textAlign             | string  | No       | 'left'   |                                                                          |
| borderRadius          | number  | No       | 3        | See the TextField `borderRadius` option.                                 |
| isBoxShadow           | boolean | No       | false    | Enable `TextField` shadow.                                               |
| revealBorder          | boolean | No       | false    |                                                                          |
| revealBorderColor     | boolean | No       | false    |                                                                          |
| revealBackgroundColor | boolean | No       | false    |                                                                          |
| status                | string  | No       | ''       | Preset status border. Built-in values are warning and correct.           |
| disabled              | boolean | No       | false    |                                                                          |
| theme                 | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang                  | string  | No       | "global" | See the TextField `lang` option.                                         |

### Events
---
| Event   | Arguments | Description |
|:-------:|:---------:|:-----------:|
| keydown | event     |             |
| keyup   | event     |             |
| change  | event     |             |
| paste   | event     |             |
