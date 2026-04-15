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



### Properties
---
| Property   | Type    | Required | Default   | Description                      |
|:----------:|:-------:|:--------:|:---------:|:--------------------------------:|
| modelValue | string  | No       | ''        |                                  |
| max        | any     | No       | Infinity  |                                  |
| isDot      | boolean | No       | false     |                                  |
| hidden     | boolean | No       | false     |                                  |
| type       | string  | No       | 'default' | See the Badge `type` option.     |
| theme      | string  | No       | 'global'  | See the Badge `theme` option.    |
| disabled   | boolean | No       | false     | See the Badge `disabled` option. |
| lang       | string  | No       | "global"  | See the Badge `lang` option.     |

### Slots
---
1. Default

```javascript
<fv-badge>
    <div></div>
</fv-badge>
```
