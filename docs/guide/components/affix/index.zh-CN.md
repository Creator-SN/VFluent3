---
page: true
title: Affix
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
export default {

    data () {
        return {
            test: [
                false,
                false
            ]
        }
    }

}
</script>

# Affix

## 快速开始

### Always Fixed

---

<ClientOnly>
<div ref="d1" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d1" left="0" :top="0">
<fv-button>Fixed</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
</ClientOnly>

```vue-html
<div ref="d1" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d1" left="0" :top="0">
<fv-button>Fixed</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```

### Affix-Affix Top
---

<div ref="d2" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix v-for="(item, index) in 10" :key="index" :target="() => $refs.d2" mode="auto" :left="0" :top="0">
<fv-button>Affix Top {{index + 1}}</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>

```vue-html
<div ref="d2" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 300px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix v-for="(item, index) in 10" :key="index" :target="() => $refs.d2" mode="auto" :left="0" :top="0">
<fv-button>Affix Top {{index + 1}}</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```

### Affix-Affix Top and Bottom

<div ref="d3" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 600px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d3" mode="auto" :bottom="0" :affixPos="['top', 'bottom']">
<fv-button style="width: 150px;">Affix Top and Bottom</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>

```vue-html
<div ref="d3" style="width: 80%; height: 500px; overflow: overlay;">
<div style="width: 80%; height: 600px; background: rgba(0, 204, 153, 0.1); overflow: overlay;"></div>
<fv-Affix :target="() => $refs.d3" mode="auto" :bottom="0" :affixPos="['top', 'bottom']">
<fv-button style="width: 150px;">Affix Top and Bottom</fv-button>
</fv-Affix>
<div style="width: 80%; height: 2000px; background: rgba(0, 153, 204, 0.1); overflow: overlay;">
</div>
</div>
```

### 属性
---
| 属性     | 类型    | 必填  | 默认值   | 说明                                                                    |
|:--------:|:-------:|:-----:|:--------:|:-----------------------------------------------------------------------:|
| left     | string  | 否    | ''       | `left`属性值，参照`HTML`属性。                                          |
| top      | string  | 否    | ''       | `top`属性值，参照`HTML`属性。                                           |
| right    | string  | 否    | ''       | `right`属性值，参照`HTML`属性。                                         |
| bottom   | string  | 否    | ''       | `bottom`属性值，参照`HTML`属性。                                        |
| target   | any     | 否    | null     | `Affix`的目标元素，为一个函数。                                         |
| mode     | string  | 否    | 'fixed'  | `Affix`的模式，`fixed`，`relative`或`auto`                              |
| affixPos | array   | 否    | ['top']  | `Affix`的在父元素滚动吸附位置，可以为`left`，`top`，`right` 和 `bottom` |
| zIndex   | string  | 否    | ''       | `Affix`容器的`z-index`值。                                              |
| theme    | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。        |
| disabled | boolean | 否    | false    | 参见组件的 `disabled` 选项。                                            |
| lang     | string  | 否    | "global" | 参见组件的 `lang` 选项。                                                |


### 事件
---
| 事件名 | 参数    | 说明                                     |
|:------:|:-------:|:----------------------------------------:|
| change | Boolean | 当固定状态发生改变时触发，返回是否固定。 |

### 插槽
---

1. Default

```vue
<fv-affix>
    <div></div>
</fv-affix>
```

**特别地** 若需要进行性能优化, 可以考虑在元素被隐藏时, 将`mode`设置为`relative`.
