---
page: true
title: Pagination
--- 

<!-- lang-switch -->
### Pagination-DEMO
--- 




<ClientOnly>
<fv-Pagination>
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination>
</fv-Pagination>
```

### Pagination With Background
---


<ClientOnly>
<fv-Pagination background="whitesmoke">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination background="whitesmoke">
</fv-Pagination>
```

### Pagination With Boxshadow
---


<ClientOnly>
<fv-Pagination :total="100" background="whitesmoke" :shadow="true">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination :total="100" background="whitesmoke" :shadow="true">
</fv-Pagination>
```

### Pagination Small Size
---


<ClientOnly>
<fv-Pagination :small="true">
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination :small="true">
</fv-Pagination>
```

### Pagination Disabled
---


<ClientOnly>
<fv-Pagination disabled>
</fv-Pagination>
</ClientOnly>

```vue
<fv-Pagination disabled>
</fv-Pagination>
```

### Pagination Dark Theme
---

<div style="padding: 10px 0px; background: black;">
    
<ClientOnly>
<fv-Pagination theme="dark" background="black">
  </fv-Pagination>
</ClientOnly>
</div>

```vue
<fv-Pagination theme="dark" background="black">
</fv-Pagination>
```


### Properties
---
| Property              | Type    | Required | Default                                                         | Description                                                              |
|:---------------------:|:-------:|:--------:|:---------------------------------------------------------------:|:------------------------------------------------------------------------:|
| modelValue            | number  | No       | 1                                                               | See the Pagination `modelValue` option.                                  |
| foreground            | string  | No       | 'rgba(0, 90, 158, 1)'                                           |                                                                          |
| background            | string  | No       | 'transparent'                                                   |                                                                          |
| borderRadius          | number  | No       | 3                                                               | See the Pagination `borderRadius` option.                                |
| revealBackgroundColor | string  | No       | ''                                                              | See the Pagination `revealBackgroundColor` option.                       |
| revealBorderColor     | string  | No       | ''                                                              | See the Pagination `revealBorderColor` option.                           |
| total                 | number  | No       | 10                                                              | See the Pagination `total` option.                                       |
| maxVisual             | number  | No       | 7                                                               | See the Pagination `maxVisual` option.                                   |
| small                 | boolean | No       | false                                                           | See the Pagination `small` option.                                       |
| shadow                | boolean | No       | false                                                           |                                                                          |
| disabled              | boolean | No       | false                                                           |                                                                          |
| theme                 | string  | No       | 'global'                                                        | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| emits                 | array   | No       | ['update:modelValue', 'next-click', 'prev-click', 'page-click'] | See the Pagination `emits` option.                                       |
| lang                  | string  | No       | "global"                                                        | See the Pagination `lang` option.                                        |

### Events
---
| Event      | Arguments | Description                            |
|:----------:|:---------:|:--------------------------------------:|
| next-click | number    | See the component `next-click` option. |
| prev-click | number    | See the component `prev-click` option. |
| page-click | number    | See the component `page-click` option. |
