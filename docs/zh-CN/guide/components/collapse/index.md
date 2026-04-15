---
page: true
title: Collapse
--- 

<!-- lang-switch -->
### Collapse-DEMO
--- 

<div>    
<ClientOnly>
<fv-Collapse>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse>
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

Disabled Collapse

<div>
<ClientOnly>
<fv-Collapse :disabledCollapse="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse :disabledCollapse="true">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

Extension

<div>
<ClientOnly>
<fv-Collapse :disabledCollapse="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse :disabledCollapse="true">
    <template v-slot:extension>
        <fv-button>Operation</fv-button>
    </template>
</fv-Collapse>
```

### Collapse-Customize Background

---

<div>
<ClientOnly>
<fv-Collapse background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

### Collapse-Dark Theme

---

<div>
<ClientOnly>
<fv-Collapse theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Collapse>
</ClientOnly>
</div>

```vue
<fv-Collapse theme="dark">
    <div style="position: relative; height: 500px; background: whitesmoke; transition: all 0.3s;"></div>
</fv-Collapse>
```

### 属性

---
| 属性             | 类型    | 必填  | 默认值                             | 说明                                                             |
|:----------------:|:-------:|:-----:|:----------------------------------:|:----------------------------------------------------------------:|
| modelValue       | boolean | 否    | false                              | 是否展开 `Collapse`                                              |
| icon             | string  | 否    | 'Mail'                             | Icon with Fabric-Icon                                            |
| title            | string  | 否    | 'Title of Collapse.'               | 标题。                                                           |
| content          | string  | 否    | 'Content information of Collapse.' | 副标题信息。                                                     |
| background       | string  | 否    | ''                                 | 客制化 `Collapse` 背景。                                         |
| defaultHeight    | number  | 否    | 70                                 | 默认高度。                                                       |
| maxHeight        | number  | 否    | 300                                | 展开最大高度。                                                   |
| disabledCollapse | boolean | 否    | false                              | 禁用展开 `Collapse`                                              |
| visibleOverflow  | boolean | 否    | true                               | 在禁用展开 `Collapse` ，允许overflow内容显示。                   |
| theme            | string  | 否    | 'global'                           | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled         | boolean | 否    | false                              | 参见组件的 `disabled` 选项。                                     |
| lang             | string  | 否    | "global"                           | 参见组件的 `lang` 选项。                                         |

### 事件

---
| 事件名           | 参数    | 说明                                |
|:----------------:|:-------:|:-----------------------------------:|
| item-click       | boolean | 返回 `Collapse` 属性 `value` 的值。 |
| descrption-click | N/A     | 描述框点击。                        |
| icon-click       | N/A     | 右侧图标点击。                      |
| left-icon-click  | N/A     | 左侧图标点击。                      |
  

### 插槽

---

1. Default

定义下拉内容

```vue
<fv-Collapse background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

2. icon

自定义 `Collapse` 显示图标

```vue
<template v-slot:icon="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

3. container

自定义内容, 如果只需要单独修改标题 `title` 或副标题 `content` , 可使用下面的 `template` 进行自定义

* title: Collapse
* contnet: 副标题

```vue
<template v-slot:container="x">
    <div class="collapse-title">{{ x.title }}</div>
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

4. Extension

扩展操作内容

```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```

5. title

自定义标题

* title: Collapse

```vue
<template v-slot:title="x">
    <div class="collapse-title">{{ x.title }}</div>
</template>
```

6. content

自定义副标题

* content: 副标题

```vue
<template v-slot:content="x">
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

7. expand-icon

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
        v-show="!x.value && !x.disabledCollapse"
        class="ms-Icon ms-Icon--ChevronDownMed"
    ></i>
    <i
        v-show="!x.value && x.disabledCollapse"
        class="ms-Icon ms-Icon--ChevronRightMed"
    ></i>
</template>
```
