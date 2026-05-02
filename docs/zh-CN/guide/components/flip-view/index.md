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
            images: ['https://placehold.co/500x300/png?text=VFluent+Sample+1', 'https://placehold.co/500x300/png?text=VFluent+Sample+2', 'https://placehold.co/500x300/png?text=VFluent+Sample+3']
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

### 属性

---

| 属性             | 类型    | 必填  | 默认值       | 说明                                                             |
|:----------------:|:-------:|:-----:|:------------:|:----------------------------------------------------------------:|
| modelValue       | array   | 否    | []           | Flipview template data                                           |
| direction        | string  | 否    | 'horizontal' |                                                                  |
| animation        | string  | 否    | 'move'       | move，moveFade，moveDifferent，glue，push，fold                  |
| duration         | number  | 否    | 800          |                                                                  |
| autoPlay         | boolean | 否    | true         |                                                                  |
| autoPlayDuration | number  | 否    | 5000         |                                                                  |
| showControlPanel | string  | 否    | ''           |                                                                  |
| mask             | string  | 否    | ''           | The mask color of control panel                                  |
| theme            | string  | 否    | 'global'     | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled         | boolean | 否    | false        | 参见组件的 `disabled` 选项。                                     |
| lang             | string  | 否    | "global"     | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数   | 说明                                                    |
|:------:|:------:|:-------------------------------------------------------:|
| change | object | 当切换页面时返回当前索引`index`和当前轮播周期`duration` |

### 插槽

---

1. Input

```javascript
<template v-slot:item="x">
    <img alt="" :src="x.data" style="width: 100%; height: 100%; object-fit: cover;"/>
</template>
```
