---
page: true
title: ProgressBar
--- 

<!-- lang-switch -->
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



### 属性
---
| 属性         | 类型    | 必填  | 默认值   | 说明                         |
|:------------:|:-------:|:-----:|:--------:|:----------------------------:|
| modelValue   | number  | 否    | 0        | Progressbar value            |
| loading      | boolean | 否    | false    | Is progressbar indeterminate |
| foreground   | string  | 否    | ''       |                              |
| background   | string  | 否    | ''       |                              |
| borderRadius | number  | 否    | 2        |                              |
| disabled     | boolean | 否    | false    |                              |
| theme        | string  | 否    | 'global' | 参见组件的 `theme` 选项。    |
| lang         | string  | 否    | "global" | 参见组件的 `lang` 选项。     |

### 事件
---
| 事件名            | 参数    | 说明  |
|:-----------------:|:-------:|:-----:|
| progress-change   | percent |       |
| progress-finished | percent |       |
