---
page: true
title: RightMenu
--- 


<!-- lang-switch -->
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        Click($event, el) {
            $event.stopPropagation();
            this.$refs.r1.rightClick($event, el);
        },
        rightClick($event, el) {
            $event.preventDefault();
            this.$refs.r1.rightClick($event, el);
        }
    }
}
</script>

### RightMenu-DEMO
--- 

<ClientOnly>
Inside the Parent Element.

<fv-button ref="b1" style="width: 120px;" @contextmenu.capture="rightClick($event, $el)">Inside Parent</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200"><span>Item1</span><hr><span>Item2</span></fv-RightMenu>

```vue
<fv-button ref="b1" style="width: 120px;" @contextmenu.capture="rightClick($event, $el)">Inside Parent</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

Inside the button.

<fv-button ref="b2" style="width: 120px;" @contextmenu.capture="rightClick($event, $refs.b2.$el)">Inside Button</fv-button>

```vue
<fv-button ref="b2" style="width: 120px;" @contextmenu.capture="rightClick($event, $refs.b2.$el)">Inside Button</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

```javascript
rightClick($event, el) {
    $event.preventDefault();
    this.$refs.r1.rightClick($event, el);
}
```

### RightMenu-Left Click
---

<fv-button ref="b1" style="width: 120px;" @click="Click($event, $el)">Left Click</fv-button>

```vue
<fv-button ref="b1" style="width: 120px;" @click="Click($event, $el)">Left Click</fv-button>

<fv-RightMenu ref="r1" :rightMenuWidth="200">
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

```javascript
Click($event, el) {
    $event.stopPropagation();
    this.$refs.r1.rightClick($event, el);
}
```
</ClientOnly>

### Properties
---
| Property            | Type    | Required | Default  | Description                                                              |
|:-------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue          | boolean | No       | false    | See the RightMenu `modelValue` option.                                   |
| rightMenuWidth      | number  | No       | 200      | See the RightMenu `rightMenuWidth` option.                               |
| background          | string  | No       | ''       | See the RightMenu `background` option.                                   |
| fullExpandAnimation | boolean | No       | false    | See the RightMenu `fullExpandAnimation` option.                          |
| theme               | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled            | boolean | No       | false    | See the RightMenu `disabled` option.                                     |
| lang                | string  | No       | "global" | See the RightMenu `lang` option.                                         |

### Events
---
| Event         | Arguments | Description                               |
|:-------------:|:---------:|:-----------------------------------------:|
| update-height | Number    | See the component `update-height` option. |

### Slots
---

1. Default



```vue
<fv-RightMenu>
    <span>Item1</span>
    <hr>
    <span>Item2</span>
</fv-RightMenu>
```

### Appendix

---










```javascript
Click($event, el) {
    $event.stopPropagation();
    this.$refs.r1.rightClick($event, el);
},
rightClick($event, el) {
    $event.preventDefault();
    this.$refs.r1.rightClick($event, el);
}
```
