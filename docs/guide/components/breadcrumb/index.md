---
page: true
title: Breadcrumb
---


<!-- lang-switch -->
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
<fv-Breadcrumb
    modelValue="/creatorsn/vfluent/breadcrumb"
    :readOnly="false"
    separator=">"
>
</fv-Breadcrumb>
```

2. Icon

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" separator="ChevronRightMed">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb
    modelValue="/creatorsn/vfluent/breadcrumb"
    :readOnly="false"
    separator="ChevronRightMed"
>
</fv-Breadcrumb>
```

### Breadcrumb-Hide Root

---

<ClientOnly>
<fv-Breadcrumb modelValue="/creatorsn/vfluent/breadcrumb" :readOnly="false" :showRoot="false">
</fv-Breadcrumb>
</ClientOnly>

```vue
<fv-Breadcrumb
    modelValue="/creatorsn/vfluent/breadcrumb"
    :readOnly="false"
    :showRoot="false"
>
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
<fv-Breadcrumb
    modelValue="/creatorsn/vfluent/breadcrumb"
    :readOnly="false"
    disabled
>
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

### Properties

---

| Property      | Type    | Required | Default            | Description                                                              |
|:-------------:|:-------:|:--------:|:------------------:|:------------------------------------------------------------------------:|
| modelValue    | string  | No       | ''                 | String path.                                                             |
| separator     | string  | No       | '/'                | Separator display, either text or an icon.                               |
| separatorChar | string  | No       | '/'                | Character used to split the path.                                        |
| showRoot      | boolean | No       | true               | Whether to show the root icon.                                           |
| rootIcon      | string  | No       | 'FolderHorizontal' | Root icon.                                                               |
| readOnly      | boolean | No       | true               | Whether the component is read-only.                                      |
| borderColor   | string  | No       | ''                 |                                                                          |
| fontSize      | string  | No       | '16px'             |                                                                          |
| disabled      | boolean | No       | false              |                                                                          |
| borderRadius  | number  | No       | 6                  |                                                                          |
| theme         | string  | No       | 'global'           | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| debounceDelay | number  | No       | 300                | See the Breadcrumb `debounceDelay` option.                               |
| lang          | string  | No       | "global"           | See the Breadcrumb `lang` option.                                        |

### Events

---

| Event          | Arguments | Description                                |
|:--------------:|:---------:|:------------------------------------------:|
| input-change   | string    | See the component `input-change` option.   |
| debounce-input | string    | See the component `debounce-input` option. |
| root-click     | object    | See the component `root-click` option.     |
| item-click     | object    | See the component `item-click` option.     |

### Slots

---

1. root







```vue
<template v-slot:root="x">
    <i
        class="fv-bc-separator-content ms-Icon"
        :class="[`ms-Icon--${x.rootIcon}`]"
    ></i>
    <i
        class="fv-bc-separator-icon ms-Icon"
        :class="[x.separatorIcon ? `ms-Icon--${x.separator}` : '']"
        >{{ x.separatorIcon ? '' : x.separator }}</i
    >
</template>
```

2. route-item






```vue
<template v-slot:route-item="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
