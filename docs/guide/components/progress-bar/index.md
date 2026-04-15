---
page: true
title: ProgressBar
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### ProgressBar-DEMO
---

<script>
export default {
    data () {
        return {
            percent: [10,20,30,35]
        }
    },
    mounted () {
        setInterval(() => {
            for(let item of this.percent) {
                let index = this.percent.indexOf(item);
                this.percent[index] = Math.ceil(Math.random() * 100);
            }
        }, 3000);
    }
}
</script>


<ClientOnly>
<fv-ProgressBar>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar>
</fv-ProgressBar>
```

### Default ProgressBar
---

<ClientOnly>
<fv-ProgressBar v-model="percent[0]">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[0]">
</fv-ProgressBar>
```

### Indeterminate ProgressBar
---

<ClientOnly>
<fv-ProgressBar loading="true">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar loading="true">
</fv-ProgressBar>
```

### ProgressBar Disabled
---
1. Default

<ClientOnly>
<fv-ProgressBar v-model="percent[1]" disabled>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[1]" disabled>
</fv-ProgressBar>
```

2. Indeterminate

<ClientOnly>
<fv-ProgressBar loading="true" disabled>
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar loading="true" disabled>
</fv-ProgressBar>
```

### ProgressBar Custom Style
---
1. Custom Foreground

<ClientOnly>
<fv-ProgressBar v-model="percent[2]" foreground="rgba(0,204,153,1)">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[2]" foreground="rgba(0,204,153,1)">
</fv-ProgressBar>
```

2. Custom Background

<ClientOnly>
<fv-ProgressBar v-model="percent[3]" background="rgba(0,204,153,0.6)">
</fv-ProgressBar>
</ClientOnly>

```vue
<fv-ProgressBar v-model="percent[3]" background="rgba(0,204,153,0.6)">
</fv-ProgressBar>
```



### Properties
---
| Property     | Type    | Required | Default  | Description                         |
|:------------:|:-------:|:--------:|:--------:|:-----------------------------------:|
| modelValue   | number  | No       | 0        | Progressbar value                   |
| loading      | boolean | No       | false    | Is progressbar indeterminate        |
| foreground   | string  | No       | ''       |                                     |
| background   | string  | No       | ''       |                                     |
| borderRadius | number  | No       | 2        |                                     |
| disabled     | boolean | No       | false    |                                     |
| theme        | string  | No       | 'global' | See the ProgressBar `theme` option. |
| lang         | string  | No       | "global" | See the ProgressBar `lang` option.  |

### Events
---
| Event             | Arguments | Description |
|:-----------------:|:---------:|:-----------:|
| progress-change   | percent   |             |
| progress-finished | percent   |             |
