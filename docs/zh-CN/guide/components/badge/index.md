---
page: true
title: Badge
--- 

<!-- lang-switch -->
### Badge-DEMO
---

<ClientOnly>
<fv-Badge :modelValue="3">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge :modelValue="3">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Different Type
---

Success
<ClientOnly>
<fv-Badge :modelValue="12" type="success">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge :modelValue="12" type="success">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

Warning

<ClientOnly>
<fv-Badge :modelValue="2" type="warning">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge :modelValue="2" type="warning">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

Primary
<ClientOnly>
<fv-Badge :modelValue="9" type="primary">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge :modelValue="9" type="primary">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Customize Content
---
<ClientOnly>
<fv-Badge modelValue="You">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge value="You">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Max Value
---
<ClientOnly>
<fv-Badge modelValue="100" max="99">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge modelValue="100" max="99">
    <fv-button>Badge</fv-button>
</fv-Badge>
```

### Badge Dot
---
<ClientOnly>
<fv-Badge :isDot="true">
<fv-button>Badge</fv-button>
</fv-Badge>
</ClientOnly>

```vue
<fv-Badge :isDot="true">
    <fv-button>Badge</fv-button>
</fv-Badge>
```



### 属性
---
| 属性       | 类型    | 必填  | 默认值    | 说明                              |
|:----------:|:-------:|:-----:|:---------:|:---------------------------------:|
| modelValue | string  | 否    | ''        |                                   |
| max        | any     | 否    | Infinity  |                                   |
| isDot      | boolean | 否    | false     |                                   |
| hidden     | boolean | 否    | false     |                                   |
| type       | string  | 否    | 'default' | `Badge`类型，可以输入颜色字符串。 |
| theme      | string  | 否    | 'global'  | 参见组件的 `theme` 选项。         |
| disabled   | boolean | 否    | false     | 参见组件的 `disabled` 选项。      |
| lang       | string  | 否    | "global"  | 参见组件的 `lang` 选项。          |

### 插槽
---
1. Default

```javascript
<fv-badge>
    <div></div>
</fv-badge>
```
