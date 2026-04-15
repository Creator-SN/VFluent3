---
page: true
title: Shimmer
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Shimmer-DEMO
--- 

Avatar with item

<div>
<ClientOnly>
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 5" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 35px; height: 35px; border-radius: 50%;"></div>
            <div class="sample" style="width: 80%; margin-left: 15px;"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 5" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 35px; height: 35px; border-radius: 50%;"></div>
            <div class="sample" style="width: 80%; margin-left: 15px;"></div>
        </div>
    </div>
</fv-Shimmer>
```

List items

<div>
    
<ClientOnly>
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${100 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${100 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
```

List items with two column

<div>
    
<ClientOnly>
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
            <div class="sample" style="width: 80%; height: 15px; margin-left: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
            <div class="sample" style="width: 80%; height: 15px; margin-left: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
```

### Shimmer-Dark Theme
--- 

Avatar with item

<div style="background: black;">
    
<ClientOnly>
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 5" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 35px; height: 35px; border-radius: 50%;"></div>
            <div class="sample" style="width: 80%; margin-left: 15px;"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 5" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 35px; height: 35px; border-radius: 50%;"></div>
            <div class="sample" style="width: 80%; margin-left: 15px;"></div>
        </div>
    </div>
</fv-Shimmer>
```

List items

<div style="background: black;">
    
<ClientOnly>
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${100 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${100 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
```

List items with two column

<div style="background: black;">
    
<ClientOnly>
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
            <div class="sample" style="width: 80%; height: 15px; margin-left: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
</ClientOnly>
</div>

```vue
<fv-Shimmer theme="dark" style="height: auto;">
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <div v-for="(item, index) in 3" :key="index" style="margin-top: 5px; display: flex; align-items: center;">
            <div class="sample" style="width: 80%; height: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
            <div class="sample" style="width: 80%; height: 15px; margin-left: 15px;" :style="{width: `${50 - index * 10}%`}"></div>
        </div>
    </div>
</fv-Shimmer>
```



### 属性
---
| 属性     | 类型    | 必填  | 默认值   | 说明                                                             |
|:--------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| theme    | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled | boolean | 否    | false    | 参见组件的 `disabled` 选项。                                     |
| lang     | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |

### 插槽
---
1. Default

默认样式为:

```vue
<div class="sample"></div>
```

自定义`Shimmer`内容时, 将要呈现Skeleton效果的元素加上`sample`类.

```javascript
<fv-shimmer>
    <div class="sample"></div>
</fv-shimmer>
```
