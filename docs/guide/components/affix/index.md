---
page: true
title: Affix
--- 


<!-- lang-switch -->
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

## Quick Start

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

### Properties
---
| Property | Type    | Required | Default  | Description                                                               |
|:--------:|:-------:|:--------:|:--------:|:-------------------------------------------------------------------------:|
| left     | string  | No       | ''       | Value of the `left` HTML attribute.                                       |
| top      | string  | No       | ''       | Value of the `top` HTML attribute.                                        |
| right    | string  | No       | ''       | Value of the `right` HTML attribute.                                      |
| bottom   | string  | No       | ''       | Value of the `bottom` HTML attribute.                                     |
| target   | any     | No       | null     | Target element for `Affix`; pass it as a function.                        |
| mode     | string  | No       | 'fixed'  | `Affix` mode: `fixed`, `relative`, or `auto`.                             |
| affixPos | array   | No       | ['top']  | Sticky positions inside the parent: `left`, `top`, `right`, and `bottom`. |
| zIndex   | string  | No       | ''       | `z-index` value of the `Affix` container.                                 |
| theme    | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`.  |
| disabled | boolean | No       | false    | See the Affix `disabled` option.                                          |
| lang     | string  | No       | "global" | See the Affix `lang` option.                                              |


### Events
---
| Event  | Arguments | Description                                                        |
|:------:|:---------:|:------------------------------------------------------------------:|
| change | Boolean   | Emitted when the fixed state changes; returns whether it is fixed. |

### Slots
---

1. Default

```vue
<fv-affix>
    <div></div>
</fv-affix>
```
