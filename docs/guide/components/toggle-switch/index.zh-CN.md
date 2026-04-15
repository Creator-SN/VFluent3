---
page: true
title: ToggleSwitch
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### ToggleSwitch-DEMO
--- 


<ClientOnly>


<fv-ToggleSwitch>
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch>
</fv-ToggleSwitch>
```

### ToggleSwitch Disabled
---

<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch disabled>
</fv-ToggleSwitch>
```

### ToggleSwitch Dark Theme
---
<div style="background: black;">

<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>
</div>

```vue
<fv-ToggleSwitch theme="dark">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Content
---

<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch on="开" off="关">
</fv-ToggleSwitch>
```

### ToggleSwitch Inside Content
---

<fv-ToggleSwitch width="50" on="开" off="关" :insideContent="true">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch width="50" on="开" off="关" :insideContent="true">
</fv-ToggleSwitch>
```

### ToggleSwitch Custom Style
---

<fv-ToggleSwitch borderColor="rgba(0,204,153,1)" ringBackground="rgba(0,204,153,1)" onForeground="rgba(0,204,153,1)" offForeground="rgba(0,204,153,1)" switchOnBackground="rgba(0,204,153,1)">
</fv-ToggleSwitch>

```vue
<fv-ToggleSwitch borderColor="rgba(0,204,153,1)" ringBackground="rgba(0,204,153,1)" onForeground="rgba(0,204,153,1)" offForeground="rgba(0,204,153,1)" switchOnBackground="rgba(0,204,153,1)">
</fv-ToggleSwitch>
```

</ClientOnly>

### 属性
---
| 属性               | 类型    | 必填  | 默认值   | 说明                                                             |
|:------------------:|:-------:|:-----:|:--------:|:----------------------------------------------------------------:|
| modelValue         | boolean | 否    | false    | Toggleswitch value                                               |
| on                 | string  | 否    | 'On'     | Toggleswitch content when value is true                          |
| off                | string  | 否    | 'Off'    | Toggleswitch content when value is false                         |
| onForeground       | string  | 否    | ''       | Toggleswitch content foreground when value is true               |
| offForeground      | string  | 否    | ''       | Toggleswitch content foreground when value is false              |
| borderColor        | string  | 否    | ''       |                                                                  |
| width              | number  | 否    | 40       |                                                                  |
| height             | number  | 否    | 20       |                                                                  |
| insideContent      | boolean | 否    | false    |                                                                  |
| ringBackground     | string  | 否    | ''       |                                                                  |
| switchOnBackground | string  | 否    | ''       |                                                                  |
| disabled           | boolean | 否    | false    |                                                                  |
| theme              | string  | 否    | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang               | string  | 否    | "global" | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名 | 参数  | 说明  |
|:------:|:-----:|:-----:|
| toggle | value |       |
