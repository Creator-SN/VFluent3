---
page: true
title: Collapse
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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

### Properties

---
| Property         | Type    | Required | Default                            | Description                                                              |
|:----------------:|:-------:|:--------:|:----------------------------------:|:------------------------------------------------------------------------:|
| modelValue       | boolean | No       | false                              | See the Collapse `modelValue` option.                                    |
| icon             | string  | No       | 'Mail'                             | Icon with Fabric-Icon                                                    |
| title            | string  | No       | 'Title of Collapse.'               | Title.                                                                   |
| content          | string  | No       | 'Content information of Collapse.' | Subtitle content.                                                        |
| background       | string  | No       | ''                                 | See the Collapse `background` option.                                    |
| defaultHeight    | number  | No       | 70                                 | See the Collapse `defaultHeight` option.                                 |
| maxHeight        | number  | No       | 300                                | See the Collapse `maxHeight` option.                                     |
| disabledCollapse | boolean | No       | false                              | See the Collapse `disabledCollapse` option.                              |
| visibleOverflow  | boolean | No       | true                               | See the Collapse `visibleOverflow` option.                               |
| theme            | string  | No       | 'global'                           | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled         | boolean | No       | false                              | See the Collapse `disabled` option.                                      |
| lang             | string  | No       | "global"                           | See the Collapse `lang` option.                                          |

### Events

---
| Event            | Arguments | Description                                  |
|:----------------:|:---------:|:--------------------------------------------:|
| item-click       | boolean   | See the component `item-click` option.       |
| descrption-click | N/A       | See the component `descrption-click` option. |
| icon-click       | N/A       | See the component `icon-click` option.       |
| left-icon-click  | N/A       | See the component `left-icon-click` option.  |
  

### Slots

---

1. Default



```vue
<fv-Collapse background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Collapse>
```

2. icon



```vue
<template v-slot:icon="x">
    <i class="ms-Icon" :class="[`ms-Icon--${x.icon}`]"></i>
</template>
```

3. container



* title: Collapse


```vue
<template v-slot:container="x">
    <div class="collapse-title">{{ x.title }}</div>
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

4. Extension



```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```

5. title



* title: Collapse

```vue
<template v-slot:title="x">
    <div class="collapse-title">{{ x.title }}</div>
</template>
```

6. content





```vue
<template v-slot:content="x">
    <div class="collapse-info">{{ x.content }}</div>
</template>
```

7. expand-icon






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
