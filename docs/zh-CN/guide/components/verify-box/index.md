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
    },
    methods: {
        handleConfirm(value) {
            console.log('confirm', value)
        }
    }
}
</script>


<ClientOnly>


基础用法


<ClientOnly>
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value">
</fv-VerifyBox>
```

<p>{{value}}</p>


高亮边框


<ClientOnly>
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" focusBorderColor="rgba(0, 153, 204, 0.6)" :border-width="2">
</fv-VerifyBox>
```

显示 Reveal Border


<ClientOnly>
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" :reveal-border="true" :border-width="2">
</fv-VerifyBox>
```

确认事件


<ClientOnly>
<fv-VerifyBox v-model="value" @confirm="handleConfirm">
</fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox v-model="value" @confirm="handleConfirm">
</fv-VerifyBox>

<script>
export default {
    methods: {
        handleConfirm(value) {
            console.log('confirm', value)
        }
    }
}
</script>
```


### VerifyBox-Disabled
---
1. 标准


<ClientOnly>
<fv-VerifyBox disabled></fv-VerifyBox>
</ClientOnly>

```vue
<fv-VerifyBox disabled></fv-VerifyBox>
```


</ClientOnly>


### 属性
---
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:----:|:----:|:----:|:------:|:----:|
| modelValue | string | 否 | '' | 使用 `v-model` 绑定的输入值。 |
| length | number | 否 | 4 | 验证码长度。 |
| inputmode | string | 否 | 'numeric' | 输入模式，可选值为 `numeric`、`tel`、`text`、`decimal`、`email`、`url`。 |
| underline | boolean | 否 | false | 是否使用下划线风格的 VerifyBox。 |
| background | string | 否 | '' | 背景色。 |
| borderWidth | number | 否 | 1 | 边框宽度。 |
| borderColor | string | 否 | '' | 边框颜色。 |
| focusBorderColor | string | 否 | '' | 聚焦时边框颜色。 |
| fontSize | number | 否 | 18 | 字体大小。 |
| fontWeight | string | 否 | 'bold' | 字体粗细。 |
| foreground | string | 否 | '' | 前景色。 |
| borderRadius | number | 否 | 3 | 圆角大小。 |
| isBoxShadow | boolean | 否 | false | 是否启用 VerifyBox 阴影。 |
| revealBorder | boolean | 否 | false | 是否启用 Reveal Border 效果。 |
| disabled | boolean | 否 | false | 是否禁用。 |
| theme | string | 否 | 'global' | 主题样式，支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang | string | 否 | 'global' | 语言设置。 |

### 事件
---
| 事件名 | 参数 | 说明 |
|:------:|:----:|:----:|
| confirm | string | 输入完成时触发。可以使用 `@confirm="handleConfirm"` 在回调里 `console.log` 输出结果。 |
