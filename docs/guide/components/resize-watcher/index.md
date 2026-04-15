---
page: true
title: ResizeWatcher
--- 


<!-- lang-switch -->
<script>
export default {

    data () {
        return {
            isPos: false,
            isMove: false,
            pos: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }
    },
    methods: {
        setPos (event) {
            const {left, top, right, bottom} = event;
            this.pos = {left, top, right, bottom};
        },
        setSize (event) {
            const {width, height} = event;
            this.size = {width, height};
        }
    }
}
</script>

<ClientOnly>
<fv-button ref="a" :style="{width: isPos ? '200px' : '120px'}" style="transition: all 0.3s;" @click="isPos ^= true">Resize Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.a ? $refs.a.$el : null" @watch="setSize">
</fv-ResizeWatcher>

<p>width: {{size.width}} height: {{size.height}}</p>
</ClientOnly>

```vue-html
<fv-button ref="a" :style="{width: isPos ? '200px' : '120px'}" style="transition: all 0.3s;" @click="isPos ^= true">Resize Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.a ? $refs.a.$el : null" @watch="setSize">
</fv-ResizeWatcher>
```

<ClientOnly>
<fv-button ref="b" :style="{left: isMove ? '50px' : ''}" style="transition: all 0.3s;" @click="isMove ^= true">Move Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.b ? $refs.b.$el : null" @watch="setPos">
</fv-ResizeWatcher>

<p>left: {{pos.left}} top: {{pos.top}} right: {{pos.right}} bottom: {{pos.bottom}}</p>
</ClientOnly>

```vue-html
<fv-button ref="b" :style="{left: isMove ? '50px' : ''}" style="transition: all 0.3s;" @click="isMove ^= true">Move Me</fv-button>

<fv-ResizeWatcher :target="() => $refs.b ? $refs.b.$el : null" @watch="setPos">
</fv-ResizeWatcher>
```

### Properties
---
| Property | Type    | Required | Default  | Description                                                              |
|:--------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| target   | any     | No       | null     | See the ResizeWatcher `target` option.                                   |
| theme    | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled | boolean | No       | false    | See the ResizeWatcher `disabled` option.                                 |
| lang     | string  | No       | "global" | See the ResizeWatcher `lang` option.                                     |

### Events
---
| Event        | Arguments | Description                              |
|:------------:|:---------:|:----------------------------------------:|
| watch        | object    | See the component `watch` option.        |
| watch-resize | object    | See the component `watch-resize` option. |
| watch-pos    | object    | See the component `watch-pos` option.    |
