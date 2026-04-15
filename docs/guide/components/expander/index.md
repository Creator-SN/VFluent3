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

### Properties

---
| Property         | Type    | Required | Default                            | Description                                                              |
|:----------------:|:-------:|:--------:|:----------------------------------:|:------------------------------------------------------------------------:|
| modelValue       | boolean | No       | false                              | See the Expander `modelValue` option.                                    |
| icon             | string  | No       | 'Mail'                             | Icon with Fabric-Icon                                                    |
| title            | string  | No       | 'Title of Expander.'               | Title.                                                                   |
| content          | string  | No       | 'Content information of Expander.' | Subtitle content.                                                        |
| titleBackground  | string  | No       | ''                                 | See the Expander `titleBackground` option.                               |
| expandBackground | string  | No       | ''                                 | See the Expander `expandBackground` option.                              |
| defaultHeight    | number  | No       | 50                                 | See the Expander `defaultHeight` option.                                 |
| maxHeight        | number  | No       | 300                                | See the Expander `maxHeight` option.                                     |
| disabled         | boolean | No       | false                              | See the Expander `disabled` option.                                      |
| visibleOverflow  | boolean | No       | true                               | See the Expander `visibleOverflow` option.                               |
| theme            | string  | No       | 'global'                           | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabledExpander | boolean | No       | false                              | See the Expander `disabledExpander` option.                              |
| lang             | string  | No       | "global"                           | See the Expander `lang` option.                                          |

### Events

---
| Event            | Arguments | Description                                  |
|:----------------:|:---------:|:--------------------------------------------:|
| item-click       | boolean   | See the component `item-click` option.       |
| descrption-click | N/A       | See the component `descrption-click` option. |
| icon-click       | N/A       | See the component `icon-click` option.       |
  

### Slots

---

1. Default



```vue
<fv-Expander background="rgba(0, 98, 158, 1)">
    <div style="position: relative; height: 500px; background: black; transition: all 0.3s;"></div>
</fv-Expander>
```

2. content



* title: Expander


```vue
<template v-slot:content="x">
    <div class="expander-title">{{ x.title }}</div>
    <div class="expander-info">{{ x.content }}</div>
</template>
```

3. Extension



```vue
<template v-slot:extension>
    <fv-button>Operation</fv-button>
</template>
```


4. expand-icon






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
