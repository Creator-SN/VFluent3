---
page: true
title: MessageBar
--- 

<!-- lang-switch -->
### MessageBar-DEMO
---

<script>
import { h, resolveComponent } from "vue";

export default {
    data () {
        return {}
    },
    methods: {
        show1 () {
            this.$barWarning('This is a toast message.', {
                status: 'correct'
            });
        },
        show2 () {
            this.$barWarning(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast message.',
                h('a', 'Visit our website.')
            ]), {
                status: 'correct'
            });
        },
        show3 () {
            this.$barWarning(h('div', [
                h('span', { class: 'header' }, 'Message'),
                'This is a toast message.',
                h('a', 'Visit our website.')
            ]), {
                status: 'correct',
                showControl: true,
                autoClose: -1,
                control: x => {
                    return h('div', {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        }
                    }, [
                        h(resolveComponent('fv-button'), {
                            onClick: () => {
                                alert('Yes');
                                x.cancel();
                            },
                        }, 'Yes'),
                        h(resolveComponent('fv-button'), {
                            onClick: () => {
                                alert('No');
                                x.cancel();
                            },
                            style: 'margin-left: 5px;' }, 'No')
                    ]);
                }
            });
        },
        showSwiftWarning () {
            this.$swiftWarning(document.getElementById('example'), {
                color: "rgba(173, 38, 45, 1)",
                replaceTitle: "You clicked Swift Warning."
            });
        }
    }
}
</script>



Default


<ClientOnly>
<fv-MessageBar>
</fv-MessageBar>
</ClientOnly>

Error


<ClientOnly>
<fv-MessageBar status="error">
</fv-MessageBar>
</ClientOnly>

Blocked


<ClientOnly>
<fv-MessageBar status="blocked">
</fv-MessageBar>
</ClientOnly>

Correct


<ClientOnly>
<fv-MessageBar status="correct">
</fv-MessageBar>
</ClientOnly>

Warning


<ClientOnly>
<fv-MessageBar status="warning">
</fv-MessageBar>
</ClientOnly>

```vue
Default

<fv-MessageBar>
</fv-MessageBar>

Error

<fv-MessageBar status="error">
</fv-MessageBar>

Blocked

<fv-MessageBar status="blocked">
</fv-MessageBar>

Correct

<fv-MessageBar status="correct">
</fv-MessageBar>

Warning

<fv-MessageBar status="warning">
</fv-MessageBar>
```

### MessageBar-Dark Theme
---

Default


<ClientOnly>
<fv-MessageBar theme="dark">
</fv-MessageBar>
</ClientOnly>

Error


<ClientOnly>
<fv-MessageBar theme="dark" status="error">
</fv-MessageBar>
</ClientOnly>

Blocked


<ClientOnly>
<fv-MessageBar theme="dark" status="blocked">
</fv-MessageBar>
</ClientOnly>

Correct


<ClientOnly>
<fv-MessageBar theme="dark" status="correct">
</fv-MessageBar>
</ClientOnly>

Warning


<ClientOnly>
<fv-MessageBar theme="dark" status="warning">
</fv-MessageBar>
</ClientOnly>

### MessageBar-Toast
---
1. Standard


<ClientOnly>
<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show1">Show MessageBar</fv-button>
```

```javascript
this.$barWarning('This is a toast message.', {
    status: 'correct'
});
```

2. Customize Message Template


<ClientOnly>
<fv-button style="width: 200px;" @click="show2">Show MessageBar</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show2">Show MessageBar</fv-button>
```

```javascript
this.$barWarning(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast message.',
    h('a', 'Visit our website.')
]), {
    status: 'correct'
});
```

3. Customize Control Template


<ClientOnly>
<fv-button style="width: 200px;" @click="show3">Show MessageBar</fv-button>
</ClientOnly>

```vue
<fv-button style="width: 200px;" @click="show3">Show MessageBar</fv-button>
```

```javascript
this.$barWarning(h('div', [
    h('span', { class: 'header' }, 'Message'),
    'This is a toast message.',
    h('a', 'Visit our website.')
]), {
    status: 'correct',
    showControl: true,
    autoClose: -1,
    control: x => {
        return h('div', {
            style: {
                display: "flex",
                alignItems: "center"
            }
        }, [
            h(resolveComponent('fv-button'), {
                onClick: () => {
                    alert('Yes');
                    x.cancel();
                },
            }, 'Yes'),
            h(resolveComponent('fv-button'), {
                onClick: () => {
                    alert('No');
                    x.cancel();
                },
                style: 'margin-left: 5px;' }, 'No')
        ]);
    }
});
```

### SwiftWarning

<p id="example">Swift Warning</p>


<ClientOnly>
<fv-button style="width: 200px;" @click="showSwiftWarning">Click to Show SwiftWarning</fv-button>
</ClientOnly>

```vue
<p id="example">Swift Warning</p>

<fv-button style="width: 200px;" @click="showSwiftWarning">Click to Show SwiftWarning</fv-button>
```

```javascript
this.$swiftWarning(document.getElementById('example'), {
    color: "rgba(173, 38, 45, 1)",
    replaceTitle: "You clicked Swift Warning."
});
```



### Properties
---
| Property    | Type    | Required | Default    | Description                              |
|:-----------:|:-------:|:--------:|:----------:|:----------------------------------------:|
| status      |         | No       | 'default'  | See the MessageBar `status` option.      |
| showControl |         | No       | false      | See the MessageBar `showControl` option. |
| showClose   |         | No       | true       | See the MessageBar `showClose` option.   |
| mode        | string  | No       | 'relative' | See the MessageBar `mode` option.        |
| autoClose   | number  | No       | 3000       | See the MessageBar `autoClose` option.   |
| destroy     | object  | No       | () => {}   | See the MessageBar `destroy` option.     |
| theme       | string  | No       | 'global'   | See the MessageBar `theme` option.       |
| disabled    | boolean | No       | false      | See the MessageBar `disabled` option.    |
| lang        | string  | No       | "global"   | See the MessageBar `lang` option.        |

### Events
---
| Event | Arguments | Description                       |
|:-----:|:---------:|:---------------------------------:|
| close |           | See the component `close` option. |

### Slots
---

1. Msg





```vue
<template v-slot:msg>
    <span>Normal content <span class="header">Header content</span><a>Link</a></span>
</template>
```

2. Control




```vue
<template v-slot:control="x">
    <fv-button @click="x.cancel()">Yes</fv-button>
</template>
```

### Toast
---

```javascript
this.$barWarning(msg, options = {
    status: 'default',
    showControl: false,
    showClose: true,
    control: null,
    mode: 'fixed',
    autoClose: 3000
});

control_panel: x => h() // 传入具名插槽属性参数的函数, 函数返回值为$createElement函数
```

```javascript
this.$swiftWarning(element, options = {
    color: "rgba(173, 38, 45, 1)",
    replaceTitle: "Swift Warning"
});
```
