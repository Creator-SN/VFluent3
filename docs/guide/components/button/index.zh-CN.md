---
page: true
title: Button
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### 基础按钮
---


<ClientOnly>
<fv-button borderRadius="3"></fv-button>
</ClientOnly>

```vue
<fv-button borderRadius="3"></fv-button>
```

### 带图标的按钮
---

<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
```

### 自定义按钮
---

<ClientOnly>
<fv-button icon="CalculatorAddition" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" :isBoxShadow="true">Add</fv-button>
``` 

<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark" background="linear-gradient(to right, #000046, #1cb5e0)" borderRadius="3" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark" background="linear-gradient(to right, #000046, #1cb5e0)" borderRadius="3" :isBoxShadow="true">Add</fv-button>
```

自定义 Reveal 边框
<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
```

### 禁用按钮
---
<ClientOnly>
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
</ClientOnly>

```vue
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
```



### 属性
---
| 属性                         | 类型    | 必填  | 默认值   | 说明                                                             |
|:----------------------------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| icon                         | string  | 否    | ''       | Icon with Fabric-Icon                                            |
| foreground                   | string  | 否    | ''       | Button 前景色。                                                  |
| background                   | string  | 否    | ''       | Button 背景色。                                                  |
| borderRadius                 | number  | 否    | 3        | Button 圆角大小。                                                |
| borderColor                  | string  | 否    | ''       | Button 边框颜色。                                                |
| fontSize                     | number  | 否    | 13.3     | Button 字体大小。                                                |
| fontWeight                   | string  | 否    | 'normal' | Button 字体粗细。                                                |
| revealBorderColor            | boolean | 否    | false    | Button Reveal 边框颜色。                                         |
| revealBackgroundColor        | boolean | 否    | false    | Button Reveal 背景颜色。                                         |
| isBoxShadow                  | boolean | 否    | false    | 开启`Button`阴影。                                               |
| disabled                     | boolean | 否    | false    | Disabled button                                                  |
| borderWidth                  | number  | 否    | 1        | Button 边框宽度。                                                |
| theme                        | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| revealBorderGradientList     | array   | 否    | []       | 参见组件的 `revealBorderGradientList` 选项。                     |
| revealBackgroundGradientList | array   | 否    | []       | 参见组件的 `revealBackgroundGradientList` 选项。                 |
| lang                         | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数  | 说明           |
|:------:|:-----:|:--------------:|
| click  | event | Button onclick |

### 插槽
---
1. Default

```javascript
<fv-button>
    <div></div>
</fv-button>
```
