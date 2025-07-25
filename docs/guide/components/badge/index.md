---
page: true
title: Badge
--- 
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



### Propoties
---
| 属性(attr) |                          类型(type)                           | 必填(required) | 默认值(default) |         说明(statement)         |
| :--------: | :-----------------------------------------------------------: | :------------: | :-------------: | :-----------------------------: |
| modelValue |                        [string,number]                        |      Yes       |       N/A       |                                 |
|    max     |                            Number                             |       No       |    Infinity     |                                 |
|   isDot    |                            Boolean                            |       No       |      false      |                                 |
|   hidden   |                            Boolean                            |       No       |      false      |                                 |
|    type    | ['primary','success','warning','danger','info',string(color)] |       No       |     default     | `Badge`类型, 可以输入颜色字符串 |

### Slot
---
1. Default

```javascript
<fv-badge>
    <div></div>
</fv-badge>
```