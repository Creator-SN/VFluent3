---
page: true
title: Breadcrumb
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const modelValue = ref("/creatorsn/vfluent/breadcrumb")


</script>

### Breadcrumb-DEMO
--- 

Basic


<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb">
</fv-Breadcrumb>
```

### Breadcrumb-Editable
---

<ClientOnly>
<fv-Breadcrumb v-model="modelValue" :readOnly="false">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb v-model="modelValue" :readOnly="false">
</fv-Breadcrumb>
```

### Breadcrumb-Custom Icon
---

1. Char

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator=">">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator=">">
</fv-Breadcrumb>
```

2. Icon

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator="ChevronRightMed">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator="ChevronRightMed">
</fv-Breadcrumb>
```

### Breadcrumb-Hide Root
---

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" :showRoot="false">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" :showRoot="false">
</fv-Breadcrumb>
```

### Breadcrumb-Dark Theme
---

<div style="padding: 8px; background: black;">
<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false">
</fv-Breadcrumb>
</ClientOnly>
</div>

```vue
<div style="padding: 8px; background: black;">
    <fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false">
    </fv-Breadcrumb>
</div>
```

### Breadcrumb-Dark Disabled
---
1. Light

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" disabled>
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" disabled>
</fv-Breadcrumb>
```

2. Dark

<div style="padding: 8px; background: black;">
<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false" disabled>
</fv-Breadcrumb>
</ClientOnly>
</div>

```vue
<div style="padding: 8px; background: black;">
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" theme="dark" :readOnly="false" disabled>
</fv-Breadcrumb>
</div>
```


### Propoties
---
|  属性(attr)   |   类型(type)    | 必填(required) | 默认值(default)  |                      说明(statement)                      |
|:-------------:|:---------------:|:--------------:|:----------------:|:---------------------------------------------------------:|
|  modelValue   |     String      |       No       |       N/A        |                        字符串路径                         |
|   separator   |     String      |       No       |        /         |               分隔符显示, 可以是字符或图标                |
| separatorChar |     String      |       No       |        /         |                    以什么字符分割路径                     |
|   showRoot    |     Boolean     |       No       |       true       |                        显示根图标                         |
|   rootIcon    |     String      |       No       | FolderHorizontal |                          根图标                           |
|   readOnly    |     Boolean     |       No       |       true       |                         是否只读                          |
|  borderColor  | [string(color)] |       No       |       N/A        |                                                           |
|   disabled    |     Boolean     |       No       |      false       |                                                           |
| borderRadius  |     Number      |       No       |        2         |                                                           |
|     theme     |     String      |       No       |      system      | 主题样式, 包含`light`, `dark`, `system`, `custom`几种样式 |


### Events
---
| 事件名(Name) | 参数类型(args) | 说明(statement) |
|:------------:|:--------------:|:---------------:|
|  root-click  |     object     | 单击根图标触发  |
|  item-click  |     object     | 单击路由项触发  |
  

### Slot

---

1. root

定义下拉内容

- rootIcon: 根图标
- separatorIcon: 分割图标
- separator: 分隔符

```vue
<template v-slot:root="x">
    <i class="fv-bc-separator-content ms-Icon" :class="[`ms-Icon--${x.rootIcon}`]"></i>
    <i class="fv-bc-separator-icon ms-Icon" :class="[x.separatorIcon ? `ms-Icon--${x.separator}` : '']">{{x.separatorIcon ? '' : x.separator}}</i>
</template>
```

2. route-item

自定义`Collapse`显示图标

- item: 当前项
- index: 当前索引

```vue
<template v-slot:route-item="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
