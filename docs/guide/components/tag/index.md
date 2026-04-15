---
page: true
title: Tag
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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



### Properties
---
| Property          | Type    | Required | Default   | Description                                                              |
|:-----------------:|:-------:|:--------:|:---------:|:------------------------------------------------------------------------:|
| modelValue        | array   | No       | []        | Tag list.                                                                |
| newTagPlaceholder | string  | No       | 'New Tag' | NewTag Placeholder                                                       |
| size              | string  | No       | ''        | See the Tag `size` option.                                               |
| newTagBackground  | any     | No       | null      | See the Tag `newTagBackground` option.                                   |
| fontSize          | number  | No       | 12        | Font size.                                                               |
| borderRadius      | number  | No       | 6         | Border radius.                                                           |
| isNewTag          | boolean | No       | false     | Whether to enable NewTag.                                                |
| isDel             | boolean | No       | false     | Whether to enable the delete button.                                     |
| theme             | string  | No       | 'global'  | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled          | boolean | No       | false     | See the Tag `disabled` option.                                           |
| lang              | string  | No       | "global"  | See the Tag `lang` option.                                               |

### Events
---
| Event     | Arguments | Description                                              |
|:---------:|:---------:|:--------------------------------------------------------:|
| tag-click | object    | Emitted when a tag is clicked; returns the clicked item. |
| add-item  | object    | Emitted when a tag is added; returns the added item.     |
| del-item  | object    | Emitted when a tag is deleted; returns the deleted item. |

### Slots
---
1. Default

```javascript
<fv-tag>
    Content
</fv-tag>
```
