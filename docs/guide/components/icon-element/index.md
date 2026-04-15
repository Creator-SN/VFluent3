---
page: true
title: IconElement
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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

### Properties
---
| Property     | Type    | Required | Default          | Description                                                              |
|:------------:|:-------:|:--------:|:----------------:|:------------------------------------------------------------------------:|
| value        | string  | No       | 'AppIconDefault' |                                                                          |
| fontSize     | number  | No       | 32               | See the IconElement `fontSize` option.                                   |
| paddingWidth | number  | No       | 2                | See the IconElement `paddingWidth` option.                               |
| iconButton   | boolean | No       | false            | See the IconElement `iconButton` option.                                 |
| borderRadius | number  | No       | 6                | See the IconElement `borderRadius` option.                               |
| theme        | string  | No       | 'global'         | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled     | boolean | No       | false            | See the IconElement `disabled` option.                                   |
| lang         | string  | No       | "global"         | See the IconElement `lang` option.                                       |

### Events
---
| Event | Arguments | Description    |
|:-----:|:---------:|:--------------:|
| click | event     | Button onclick |
