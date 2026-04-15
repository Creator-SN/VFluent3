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


### 属性
---
| 属性                  | 类型    | 必填  | 默认值                                                          | 说明                                                             |
|:---------------------:|:-------:|:-----:|:---------------------------------------------------------------:|:----------------------------------------------------------------:|
| modelValue            | number  | 否    | 1                                                               | 当前页码数。                                                     |
| foreground            | string  | 否    | 'rgba(0, 90, 158, 1)'                                           |                                                                  |
| background            | string  | 否    | 'transparent'                                                   |                                                                  |
| borderRadius          | number  | 否    | 3                                                               | 页码按钮圆角半径。                                               |
| revealBackgroundColor | string  | 否    | ''                                                              | 页码按钮`Reveal`背景颜色。                                       |
| revealBorderColor     | string  | 否    | ''                                                              | 页码按钮`Reveal`边框颜色。                                       |
| total                 | number  | 否    | 10                                                              | 总页码数。                                                       |
| maxVisual             | number  | 否    | 7                                                               | 最大可视按钮。                                                   |
| small                 | boolean | 否    | false                                                           | 小型分页按钮。                                                   |
| shadow                | boolean | 否    | false                                                           |                                                                  |
| disabled              | boolean | 否    | false                                                           |                                                                  |
| theme                 | string  | 否    | 'global'                                                        | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| emits                 | array   | 否    | ['update:modelValue', 'next-click', 'prev-click', 'page-click'] | 参见组件的 `emits` 选项。                                        |
| lang                  | string  | 否    | "global"                                                        | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名     | 参数   | 说明             |
|:----------:|:------:|:----------------:|
| next-click | number | 下一页按钮点击。 |
| prev-click | number | 上一页按钮点击。 |
| page-click | number | 翻页按钮点击。   |
