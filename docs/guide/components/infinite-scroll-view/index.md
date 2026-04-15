---
page: true
title: InfiniteScrollView
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### InfiniteScrollView-DEMO
---

<script>
export default {
    data () {
        return {
            value: [

            ]
        }
    },
    mounted () {
        for (let i = 0; i < new Date().getFullYear(); i++)
            this.value.push(i + 1);
    }
}
</script>




<ClientOnly>
<fv-InfiniteScrollView v-model="value">
</fv-InfiniteScrollView>
</ClientOnly>

```vue
<fv-InfiniteScrollView v-model="value">
</fv-InfiniteScrollView>
```


### Properties
---
| Property   | Type    | Required | Default  | Description                                                              |
|:----------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue | array   | No       | []       | See the InfiniteScrollView `modelValue` option.                          |
| batchSize  | number  | No       | 30       | See the InfiniteScrollView `batchSize` option.                           |
| offset     | number  | No       | 100      | See the InfiniteScrollView `offset` option.                              |
| static     | boolean | No       | false    | See the InfiniteScrollView `static` option.                              |
| theme      | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled   | boolean | No       | false    | See the InfiniteScrollView `disabled` option.                            |
| lang       | string  | No       | "global" | See the InfiniteScrollView `lang` option.                                |


### Events
---
| Event      | Arguments | Description                            |
|:----------:|:---------:|:--------------------------------------:|
| lazyload   | boolean   | See the component `lazyload` option.   |
| init-start | N/A       | See the component `init-start` option. |
| init-end   | N/A       | See the component `init-end` option.   |

### Slots

---

1. Default



```vue
<slot :thisValue="thisValue" :dynamicValue="dynamicValue">
    <p v-for="(item, index) in dynamicValue" :key="index">{{item}}</p>
</slot>
```




```
<template v-slot:default="x">
    <p v-for="(item, index) in x.dynamicValue" :key="index">{{item}}</p>
</template>
```
