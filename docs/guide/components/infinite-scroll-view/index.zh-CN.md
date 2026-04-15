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


### 属性
---
| 属性       | 类型    | 必填  | 默认值   | 说明                                                             |
|:----------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| modelValue | array   | 否    | []       | 要装载的数组。                                                   |
| batchSize  | number  | 否    | 30       | 动态加载的每一批次大小。                                         |
| offset     | number  | 否    | 100      | 滚动加载偏移量。                                                 |
| static     | boolean | 否    | false    | 是否取消动态加载。                                               |
| theme      | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled   | boolean | 否    | false    | 参见组件的 `disabled` 选项。                                     |
| lang       | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |


### 事件
---
| 事件名     | 参数    | 说明                                                 |
|:----------:|:-------:|:----------------------------------------------------:|
| lazyload   | boolean | 动态加载时触发此事件，返回当前加载批次数据是否为空。 |
| init-start | N/A     | 初始化加载开始。                                     |
| init-end   | N/A     | 初始化加载结束。                                     |

### 插槽

---

1. Default

默认模板, 可将`InfiniteScrollView`当作`Div`来使用

```vue
<slot :thisValue="thisValue" :dynamicValue="dynamicValue">
    <p v-for="(item, index) in dynamicValue" :key="index">{{item}}</p>
</slot>
```

- thisValue: 传入数组
- dynamicValue: 已动态加载的数组

```
<template v-slot:default="x">
    <p v-for="(item, index) in x.dynamicValue" :key="index">{{item}}</p>
</template>
```
