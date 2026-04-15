---
page: true
title: DropDown
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### DropDown-DEMO
---

<script>
export default {
    data () {
        return {
            value: [],
            options: [
                { key: "fruitsHeader", text: "Fruits", type: "header" },
                { key: "apple", text: "Apple" },
                { key: "banana", text: "Banana" },
                { key: "orange", text: "Orange", disabled: true },
                { key: "grape", text: "Grape" },
                { key: "divider_1", text: "-", type: "divider" },
                { key: "vegetablesHeader", text: "Vegetables", type: "header" },
                { key: "broccoli", text: "Broccoli" },
                { key: "carrot", text: "Carrot" },
                { key: "lettuce", text: "Lettuce" }
            ]
        }
    }
}
</script>

<ClientOnly>
<fv-DropDown v-model="value" :options="options" placeholder="Select an option"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown v-model="value" :options="options" placeholder="Select an option"></fv-DropDown>
```

### DropDown-Disabled
---
1. Set Disabled


<ClientOnly>
<fv-DropDown v-model="value" :options="options" placeholder="Select an option" disabled></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown v-model="value" :options="options" placeholder="Select an option" disabled></fv-DropDown>
```

1. DropDown without options


<ClientOnly>
<fv-DropDown placeholder="Select an option"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown placeholder="Select an option"></fv-DropDown>
```

### DropDown-Multiple Select
---

<ClientOnly>
<fv-DropDown v-model="value" :options="options" placeholder="Select options" :multiple="true"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown v-model="value" :options="options" placeholder="Select options" :multiple="true"></fv-DropDown>
```

### DropDown-Customize
---
1. Custom List Item


<ClientOnly>
<fv-DropDown :options="options" placeholder="Select an option"><template v-slot:options="item"><p>{{item.index}}</p></template></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select an option">
    <template v-slot:options="item">
        <p>{{item.index}}</p>
    </template>
</fv-DropDown>
```

1. Custom Style


<ClientOnly>
<fv-DropDown :options="options" placeholder="Select options" :multiple="true" :borderWidth="1" borderRadius="5" inputBackground="rgba(0,204,153,0.9)" checkBoxBackground="rgba(0, 204, 153, 0.9)" inputForeground="whitesmoke" dropDownIcon="AddTo" dropDownIconForeground="whitesmoke" dropDownListForeground="rgba(0,204,153,1)" dropDownListBackground="rgba(239,239,239,0.6)"></fv-DropDown>
</ClientOnly>
 
```vue
<fv-DropDown :options="options" placeholder="Select options" :multiple="true" :borderWidth="1" borderRadius="5" inputBackground="rgba(0,204,153,0.9)" checkBoxBackground="rgba(0, 204, 153, 0.9)" inputForeground="whitesmoke" dropDownIcon="AddTo" dropDownIconForeground="whitesmoke" dropDownListForeground="rgba(0,204,153,1)" dropDownListBackground="rgba(239,239,239,0.6)"></fv-DropDown>
```

3. Custom Drop Down Input


<ClientOnly>
<fv-DropDown :options="options" placeholder="Select options" :multiple="true"><template v-slot:input="x"><i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i><input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px; border: none;"/><i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i></template></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select options" :multiple="true">
    <template v-slot:input="x">
        <i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i>
        <input class="input" :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px; border: none;"/>
        <i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i>
    </template>
</fv-DropDown>
```

3. Custom Drop Down Carrier

<ClientOnly>
<fv-DropDown :options="options" placeholder="Select options" :multiple="true"><template v-slot:drop-carrier="x"><fv-button :theme="x.theme" :isBoxShadow="true" style="width: 150px;"><p>DropDown</p><i class="ms-Icon ms-Icon--ChevronDown" style="margin-left: 8px;"></i></fv-button></template></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select options" :multiple="true">
    <template v-slot:drop-carrier="x">
        <fv-button :theme="x.theme" :isBoxShadow="true" style="width: 150px;">
            <p>DropDown</p>
            <i class="ms-Icon ms-Icon--ChevronDown" style="margin-left: 8px;"></i>
        </fv-button>
    </template>
</fv-DropDown>
```

### DropDown-Show Error
---

<ClientOnly>
<fv-DropDown :options="options" placeholder="Select an option" :showError="true"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select an option" :showError="true"></fv-DropDown>
```

### DropDown-Dark Theme
---
1. Single Selection


<ClientOnly>
<fv-DropDown :options="options" placeholder="Select an option" theme="dark"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select an option" theme="dark"></fv-DropDown>
```

2. Multiple Selections


<ClientOnly>
<fv-DropDown :options="options" placeholder="Select an option" theme="dark" :multiple="true"></fv-DropDown>
</ClientOnly>

```vue
<fv-DropDown :options="options" placeholder="Select an option" theme="dark" :multiple="true"></fv-DropDown>
```

### 属性
---
| 属性                   | 类型            | 必填  | 默认值                       | 说明                                                             |
|:----------------------:|:---------------:|:-----:|:----------------------------:|:----------------------------------------------------------------:|
| modelValue             | array           | 否    | []                           | Choosen Value                                                    |
| options                | array           | 否    | []                           | Dropdown options array                                           |
| multiple               | boolean         | 否    | false                        | Is enable multiple select                                        |
| borderWidth            | number          | 否    | 1                            | Dropdown border width                                            |
| borderRadius           | string          | 否    | '6'                          | Dropdown border radius                                           |
| placeholder            | string          | 否    | 'Dropdown'                   | Dropdown placeholder                                             |
| maxHeight              | string          | 否    | ''                           | Dropdown list max height                                         |
| checkBoxBackground     | string          | 否    | ''                           | CheckBox Background when Multiple                                |
| inputForeground        | string          | 否    | ''                           |                                                                  |
| inputBorderColor       | string          | 否    | ''                           |                                                                  |
| inputHeight            | string          | 否    | ''                           |                                                                  |
| inputFontSize          | string          | 否    | ''                           |                                                                  |
| dropDownListForeground | string          | 否    | ''                           |                                                                  |
| inputBackground        | string          | 否    | ''                           |                                                                  |
| dropDownListBackground | string          | 否    | ''                           |                                                                  |
| dropDownIcon           | string          | 否    | 'ChevronDown'                | Icon with Fabric-Icon                                            |
| dropDownIconForeground | string          | 否    | ''                           |                                                                  |
| revealBorderColor      | [string(color)] | No    | N/A                          |                                                                  |
| revealBackgroundColor  | [string(color)] | No    | N/A                          |                                                                  |
| showError              | boolean         | 否    | false                        |                                                                  |
| errorMessage           | string          | 否    | 'This dropdown has an error' |                                                                  |
| disabled               | boolean         | 否    | false                        |                                                                  |
| setFocus               | boolean         | 否    | false                        | Whether Dropdown list show                                       |
| theme                  | string          | 否    | 'global'                     | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang                   | string          | 否    | "global"                     | 参见组件的 `lang` 选项。                                         |

### 事件
---
| 事件名         | 参数    | 说明                         |
|:--------------:|:-------:|:----------------------------:|
| change         | value   | Dropdown choose item         |
| visible-change | visible | Dropdown list show or hidden |

### 插槽
---
1. Input

- placeholder: 当前选中内容
- value: 当前Placeholder

```javascript
<template v-slot:input="x">
    <i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i>
    <input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px;"/>
    <i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i>
</template>
```

2. Options

- option: 当前项内容
- index: 当前项索引
- valueTrigger: 支持函数式驱动的值函数

```javascript
<template v-slot:options="x">
    <p>{{x.item.index}}</p>
</template>
```

3. Drop Carrier

- value: 当前选中内容
- placeholoder: 当前Placeholder
- theme: 当前主题

```javascript
<template v-slot:drop-carrier="x">
    <button>DropDown</button>
</template>
```

### Data
---
1. options

```javascript
options = [{key: '', text: '', type: '', disabled: '', choosen: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", text: "Fruits", type: "header" },
    { key: "apple", text: "Apple" },
    { key: "banana", text: "Banana" },
    { key: "orange", text: "Orange", disabled: true },
    { key: "grape", text: "Grape" },
    { key: "divider_1", text: "-", type: "divider" },
    { key: "vegetablesHeader", text: "Vegetables", type: "header" },
    { key: "broccoli", text: "Broccoli" },
    { key: "carrot", text: "Carrot" },
    { key: "lettuce", text: "Lettuce" }
]
```

**特别地** 0.1.62版本后支持采用函数式字段, 其中支持的字段包括`text`, `disabled`, `type`
