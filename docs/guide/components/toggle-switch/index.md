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

### Properties
---
| Property           | Type    | Required | Default  | Description                                                              |
|:------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue         | boolean | No       | false    | Toggleswitch value                                                       |
| on                 | string  | No       | 'On'     | Toggleswitch content when value is true                                  |
| off                | string  | No       | 'Off'    | Toggleswitch content when value is false                                 |
| onForeground       | string  | No       | ''       | Toggleswitch content foreground when value is true                       |
| offForeground      | string  | No       | ''       | Toggleswitch content foreground when value is false                      |
| borderColor        | string  | No       | ''       |                                                                          |
| width              | number  | No       | 40       |                                                                          |
| height             | number  | No       | 20       |                                                                          |
| insideContent      | boolean | No       | false    |                                                                          |
| ringBackground     | string  | No       | ''       |                                                                          |
| switchOnBackground | string  | No       | ''       |                                                                          |
| disabled           | boolean | No       | false    |                                                                          |
| theme              | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang               | string  | No       | "global" | See the ToggleSwitch `lang` option.                                      |

### Events
---
| Event  | Arguments | Description |
|:------:|:---------:|:-----------:|
| toggle | value     |             |
