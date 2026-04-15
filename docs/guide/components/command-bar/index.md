---
page: true
title: CommandBar
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### CommandBar-DEMO
---

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { name: "Add", icon: "Add", iconColor: "rgba(0, 90, 158, 1)", func: this.customFunc, secondary: [
                    { name: "Email Message", func: this.customFunc, icon: "Mail", iconColor: "rgba(0, 98, 158, 1)", disabled: true },
                    { type: "divider" },
                    { name: "Calendar event", func: this.customFunc, icon: "WebAppBuilderModule" }
                ]},
                { name: "Edit", func: this.customFunc, icon: "Edit", disabled: true },
                { type: "divider" },
                { name: "Share", background: "rgba(0, 90, 158, 1)", foreground: "white", func: this.customFunc, icon: "Share" },
                { type: "more", secondary: [
                    { name: "Move to", func: this.customFunc, icon: "MoveToFolder"},
                    { name: "Copy to", func: this.customFunc, icon: "Copy"},
                    { name: "Rename", func: this.customFunc, icon: "Rename"}
                ]}
            ]
        }
    },
    methods: {
        customFunc () {
            console.log(1);
        }
    }
}
</script>

<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar v-model="value" :options="options"></fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options"></fv-CommandBar>
</div>
```

Compact Mode
<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar v-model="value" :options="options" :compact="true"></fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options" :compact="true"></fv-CommandBar>
</div>
```


### CommandBar-Toward Up

---

<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar :options="options" toward="up"></fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" toward="up"></fv-CommandBar>
</div>
```

### CommandBar-Right Space

---

<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar v-model="value" :options="options">
    <template v-slot:right-space>
        <span style="width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
            <i class="ms-Icon ms-Icon--Error icon"></i>
        </span>
    </template>
</fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar v-model="value" :options="options">
        <template v-slot:right-space>
            <span style="width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
                <i class="ms-Icon ms-Icon--Error icon"></i>
            </span>
        </template>
    </fv-CommandBar>
</div>
```

### CommandBar-Dark Theme

---

<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar :options="options" theme="dark"></fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark"></fv-CommandBar>
</div>
```

### CommandBar-Custom Background

---

<div style="width: 100%;">
    
<ClientOnly>
<fv-CommandBar :options="options" theme="dark" background="rgba(0, 98, 158, 1)"></fv-CommandBar>
</ClientOnly>
</div>

```vue
<div style="width: 100%;">
    <fv-CommandBar :options="options" theme="dark" background="rgba(0, 98, 158, 1)"></fv-CommandBar>
</div>
```

### Properties

---

| Property              | Type    | Required | Default  | Description                                                              |
|:---------------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue            | object  | No       | {}       | See the CommandBar `modelValue` option.                                  |
| options               | array   | No       | []       | See the CommandBar `options` option.                                     |
| toward                | string  | No       | 'down'   | See the CommandBar `toward` option.                                      |
| background            | string  | No       | ''       | See the CommandBar `background` option.                                  |
| dropDownBackground    | string  | No       | ''       | See the CommandBar `dropDownBackground` option.                          |
| compact               | boolean | No       | false    | See the CommandBar `compact` option.                                     |
| revealBorderColor     | boolean | No       | false    |                                                                          |
| revealBackgroundColor | boolean | No       | false    |                                                                          |
| itemBorderRadius      | number  | No       | 6        | See the CommandBar `itemBorderRadius` option.                            |
| theme                 | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled              | boolean | No       | false    | See the CommandBar `disabled` option.                                    |
| lang                  | string  | No       | "global" | See the CommandBar `lang` option.                                        |

### Events

---

| Event      | Arguments | Description                            |
|:----------:|:---------:|:--------------------------------------:|
| item-click | object    | See the component `item-click` option. |

### Slots

---

1. Right Space (right-space)



```vue
<template v-slot:right-space>
  <i></i>
</template>
```

2. Option Item (optionItem)






```vue
<template v-slot:optionItem="{ item, valueTrigger }">
  <span>{{ valueTrigger(item.name) }}</span>
</template>
```

3. List Item (listItem)







```vue
<template v-slot:listItem="x">
    <i
        v-show="valueTrigger(x.item.icon) !== undefined"
        class="ms-Icon icon"
        :class="[
            `ms-Icon--${valueTrigger(x.item.icon)}`
        ]"
        :style="{
            color: valueTrigger(x.item.iconColor)
        }"
        style="font-size: 12px"
    ></i>
    <p class="name" style="font-size: 12px">
        {{ valueTrigger(x.item.name) }}
    </p>
</template>
```



### Data

---

1. options










```javascript
options = [
  { name: "", icon: "", iconColor: "", foreground: "", background: "", type: "", func: {}, show: true, secondary: [], disabled: false }
];

//e.g.//

options: [
  {
    name: "Add",
    icon: "Add",
    iconColor: "rgba(0, 90, 158, 1)",
    func: this.customFunc,
    secondary: [
      {
        name: "Email Message",
        func: this.customFunc,
        icon: "Mail",
        iconColor: "rgba(0, 98, 158, 1)",
        disabled: true
      },
      { type: "divider" },
      {
        name: "Calendar event",
        func: this.customFunc,
        icon: "WebAppBuilderModule"
      }
    ]
  },
  { name: "Edit", func: this.customFunc, icon: "SingleColumnEdit", disabled: true },
  { type: "divider" },
  { name: "Share", func: this.customFunc, icon: "Share", foreground: "white", background: "rgba(0, 90, 158, 1)" },
  {
    type: "more",
    secondary: [
      { name: "Move to", func: this.customFunc, icon: "MoveToFolder" },
      { name: "Copy to", func: this.customFunc, icon: "Copy" },
      { name: "Rename", func: this.customFunc, icon: "Rename" }
    ]
  }
];
```
