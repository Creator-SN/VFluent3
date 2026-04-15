---
page: true
title: VerifyBox
--- 

<!-- lang-switch -->
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


### 属性
---
| 属性             | 类型    | 必填  | 默认值    | 说明                                                                  |
|:----------------:|:-------:|:-----:|:---------:|:---------------------------------------------------------------------:|
| modelValue       | string  | 否    | ''        | Using v-model binding input value                                     |
| length           | number  | 否    | 4         | 验证码长度。                                                          |
| inputmode        | string  | 否    | 'numeric' | 输入模式，可选值为`numeric`，`tel`，`text`，`decimal`，`email`，`url` |
| underline        | boolean | 否    | false     | 是否开启Underline风格的VerifyBox                                      |
| background       | string  | 否    | ''        |                                                                       |
| borderWidth      | number  | 否    | 1         |                                                                       |
| borderColor      | string  | 否    | ''        |                                                                       |
| focusBorderColor | string  | 否    | ''        |                                                                       |
| fontSize         | number  | 否    | 18        |                                                                       |
| fontWeight       | string  | 否    | 'bold'    |                                                                       |
| foreground       | string  | 否    | ''        |                                                                       |
| borderRadius     | number  | 否    | 3         | VerifyBox圆角大小，启用revealBorder时将失效。                         |
| isBoxShadow      | boolean | 否    | false     | 开启`VerifyBox`阴影。                                                 |
| revealBorder     | boolean | 否    | false     |                                                                       |
| disabled         | boolean | 否    | false     |                                                                       |
| theme            | string  | 否    | 'global'  | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。      |
| lang             | string  | 否    | "global"  | 参见组件的 `lang` 选项。                                              |

### 事件
---
| 事件名  | 参数   | 说明                 |
|:-------:|:------:|:--------------------:|
| confirm | string | 完成输入并返回结果。 |
