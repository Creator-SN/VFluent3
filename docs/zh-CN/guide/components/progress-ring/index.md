---
page: true
title: ProgressRing
--- 

<!-- lang-switch -->
### ProgressRing-DEMO
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
<fv-progressRing loading="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

<ClientOnly>
<fv-progressRing loading="true" r="20" borderWidth="5">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true" r="20" borderWidth="5">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing loading="true" r="10" borderWidth="2">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true" r="10" borderWidth="2">
</fv-progressRing>
```

### Default ProgressRing
---

<ClientOnly>
<fv-progressRing v-model="percent[0]">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing v-model="percent[0]" r="20" borderWidth="5">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]" r="20" borderWidth="5">
</fv-progressRing>
```


<ClientOnly>
<fv-progressRing v-model="percent[0]" r="10" borderWidth="2">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[0]" r="10" borderWidth="2">
</fv-progressRing>
```

### Indeterminate ProgressRing
---

<ClientOnly>
<fv-progressRing loading="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing loading="true">
</fv-progressRing>
```

### ProgressRing Legacy
---

<ClientOnly>
<fv-progressRing :legacy="true">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing :legacy="true">
</fv-progressRing>
```

### Different Size(Legacy)
---

<ClientOnly>
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>


<ClientOnly>
<fv-progressRing size="m" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>

```vue

<ClientOnly>
<fv-progressRing size="xs" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="s" :legacy="true">
</fv-progressRing>


<ClientOnly>
<fv-progressRing size="m" :legacy="true">
</fv-progressRing>
</ClientOnly>

<fv-progressRing size="l" :legacy="true">
</fv-progressRing>
```

### ProgressBar Custom Style
---
1. Custom Foreground

<ClientOnly>
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[2]" color="rgba(0, 204, 153, 1)">
</fv-progressRing>
```

2. Custom Background

<ClientOnly>
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>
</ClientOnly>

```vue
<fv-progressRing v-model="percent[3]" background="rgba(0, 204, 153, 0.6)">
</fv-progressRing>
```



### 属性
---
| 属性        | 类型    | 必填  | 默认值                   | 说明                                                     |
|:-----------:|:-------:|:-----:|:------------------------:|:--------------------------------------------------------:|
| modelValue  | number  | 否    | 0                        | progressRing value                                       |
| size        | string  | 否    | 'xs'                     | The size of progress ring，only works on legacy versions |
| r           | number  | 否    | 40                       | Radius of the ProgressRing                               |
| loading     | boolean | 否    | false                    | Is progressRing indeterminate                            |
| color       | string  | 否    | 'rgba(0, 90, 158, 1)'    | The color of progress ring                               |
| background  | string  | 否    | 'rgba(204, 204, 204, 1)' |                                                          |
| borderWidth | number  | 否    | 8                        |                                                          |
| legacy      | boolean | 否    | false                    | Use the legacy version of ProgressRing                   |
| theme       | string  | 否    | 'global'                 | 参见组件的 `theme` 选项。                                |
| disabled    | boolean | 否    | false                    | 参见组件的 `disabled` 选项。                             |
| lang        | string  | 否    | "global"                 | 参见组件的 `lang` 选项。                                 |
