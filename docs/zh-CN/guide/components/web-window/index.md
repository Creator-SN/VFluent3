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



### 属性
---
| 属性            | 类型    | 必填  | 默认值      | 说明                                                             |
|:---------------:|:-------:|:-----:|:-----------:|:----------------------------------------------------------------:|
| modelValue      | boolean | 否    | true        | 开启或关闭WebWindow                                              |
| title           | string  | 否    | 'WebWindow' | WebWindow标题。                                                  |
| left            | number  | 否    | 0           | WebWindow默认距离左边的距离。                                    |
| top             | number  | 否    | 0           | WebWindow默认距离顶部的距离。                                    |
| isResize        | boolean | 否    | false       | 是否启用可变尺寸。                                               |
| isAcrylic       | boolean | 否    | false       | 是否开启背景模糊。                                               |
| refreshPosition | Boolean | No    | false       | 是否在WebWindow打开时刷新位置。                                  |
| theme           | string  | 否    | 'global'    | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| refreshPos      | boolean | 否    | false       | 参见组件的 `refreshPos` 选项。                                   |
| disabled        | boolean | 否    | false       | 参见组件的 `disabled` 选项。                                     |
| lang            | string  | 否    | "global"    | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数  | 说明                      |
|:------:|:-----:|:-------------------------:|
| close  |       | WebWindow关闭时触发事件。 |

### 插槽
---

1. Default

```vue
<fv-web-window>
    <div></div>
</fv-web-window>
```
