---
page: true
title: Button
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Basic Button
---


<ClientOnly>
<fv-button borderRadius="3"></fv-button>
</ClientOnly>

```vue
<fv-button borderRadius="3"></fv-button>
```

### Button With Icon
---

<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark">Add</fv-button>
```

### Custom Button
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

Custom Reveal Border
<ClientOnly>
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
</ClientOnly>

```vue
<fv-button icon="CalculatorAddition" theme="dark" background="#000046" revealBorderColor="#1cb5e0" revealBackgroundColor="rgba(28, 181, 226, 0.3)" borderRadius="3" borderWidth="3" :isBoxShadow="true">Add</fv-button>
```

### Disabled Button
---
<ClientOnly>
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
</ClientOnly>

```vue
<fv-button disabled icon="CalculatorAddition">Add</fv-button>
```



### Properties
---
| Property                     | Type    | Required | Default  | Description                                                              |
|:----------------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| icon                         | string  | No       | ''       | Icon with Fabric-Icon                                                    |
| foreground                   | string  | No       | ''       | Button foreground color.                                                 |
| background                   | string  | No       | ''       | Button background color.                                                 |
| borderRadius                 | number  | No       | 3        | Button border radius.                                                    |
| borderColor                  | string  | No       | ''       | Button border color.                                                     |
| fontSize                     | number  | No       | 13.3     | Button font size.                                                        |
| fontWeight                   | string  | No       | 'normal' | Button font weight.                                                      |
| revealBorderColor            | boolean | No       | false    | Reveal border color for the button.                                      |
| revealBackgroundColor        | boolean | No       | false    | Reveal background color for the button.                                  |
| isBoxShadow                  | boolean | No       | false    | Enable the button shadow.                                                |
| disabled                     | boolean | No       | false    | Disabled button                                                          |
| borderWidth                  | number  | No       | 1        | Button border width.                                                     |
| theme                        | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| revealBorderGradientList     | array   | No       | []       | See the Button `revealBorderGradientList` option.                        |
| revealBackgroundGradientList | array   | No       | []       | See the Button `revealBackgroundGradientList` option.                    |
| lang                         | string  | No       | "global" | See the Button `lang` option.                                            |

### Events
---
| Event | Arguments | Description    |
|:-----:|:---------:|:--------------:|
| click | event     | Button onclick |

### Slots
---
1. Default

```javascript
<fv-button>
    <div></div>
</fv-button>
```
