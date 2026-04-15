---
page: true
title: Expander
--- 

<!-- lang-switch -->
### Expander-DEMO
--- 

<div>    
<ClientOnly>
<fv-Expander>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
</ClientOnly>
</div>

```vue

<fv-Expander>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

Disabled Expander

<div>
<ClientOnly>
<fv-Expander :disabled="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander :disabled="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

Extension

<div>
<ClientOnly>
<fv-Expander :disabled="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander :disabled="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Expander>
```

### Expander-Customize Background

---

<div>
<ClientOnly>
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

### Expander-Dark Theme

---

<div>
<ClientOnly>
<fv-Expander theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Expander>
</ClientOnly>
</div>

```vue
<fv-Expander theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Expander>
```

### 属性

---
| 属性             | 类型    | 必填  | 默认值                             | 说明                                                             |
|:----------------:|:-------:|:-----:|:----------------------------------:|:----------------------------------------------------------------:|
| modelValue       | boolean | 否    | false                              | 是否展开 `Expander`                                              |
| icon             | string  | 否    | 'Mail'                             | Icon with Fabric-Icon                                            |
| title            | string  | 否    | 'Title of Expander.'               | 标题。                                                           |
| content          | string  | 否    | 'Content information of Expander.' | 副标题信息。                                                     |
| titleBackground  | string  | 否    | ''                                 | 客制化 `Expander` 背景。                                         |
| expandBackground | string  | 否    | ''                                 | 客制化 `Expander` 背景。                                         |
| defaultHeight    | number  | 否    | 50                                 | 默认高度。                                                       |
| maxHeight        | number  | 否    | 300                                | 展开最大高度。                                                   |
| disabled         | boolean | 否    | false                              | 禁用展开 `Expander`                                              |
| visibleOverflow  | boolean | 否    | true                               | 在禁用展开 `Expander` ，允许overflow内容显示。                   |
| theme            | string  | 否    | 'global'                           | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabledExpander | boolean | 否    | false                              | 参见组件的 `disabledExpander` 选项。                             |
| lang             | string  | 否    | "global"                           | 参见组件的 `lang` 选项。                                         |

### 事件

---
| 事件名           | 参数    | 说明                                |
|:----------------:|:-------:|:-----------------------------------:|
| item-click       | boolean | 返回 `Expander` 属性 `value` 的值。 |
| descrption-click | N/A     | 描述框点击。                        |
| icon-click       | N/A     | 右侧图标点击。                      |
  

### 插槽

---

1. Default

定义下拉内容

```vue
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

2. content

自定义内容

* title: Expander
* contnet: 副标题

```vue
<template v-slot:content="x">
    <div class="expander-title">{{ x.title }}</div>
    <div class="expander-info">{{ x.content }}</div>
</template>
```

3. Extension

扩展操作内容

```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```


4. expand-icon

自定义展开状态图标

* value: 当前是否展开
* disabledCollaspe: 是否禁用展开

```vue
<template v-slot:expand-icon="x">
    <i
        v-show="x.value"
        class="ms-Icon ms-Icon--ChevronUpMed"
    ></i>
    <i
        v-show="!x.value && !x.disabled"
        class="ms-Icon ms-Icon--ChevronDownMed"
    ></i>
    <i
        v-show="!x.value && x.disabled"
        class="ms-Icon ms-Icon--ChevronRightMed"
    ></i>
</template>
```
