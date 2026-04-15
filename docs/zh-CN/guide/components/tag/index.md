---
page: true
title: Tag
--- 

<!-- lang-switch -->
### Tag-DEMO
--- 



<ClientOnly>
<fv-Tag :modelValue="[{text: 'default', type: 'default' }]">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :modelValue="[{text: 'default', type: 'default' }]">
</fv-Tag>
```

### Tag Different Types
---


<ClientOnly>
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Customize Color
---


<ClientOnly>
<fv-Tag :modelValue="[{text: 'blue', type: 'default', background: 'rgba(0, 98, 158, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :modelValue="[{text: 'blue', type: 'default', background: 'rgba(0, 98, 158, 1)' }, {text: 'black', type: 'success', background: 'rgba(0, 0, 0, 1)' }, {text: 'pink', type: 'warning', background: 'pink' }]">
</fv-Tag>
```

### Tag-Disabled 


<ClientOnly>
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'disabled', type: 'success',  disabled: true }, {text: 'warning', type: 'warning' }]" :isDel="true" :isNewTag="true">
</fv-Tag>
```

### Tag Dark Theme
---


<ClientOnly>
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>
</ClientOnly>

```vue
<fv-Tag :modelValue="[{text: 'default', type: 'default' }, {text: 'success', type: 'success' }, {text: 'warning', type: 'warning' }, {text: 'error', type: 'error' }]" theme="dark">
</fv-Tag>
```



### 属性
---
| 属性              | 类型    | 必填  | 默认值    | 说明                                                             |
|:-----------------:|:-------:|:-----:|:---------:|:----------------------------------------------------------------:|
| modelValue        | array   | 否    | []        | 标签数组。                                                       |
| newTagPlaceholder | string  | 否    | 'New Tag' | NewTag Placeholder                                               |
| size              | string  | 否    | ''        | 尺寸`normal`，`medium`，`small`，`xsmall`                        |
| newTagBackground  | any     | 否    | null      | NewTag按钮背景色。                                               |
| fontSize          | number  | 否    | 12        | 字体大小。                                                       |
| borderRadius      | number  | 否    | 6         | 圆角大小。                                                       |
| isNewTag          | boolean | 否    | false     | 是否启用NewTag                                                   |
| isDel             | boolean | 否    | false     | 是否启用删除按钮。                                               |
| theme             | string  | 否    | 'global'  | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled          | boolean | 否    | false     | 参见组件的 `disabled` 选项。                                     |
| lang              | string  | 否    | "global"  | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名    | 参数   | 说明                         |
|:---------:|:------:|:----------------------------:|
| tag-click | object | 标签点击时触发并返回点击项。 |
| add-item  | object | 添加标签时触发并返回添加项。 |
| del-item  | object | 删除标签时触发并返回删除项。 |

### 插槽
---
1. Default

```javascript
<fv-tag>
    Content
</fv-tag>
```
