---
page: true
title: VerifyBox
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### VerifyBox-DEMO
--- 

<script>
export default {
    data () {
        return {
            value: ""
        }
    }
}
</script>


<ClientOnly>


Standard


<ClientOnly>
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
```

<p>{{value}}</p>


With Highlight


<ClientOnly>
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
```

Reveal Border


<ClientOnly>
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
```


### VerifyBox-Disabled
---
1. Standard


<ClientOnly>
<fv-VerifyBox disabled></fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox disabled></fv-VerifyBox>
```


</ClientOnly>


### Properties
---
| Property         | Type    | Required | Default   | Description                                                              |
|:----------------:|:-------:|:--------:|:---------:|:------------------------------------------------------------------------:|
| modelValue       | string  | No       | ''        | Using v-model binding input value                                        |
| length           | number  | No       | 4         | Verification code length.                                                |
| inputmode        | string  | No       | 'numeric' | Input mode. Options:`numeric`, `tel`, `text`, `decimal`, `email`, `url`  |
| underline        | boolean | No       | false     | Whether to use the underline style for VerifyBox                         |
| background       | string  | No       | ''        |                                                                          |
| borderWidth      | number  | No       | 1         |                                                                          |
| borderColor      | string  | No       | ''        |                                                                          |
| focusBorderColor | string  | No       | ''        |                                                                          |
| fontSize         | number  | No       | 18        |                                                                          |
| fontWeight       | string  | No       | 'bold'    |                                                                          |
| foreground       | string  | No       | ''        |                                                                          |
| borderRadius     | number  | No       | 3         | See the VerifyBox `borderRadius` option.                                 |
| isBoxShadow      | boolean | No       | false     | Enable `VerifyBox` shadow.                                               |
| revealBorder     | boolean | No       | false     |                                                                          |
| disabled         | boolean | No       | false     |                                                                          |
| theme            | string  | No       | 'global'  | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang             | string  | No       | "global"  | See the VerifyBox `lang` option.                                         |

### Events
---
| Event   | Arguments | Description                                            |
|:-------:|:---------:|:------------------------------------------------------:|
| confirm | string    | Emitted when input is complete and returns the result. |
