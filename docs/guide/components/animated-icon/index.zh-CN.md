---
page: true
title: AnimatedIcon
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### AnimatedIcon-DEMO
---

<script>
export default {

    data () {
        return {
            animation: {
                enter: {
                    transform: 'rotate(-180deg)',
                    transition: `transform 0.1s`

                },
                leave: [
                    {
                        transform: 'rotate(365deg)',
                        transition: `transform 0.3s`

                    },
                    {
                        transform: 'rotate(360deg)',
                        transition: `transform 0.1s`

                    },
                    {
                        transform: 'rotate(0deg)'
                    }
                ]
            }
        }
    }

}
</script>

<ClientOnly>
<fv-AnimatedIcon fontSize="36">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon fontSize="36">
</fv-AnimatedIcon>
```

### Present Animation

---

1. Scale Down
<ClientOnly>
<fv-AnimatedIcon fontSize="20">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon fontSize="20">
</fv-AnimatedIcon>
```

2. Scale X Down
<ClientOnly>
<fv-AnimatedIcon modelValue="scaleXDown" fontSize="20" icon="GlobalNavButton">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon modelValue="scaleXDown" fontSize="20" icon="GlobalNavButton">
</fv-AnimatedIcon>
```

3. Scale Y Down
<ClientOnly>
<fv-AnimatedIcon modelValue="scaleYDown" fontSize="20" icon="Pause">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon modelValue="scaleYDown" fontSize="20" icon="Pause">
</fv-AnimatedIcon>
```

4. Back Scale
<ClientOnly>
<fv-AnimatedIcon modelValue="backScale" fontSize="20" icon="Back">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon modelValue="backScale" fontSize="20" icon="Back">
</fv-AnimatedIcon>
```

5. Bounce Rotate
<ClientOnly>
<fv-AnimatedIcon modelValue="bounceRotate" fontSize="20" icon="Settings">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon modelValue="bounceRotate" fontSize="20" icon="Settings">
</fv-AnimatedIcon>
```

### AnimatedIcon-With Content

---

<div>
<ClientOnly>
<fv-AnimatedIcon modelValue="bounceRotate" fontSize="20" icon="Settings">
<template v-slot:content>
<div style="margin-left: 15px;">Settings</div>
</template>
</fv-AnimatedIcon>
</ClientOnly>
</div>

```vue
<fv-AnimatedIcon modelValue="bounceRotate" fontSize="20" icon="Settings">
    <template v-slot:content>
        <div style="margin-left: 5px;">Settings</div>
    </template>
</fv-AnimatedIcon>
```

### AnimatedIcon-Customize Animation

---

<div>
<ClientOnly>
<fv-AnimatedIcon :customizeAnimation="animation" fontSize="20" icon="Settings">
</fv-AnimatedIcon>
</ClientOnly>
</div>

```vue
<fv-AnimatedIcon :customizeAnimation="animation" fontSize="20" icon="Settings">
</fv-AnimatedIcon>

<script>
data () {
    return {
        animation: {
            enter: {
                transform: 'rotate(-180deg)',
                transition: `transform 0.1s`
            },
            leave: [
                {
                    transform: 'rotate(365deg)',
                    transition: `transform 0.3s`
                },
                {
                    transform: 'rotate(360deg)',
                    transition: `transform 0.1s`
                },
                {
                    transform: 'rotate(0deg)'
                }
            ]
        }
    }
}
</script>
```

* Event types include `enter`,  `move`,  `down`,  `up`,  `leave` and corresponding to the `MouseEvent` and `TouchEvent` automatically.

* Each event can be declared as an `object` contain styles or an `array` contain multiple styles object. The transitions of an `array` will execute in order.

### AnimatedIcon-Customize Background

---

<ClientOnly>
<fv-AnimatedIcon modelValue="scaleYDown" fontSize="20" icon="Pause" background="whitesmoke">
</fv-AnimatedIcon>
</ClientOnly>

```vue
<fv-AnimatedIcon modelValue="scaleYDown" fontSize="20" icon="Pause" background="whitesmoke">
</fv-AnimatedIcon>
```

### AnimatedIcon-Dark Theme

---

<div style="padding: 5px; background: black; ">
<ClientOnly>
<fv-AnimatedIcon theme="dark" fontSize="20">
</fv-AnimatedIcon>
</ClientOnly>
</div>

```vue
<fv-AnimatedIcon theme="dark" fontSize="20">
</fv-AnimatedIcon>
```

### 属性

---
| 属性               | 类型    | 必填  | 默认值      | 说明                                                             |
|:------------------:|:-------:|:-----:|:-----------:|:----------------------------------------------------------------:|
| modelValue         | string  | 否    | 'scaleDown' | 动画预设名称。                                                   |
| icon               | string  | 否    | 'Search'    | Icon with Fabric-Icon                                            |
| customizeAnimation | boolean | 否    | false       | 自定义动画。                                                     |
| background         | string  | 否    | ''          | 背景色。                                                         |
| fontSize           | number  | 否    | 16          | AnimatedIcon 字体大小。                                          |
| hideContent        | boolean | 否    | false       | 隐藏文本内容。                                                   |
| theme              | string  | 否    | 'global'    | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled           | boolean | 否    | false       | 参见组件的 `disabled` 选项。                                     |
| lang               | string  | 否    | "global"    | 参见组件的 `lang` 选项。                                         |

### 事件

---
| 事件名 | 参数  | 说明                 |
|:------:|:-----:|:--------------------:|
| click  | event | AnimatedIcon onclick |

### 插槽

---
1. Default

默认模板是图标自定义模板

```javascript
<fv-animated-icon>
    <div></div>
</fv-animated-icon>
```

2. Content

客制化修改文字内容

```javascript
<fv-animated-icon>
    <template v-slot:content>
        <div>Content</div>
    </template>
</fv-animated-icon>
```
