---
page: true
title: IconElement
--- 

<!-- lang-switch -->
### IconElement-DEMO
--- 

<script>
export default {
    data () {
        return {
            heart: [
                {
                    name: 'HeartFill',
                    color: 'rgba(203, 22, 55, 1)'
                },
                {
                    name: 'Heart',
                }
            ],
            callSomebody: [
                {
                    name: 'ContactSolid',
                    position: 'left'
                },
                {
                    name: 'MobWifiCall0',
                    color: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
                }
            ],
            positionsFour: [
                {
                    name: "Dial5",
                    position: 'top-left'
                },
                {
                    name: "Dial6",
                    position: 'top-right'
                },
                {
                    name: "Dial7",
                    position: 'bottom-left'
                },
                {
                    name: "Dial8",
                    position: 'bottom-right'
                }
            ],
            positionH: [
                {
                    name: "Dial1",
                    position: 'left'
                },
                {
                    name: "Dial2",
                    position: 'right'
                }
            ],
            positionV: [
                {
                    name: "Dial3",
                    position: 'top'
                },
                {
                    name: "Dial4",
                    position: 'bottom'
                }
            ]
        }
    }
}
</script>

<ClientOnly>

Default

<fv-IconElement>
</fv-IconElement>

### IconElement-Combination
--- 

Heart

<div style="display: flex; align-items: center;"><fv-IconElement :value="[heart[0]]"></fv-IconElement><p style="font-size: 20px; font-weight: bold;">+</p><fv-IconElement :value="[heart[1]]"></fv-IconElement><p style="font-size: 20px; font-weight: bold;">=</p><fv-IconElement :value="heart"></fv-IconElement></div>

```vue
<fv-IconElement :value="heart"></fv-IconElement>
```

```javascript
heart: [
    {
        name: 'HeartFill',
        color: 'rgba(203, 22, 55, 1)'
    },
    {
        name: 'Heart',
    }
]
```

Calling

<div style="display: flex; align-items: center;"><fv-IconElement :value="[callSomebody[0]]"></fv-IconElement><p style="font-size: 20px; font-weight: bold;">+</p><fv-IconElement :value="[callSomebody[1]]"></fv-IconElement><p style="font-size: 20px; font-weight: bold;">=</p><fv-IconElement :value="callSomebody"></fv-IconElement></div>

```vue
<fv-IconElement :value="callSomebody"></fv-IconElement>
```

```javascript
callSomebody: [
    {
        name: 'ContactSolid',
        position: 'left'
    },
    {
        name: 'MobWifiCall0',
        color: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
    }
]
```

</ClientOnly>

### IconElement-Positions
---

Left, Right

<fv-IconElement :value="positionH"></fv-IconElement>

```vue
<fv-IconElement :value="positionH"></fv-IconElement>
```

Top, Bottom

<fv-IconElement :value="positionV"></fv-IconElement>

```vue
<fv-IconElement :value="positionV"></fv-IconElement>
```

Top-left, Top-right, Bottom-left, Bottom-right

<fv-IconElement :value="positionsFour"></fv-IconElement>

```vue
<fv-IconElement :value="positionsFour"></fv-IconElement>
```

```javascript
positionH: [
    {
        name: "Dial1",
        position: 'left'
    },
    {
        name: "Dial2",
        position: 'right'
    }
],
positionV: [
    {
        name: "Dial3",
        position: 'top'
    },
    {
        name: "Dial4",
        position: 'bottom'
    }
],
positionsFour: [
    {
        name: "Dial5",
        position: 'top-left'
    },
    {
        name: "Dial6",
        position: 'top-right'
    },
    {
        name: "Dial7",
        position: 'bottom-left'
    },
    {
        name: "Dial8",
        position: 'bottom-right'
    }
]
```

### IconElement-Icon Button
---

<fv-IconElement :value="heart" :iconButton="true" :paddingWidth="3"></fv-IconElement>

```vue
<fv-IconElement :value="heart" :iconButton="true" :paddingWidth="3"></fv-IconElement>
```

### 属性
---
| 属性         | 类型    | 必填  | 默认值           | 说明                                                             |
|:------------:|:-------:|:-----:|:----------------:|:----------------------------------------------------------------:|
| value        | string  | 否    | 'AppIconDefault' |                                                                  |
| fontSize     | number  | 否    | 32               | IconElement字体大小。                                            |
| paddingWidth | number  | 否    | 2                | IconElement内边距。                                              |
| iconButton   | boolean | 否    | false            | 是否以图标按钮样式呈现。                                         |
| borderRadius | number  | 否    | 6                | 图标按钮圆角。                                                   |
| theme        | string  | 否    | 'global'         | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled     | boolean | 否    | false            | 参见组件的 `disabled` 选项。                                     |
| lang         | string  | 否    | "global"         | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数  | 说明           |
|:------:|:-----:|:--------------:|
| click  | event | Button onclick |
