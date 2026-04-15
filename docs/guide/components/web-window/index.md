---
page: true
title: WebWindow
---


<!-- lang-switch -->
### WebWindow-DEMO
---

<script>
export default {
    data () {
        return {
            theme: false,
            show: true,
            showResize: false,
            showAcrylic: false
        }
    }
}
</script>

<ClientOnly>
<fv-toggle-switch v-model="show" on="Show" off="Hide"></fv-toggle-switch>
<fv-WebWindow v-model="show">
<div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
</div>
</fv-WebWindow>

```vue
<fv-WebWindow>
    <div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
    </div>
</fv-WebWindow>
```

### WebWindow-Resize

<fv-toggle-switch v-model="showResize" on="Show" off="Hide"></fv-toggle-switch>
<fv-WebWindow v-model="showResize" :isResize="true">
<div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
</div>
</fv-WebWindow>

```vue
<fv-WebWindow :isResize="true">
    <div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
    </div>
</fv-WebWindow>
```

### WebWindow-Acrylic Background

<fv-toggle-switch v-model="showAcrylic" on="Show" off="Hide"></fv-toggle-switch>
<fv-WebWindow v-model="showAcrylic" :isAcrylic="true" style="background: rgba(255, 255, 255, 0.6);">
<div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
</div>
</fv-WebWindow>

```vue
<fv-WebWindow :isAcrylic="true" style="background: rgba(255, 255, 255, 0.6);">
    <div style="width: 100%; height: auto; padding: 25px; box-sizing: border-box;">
    </div>
</fv-WebWindow>
```
</ClientOnly>



### Properties
---
| Property        | Type    | Required | Default     | Description                                                              |
|:---------------:|:-------:|:--------:|:-----------:|:------------------------------------------------------------------------:|
| modelValue      | boolean | No       | true        | See the WebWindow `modelValue` option.                                   |
| title           | string  | No       | 'WebWindow' | See the WebWindow `title` option.                                        |
| left            | number  | No       | 0           | See the WebWindow `left` option.                                         |
| top             | number  | No       | 0           | See the WebWindow `top` option.                                          |
| isResize        | boolean | No       | false       | See the WebWindow `isResize` option.                                     |
| isAcrylic       | boolean | No       | false       | See the WebWindow `isAcrylic` option.                                    |
| refreshPosition | Boolean | No       | false       | See the WebWindow `refreshPosition` option.                              |
| theme           | string  | No       | 'global'    | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| refreshPos      | boolean | No       | false       | See the WebWindow `refreshPos` option.                                   |
| disabled        | boolean | No       | false       | See the WebWindow `disabled` option.                                     |
| lang            | string  | No       | "global"    | See the WebWindow `lang` option.                                         |

### Events
---
| Event | Arguments | Description                       |
|:-----:|:---------:|:---------------------------------:|
| close |           | See the component `close` option. |

### Slots
---

1. Default

```vue
<fv-web-window>
    <div></div>
</fv-web-window>
```
