---
page: true
title: AnimatedIcon
--- 

<!-- lang-switch -->
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

### Properties

---
| Property           | Type    | Required | Default     | Description                                                              |
|:------------------:|:-------:|:--------:|:-----------:|:------------------------------------------------------------------------:|
| modelValue         | string  | No       | 'scaleDown' | Animation preset name.                                                   |
| icon               | string  | No       | 'Search'    | Icon with Fabric-Icon                                                    |
| customizeAnimation | boolean | No       | false       | Custom animation.                                                        |
| background         | string  | No       | ''          | Background color.                                                        |
| fontSize           | number  | No       | 16          | See the AnimatedIcon `fontSize` option.                                  |
| hideContent        | boolean | No       | false       | Hide the text content.                                                   |
| theme              | string  | No       | 'global'    | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled           | boolean | No       | false       | See the AnimatedIcon `disabled` option.                                  |
| lang               | string  | No       | "global"    | See the AnimatedIcon `lang` option.                                      |

### Events

---
| Event | Arguments | Description          |
|:-----:|:---------:|:--------------------:|
| click | event     | AnimatedIcon onclick |

### Slots

---
1. Default

The default slot customizes the icon content.

```javascript
<fv-animated-icon>
    <div></div>
</fv-animated-icon>
```

2. Content

Customize the text content.

```javascript
<fv-animated-icon>
    <template v-slot:content>
        <div>Content</div>
    </template>
</fv-animated-icon>
```
