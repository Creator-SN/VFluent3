---
page: true
title: DropDown
--- 

<!-- lang-switch -->
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

### Properties
---
| Property               | Type            | Required | Default                      | Description                                                              |
|:----------------------:|:---------------:|:--------:|:----------------------------:|:------------------------------------------------------------------------:|
| modelValue             | array           | No       | []                           | Choosen Value                                                            |
| options                | array           | No       | []                           | Dropdown options array                                                   |
| multiple               | boolean         | No       | false                        | Is enable multiple select                                                |
| borderWidth            | number          | No       | 1                            | Dropdown border width                                                    |
| borderRadius           | string          | No       | '6'                          | Dropdown border radius                                                   |
| placeholder            | string          | No       | 'Dropdown'                   | Dropdown placeholder                                                     |
| maxHeight              | string          | No       | ''                           | Dropdown list max height                                                 |
| checkBoxBackground     | string          | No       | ''                           | CheckBox Background when Multiple                                        |
| inputForeground        | string          | No       | ''                           |                                                                          |
| inputBorderColor       | string          | No       | ''                           |                                                                          |
| inputHeight            | string          | No       | ''                           |                                                                          |
| inputFontSize          | string          | No       | ''                           |                                                                          |
| dropDownListForeground | string          | No       | ''                           |                                                                          |
| inputBackground        | string          | No       | ''                           |                                                                          |
| dropDownListBackground | string          | No       | ''                           |                                                                          |
| dropDownIcon           | string          | No       | 'ChevronDown'                | Icon with Fabric-Icon                                                    |
| dropDownIconForeground | string          | No       | ''                           |                                                                          |
| revealBorderColor      | [string(color)] | No       | N/A                          |                                                                          |
| revealBackgroundColor  | [string(color)] | No       | N/A                          |                                                                          |
| showError              | boolean         | No       | false                        |                                                                          |
| errorMessage           | string          | No       | 'This dropdown has an error' |                                                                          |
| disabled               | boolean         | No       | false                        |                                                                          |
| setFocus               | boolean         | No       | false                        | Whether Dropdown list show                                               |
| theme                  | string          | No       | 'global'                     | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang                   | string          | No       | "global"                     | See the DropDown `lang` option.                                          |

### Events
---
| Event          | Arguments | Description                  |
|:--------------:|:---------:|:----------------------------:|
| change         | value     | Dropdown choose item         |
| visible-change | visible   | Dropdown list show or hidden |

### Slots
---
1. Input




```javascript
<template v-slot:input="x">
    <i class="ms-Icon ms-Icon--Dynamics365Logo left-icon"></i>
    <input :placeholder="x.placeholder" :value="x.value" style="padding-left: 36px;"/>
    <i class="ms-Icon ms-Icon--DelveAnalyticsLogo right-icon"></i>
</template>
```

2. Options





```javascript
<template v-slot:options="x">
    <p>{{x.item.index}}</p>
</template>
```

3. Drop Carrier





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
