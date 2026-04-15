---
page: true
title: FlipView
--- 

<!-- lang-switch -->
### FlipView-DEMO
---

<script>
export default {
    data () {
        return {
            value: [1,2,3,4,5],
            images: ['https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true']
        }
    }
}
</script>

<ClientOnly>
<fv-FlipView v-model="value">
</fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="value">
</fv-FlipView>
```

### FlipView Custom Template

---
<ClientOnly>
<fv-FlipView v-model="images"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Vertical Direction

---


<ClientOnly>
<fv-FlipView v-model="images" direction="vertical"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images" direction="vertical">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Mask

---


<ClientOnly>
<fv-FlipView v-model="images" mask="rgba(36,36,36,0.6)"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images" mask="rgba(36,36,36,0.6)">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Different Animation

---


<ClientOnly>
<fv-FlipView v-model="images" animation="fold"><template v-slot:item="x"><img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images" animation="fold">
    <template v-slot:item="x">
        <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
    </template>
</fv-FlipView>
```

### FlipView Dark Theme

---


<ClientOnly>
<fv-FlipView v-model="images" theme="dark"><template v-slot:item="x"><div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;"><p style="font-size: 36px; color: whitesmoke;">Dark Theme</p></div></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images" theme="dark">
    <template v-slot:item="x">
        <div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 36px; color: whitesmoke;">Dark Theme</p>
        </div>
    </template>
</fv-FlipView>
```

### FlipView Show Control Panel

---


<ClientOnly>
<fv-FlipView v-model="images" theme="dark" showControlPanel="hover"><template v-slot:item="x"><div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;"><p style="font-size: 36px; color: whitesmoke;">Dark Theme</p></div></template></fv-FlipView>
</ClientOnly>

```vue
<fv-FlipView v-model="images" theme="dark" showControlPanel="hover">
    <template v-slot:item="x">
        <div style="position: relative; width: 100%; height: 100%; background: rgba(36,36,36,1); display: flex; justify-content: center; align-items: center;">
            <p style="font-size: 36px; color: whitesmoke;">Dark Theme</p>
        </div>
    </template>
</fv-FlipView>
```

### Properties

---

| Property         | Type    | Required | Default      | Description                                                              |
|:----------------:|:-------:|:--------:|:------------:|:------------------------------------------------------------------------:|
| modelValue       | array   | No       | []           | Flipview template data                                                   |
| direction        | string  | No       | 'horizontal' |                                                                          |
| animation        | string  | No       | 'move'       | move, moveFade, moveDifferent, glue, push, fold                          |
| duration         | number  | No       | 800          |                                                                          |
| autoPlay         | boolean | No       | true         |                                                                          |
| autoPlayDuration | number  | No       | 5000         |                                                                          |
| showControlPanel | string  | No       | ''           |                                                                          |
| mask             | string  | No       | ''           | The mask color of control panel                                          |
| theme            | string  | No       | 'global'     | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled         | boolean | No       | false        | See the FlipView `disabled` option.                                      |
| lang             | string  | No       | "global"     | See the FlipView `lang` option.                                          |

### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| change | object    | See the component `change` option. |

### Slots

---

1. Input

```javascript
<template v-slot:item="x">
    <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
</template>
```
