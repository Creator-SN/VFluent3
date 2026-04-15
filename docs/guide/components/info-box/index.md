---
page: true
title: InfoBox
--- 

<!-- lang-switch -->
### InfoBox-DEMO
---

<script>
import { h, resolveComponent } from "vue";

export default {
    data () {
        return {}
    },
    methods: {
        show1 () {
            this.$infoBox('This is a toast info.', {
                status: 'correct',
                title: 'InfoBox',
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        },
        show2 () {
            this.$infoBox(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast info.',
                h('a', {
                    style: {
                        fontWeight: 'bold'
                    }
                }, 'Visit our website.')
            ]), {
                status: 'correct',
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        },
        show3 () {
            this.$infoBox(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast info.',
                h('a', {
                    style: {
                        fontWeight: 'bold'
                    }
                }, 'Visit our website.')
            ]), {
                status: 'correct',
                confirmTitle: 'Confirm',
                cancelTitle: 'Cancel',
                showTitleBar: false,
                control_panel: x => {
                return h(resolveComponent('fv-button'), {
                        style: {
                            width: '200px'
                        },
                        background: x.iconList['correct'].backgroundColor,
                        theme: "dark",
                        onClick: () => {
                            x.confirm();
                        }
                    }, 'Custom Control Button');
                },
                confirm: () => { alert('Confirm'); },
                cancel: () => { alert('Cancel'); }
            });
        }
    }
}
</script>

Default


<ClientOnly>
<fv-InfoBox>
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox>
</fv-InfoBox>
```

Error


<ClientOnly>
<fv-InfoBox status="error">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="error">
</fv-InfoBox>
```

Blocked


<ClientOnly>
<fv-InfoBox status="blocked">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="blocked">
</fv-InfoBox>
```

Correct


<ClientOnly>
<fv-InfoBox status="correct">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="correct">
</fv-InfoBox>
```

Warning


<ClientOnly>
<fv-InfoBox status="warning">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="warning">
</fv-InfoBox>
```

Without TitleBar


<ClientOnly>
<fv-InfoBox :showTitleBar="false">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox :showTitleBar="false">
</fv-InfoBox>
```

### InfoBox-Dark Theme
---
Default


<ClientOnly>
<fv-InfoBox theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox theme="dark">
</fv-InfoBox>
```

Error


<ClientOnly>
<fv-InfoBox status="error" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="error" theme="dark">
</fv-InfoBox>
```

Blocked


<ClientOnly>
<fv-InfoBox status="blocked" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="blocked" theme="dark">
</fv-InfoBox>
```

Correct


<ClientOnly>
<fv-InfoBox status="correct" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="correct" theme="dark">
</fv-InfoBox>
```

Warning


<ClientOnly>
<fv-InfoBox status="warning" theme="dark">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox status="warning" theme="dark">
</fv-InfoBox>
```

Without TitleBar


<ClientOnly>
<fv-InfoBox theme="dark" :showTitleBar="false">
</fv-InfoBox>
</ClientOnly>

```vue
<fv-InfoBox theme="dark" :showTitleBar="false">
</fv-InfoBox>
```

### InfoBox-Toast
---
1. Standard


<ClientOnly>
<fv-button style="width: 200px;" @click="show1">Show InfoBox</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show1">Show InfoBox</fv-button>
```

```javascript
this.$infoBox('This is a toast info.', {
    status: 'correct',
    title: 'InfoBox',
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```

2. Customize Message Template


<ClientOnly>
<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show2">Show InfoBox</fv-button>
```

```javascript
this.$infoBox(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast info.',
    h('a', {
        style: {
            fontWeight: 'bold'
        }
    }, 'Visit our website.')
]), {
    status: 'correct',
    confirmTitle: 'Confirm',
    cancelTitle: 'Cancel',
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```

3. Customize Control Panel


<ClientOnly>
<fv-button style="width: 200px;" @click="show3">Show InfoBox</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show3">Show InfoBox</fv-button>
```

```javascript
this.$infoBox(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast info.',
    h('a', {
        style: {
            fontWeight: 'bold'
        }
    }, 'Visit our website.')
]), {
    status: 'correct',
    confirmTitle: 'Confirm',
    cancelTitle: 'Cancel',
    showTitleBar: false,
    control_panel: x => {
    return h(resolveComponent('fv-button'), {
            style: {
                width: '200px'
            },
            background: x.iconList['correct'].backgroundColor,
            theme: "dark",
            onClick: () => {
                x.confirm();
            }
        }, 'Custom Control Button');
    },
    confirm: () => { alert('Confirm'); },
    cancel: () => { alert('Cancel'); }
});
```


### Properties
---
| Property     | Type    | Required | Default    | Description                                                              |
|:------------:|:-------:|:--------:|:----------:|:------------------------------------------------------------------------:|
| title        | string  | No       | 'Tip'      | See the InfoBox `title` option.                                          |
| status       | string  | No       | 'default'  | See the InfoBox `status` option.                                         |
| mode         | string  | No       | 'relative' | See the InfoBox `mode` option.                                           |
| toast        | Boolean | No       | false      | See the InfoBox `toast` option.                                          |
| confirmTitle | string  | No       | '确定'     | See the InfoBox `confirmTitle` option.                                   |
| cancelTitle  | string  | No       | '取消'     | See the InfoBox `cancelTitle` option.                                    |
| acrylic      | boolean | No       | false      | See the InfoBox `acrylic` option.                                        |
| showTitleBar | boolean | No       | true       | See the InfoBox `showTitleBar` option.                                   |
| theme        | string  | No       | 'global'   | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| destroy      |         | No       | false      | See the InfoBox `destroy` option.                                        |
| disabled     | boolean | No       | false      | See the InfoBox `disabled` option.                                       |
| lang         | string  | No       | "global"   | See the InfoBox `lang` option.                                           |

### Events
---
| Event   | Arguments | Description                         |
|:-------:|:---------:|:-----------------------------------:|
| confirm |           | See the component `confirm` option. |
| close   |           | See the component `close` option.   |

### Slots
---

1. Msg





```vue
<template v-slot:msg>
    <span>Normal content <span class="header">Header content</span><a>Link</a></span>
</template>
```

2. Control Panel






```vue
<template v-slot:control-panel="x">
    <fv-button :theme="'dark'" :background="x.iconList[status].backgroundColor" :isBoxShadow="true" :borderRadius="6" style="width: 50%; height: 35px; margin-right: 2.5px;" @click="x.confirm">Confirm</fv-button>
    <fv-button :theme="x.theme" :isBoxShadow="true" :borderRadius="6" style="width: 50%; height: 35px; margin-left: 2.5px;" @click="x.cancel">Cancel</fv-button>
</template>

### Toast
---

```javascript
this.$infoBox(msg, options = {
    title: 'InfoBox',
    status: 'default',
    mode: 'fixed',
    toast: true,


    acrylic: false,
    confirm: async () => {},
    cancel: async () => {},
    control_panel: null,
    theme: 'global'
});



```
