---
page: true
title: SearchBox
--- 

<!-- lang-switch -->
### SearchBox-DEMO
---

<script>
export default {
    data () {
        return {
            value: "",
            items: [
                { key: "fruitsHeader", name: "Fruits", type: "header" },
                { key: "apple", name: "Apple" },
                { key: "banana", name: "Banana" },
                { key: "orange", name: "Orange", disabled: true },
                { key: "grape", name: "Grape" },
                { key: "divider_1", name: "", type: "divider" },
                { key: "vegetablesHeader", name: "Vegetables", type: "header" },
                { key: "broccoli", name: "Broccoli" },
                { key: "carrot", name: "Carrot" },
                { key: "lettuce", name: "Lettuce" }
            ],
            custom_items: {
                people: ['https://th.bing.com/th/id/OIP.kusjJHHbJMyhkHQXMwn23gHaE8?w=253&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', 'https://th.bing.com/th/id/OIP.PHUY3CWgvSSgeoZ5ZE9-0AHaFr?w=214&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', 'https://th.bing.com/th/id/OIP.XE7Fk_nOciTNMxXFhIPxhAHaGB?w=219&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7'],
                pos: ['Beijing', 'Shanghai', 'Shenzhen'],
                pro: ['IT', 'Doctor', 'Artist']
            },
            resultPlaceholder: []
        }
    },
    methods: {
        customFilterFunc (target) {
            let result = {};
            for(name in target) {
                if(name == 'people')
                    continue;
                let arr = [];
                for(let item of target[name]) {
                    if(item.toString().toLowerCase().indexOf(this.value.toLowerCase()) > -1)
                        arr.push(item);
                }
                result[name] = arr;
            }
            result["people"] = target["people"];
            return result;
        }
    }
}
</script>



Standard

<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

Disabled

<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>

```vue
Standard
<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

Disabled
<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>
```

### SearchBox-RevealBorder


<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>

```vue
<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>
```

### SearchBox-Custom Search Result
---
<div>
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <div style="position: relative; width: 100%; height: 60px; display: flex;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
            </div>
            <span>
                <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
            </span>
            <span>
                <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
            </span>
        </div>
    </template>
</fv-SearchBox>
</div>

```vue
<div>
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <span class="list-item list-title">人物</span>
                <div style="position: relative; width: 100%; height: 60px; display: flex;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
                </div>
                <span class="list-item list-title">位置</span>
                <span>
                    <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
                </span>
                <span class="list-item list-title">职业</span>
                <span>
                    <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
                </span>
            </div>
        </template>
    </fv-SearchBox>
</div>
```

### TextBox-With Underline And Borderless
---
1. Light


<fv-SearchBox icon="Search" placeholder="Search" :options="items" underline></fv-SearchBox>

2. Dark

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" underline></fv-SearchBox>
</div>

3. Underline with Reveal
<fv-SearchBox icon="Search" placeholder="Search" :options="items" :revealBorder="true" underline></fv-SearchBox>

```vue
1. Light

<fv-SearchBox icon="Search" placeholder="Search" :options="items" underline></fv-SearchBox>

2. Dark

<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" underline></fv-SearchBox>

3. Underline with Reveal

<fv-SearchBox icon="Search" placeholder="Search" :options="items" :revealBorder="true" underline></fv-SearchBox>
```

### SearchBox-Dark Theme
---

1. Original Template

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>


2. Custom Template

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <div style="position: relative; width: 100%; height: 60px; display: flex;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
            </div>
            <span>
                <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
            </span>
            <span>
                <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
            </span>
        </div>
    </template>
</fv-SearchBox>
</div>

```vue
1. Original Template

<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>
```

2. Custom Template

```vue
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" :resultPlaceholder.sync="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <span class="list-item list-title">人物</span>
                <div style="position: relative; width: 100%; height: 60px; display: flex;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.native="resultPlaceholder.push(item)"/>
                </div>
                <span class="list-item list-title">位置</span>
                <span>
                    <p v-for="(item, index) in x.data.pos" class="list-item" :key="index">{{item}}</p>
                </span>
                <span class="list-item list-title">职业</span>
                <span>
                    <p v-for="(item, index) in x.data.pro" class="list-item" :key="index">{{item}}</p>
                </span>
            </div>
        </template>
    </fv-SearchBox>
</div>
```

### TextBox-Customize
---

Customize border color
<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

Customize background
<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>

```vue
Customize border color
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

Customize background
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>
```

### Properties
---
| Property          | Type    | Required | Default  | Description                                                              |
|:-----------------:|:-------:|:--------:|:--------:|:------------------------------------------------------------------------:|
| modelValue        | string  | No       | ''       | Using v-model binding input value                                        |
| options           | array   | No       | []       | See the SearchBox `options` option.                                      |
| placeholder       | string  | No       | ''       | Same as the native HTML input attribute.                                 |
| type              | string  | No       | 'text'   | Same as the native HTML input attribute.                                 |
| readonly          | boolean | No       | false    | Same as the native HTML input attribute.                                 |
| maxlength         | string  | No       | ''       | Same as the native HTML input attribute.                                 |
| customFilter      | boolean | No       | false    | See the SearchBox `customFilter` option.                                 |
| resultPlaceholder | boolean | No       | false    | See the SearchBox `resultPlaceholder` option.                            |
| focusShow         | boolean | No       | false    | See the SearchBox `focusShow` option.                                    |
| leftIcon          | string  | No       | ''       | Left icon.                                                               |
| icon              | string  | No       | ''       | Right icon.                                                              |
| underline         | boolean | No       | false    | Whether to use the underline style for SearchBox                         |
| background        | string  | No       | ''       | Background color.                                                        |
| borderWidth       | number  | No       | 1        |                                                                          |
| borderColor       | string  | No       | ''       |                                                                          |
| focusBorderColor  | string  | No       | ''       |                                                                          |
| fontSize          | number  | No       | 13.3     |                                                                          |
| fontWeight        | string  | No       | 'normal' |                                                                          |
| foreground        | string  | No       | ''       |                                                                          |
| textAlign         | string  | No       | 'left'   |                                                                          |
| borderRadius      | number  | No       | 3        | See the SearchBox `borderRadius` option.                                 |
| revealBorder      | boolean | No       | false    |                                                                          |
| status            | string  | No       | ''       | Preset status border. Built-in values are warning and correct.           |
| debounceDelay     | number  | No       | 300      | Debounced input delay.                                                   |
| disabled          | boolean | No       | false    |                                                                          |
| theme             | string  | No       | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| isBoxShadow       | boolean | No       | false    | See the SearchBox `isBoxShadow` option.                                  |
| lang              | string  | No       | "global" | See the SearchBox `lang` option.                                         |

### Events
---
| Event                    | Arguments | Description                                          |
|:------------------------:|:---------:|:----------------------------------------------------:|
| keydown                  | event     |                                                      |
| keyup                    | event     |                                                      |
| change                   | event     |                                                      |
| paste                    | event     |                                                      |
| left-icon-click          | event     |                                                      |
| icon-click               | event     |                                                      |
| lazyload                 | array     | See the component `lazyload` option.                 |
| update:resultPlaceholder | array     | See the component `update:resultPlaceholder` option. |
| clear-click              | array     | See the component `clear-click` option.              |
| choose-result            | object    | See the component `choose-result` option.            |
| debounce-input           | string    | Emitted with debounced input content.                |

### Slots
---
1. SearchResult






```vue
 <template v-slot:searchResult="x">
    <fv-list-view v-model="x.data" :theme="theme" style="width: 100%; height: auto;" @chooseItem="x.chooseResult"></fv-list-view>
</template>
```

2. ResultPlaceholder



```vue
<template v-slot:resultPlaceholder="x">
    <div></div>
</template>
```

### Data
---

1. options



```javascript
options = [{key: '', name: '', type: '', disabled: ''}]

//e.g.//

options: [
    { key: "fruitsHeader", name: "Fruits", type: "header" },
    { key: "apple", name: "Apple" },
    { key: "banana", name: "Banana" },
    { key: "orange", name: "Orange", disabled: true },
    { key: "grape", name: "Grape" },
    { key: "divider_1", name: "", type: "divider" },
    { key: "vegetablesHeader", name: "Vegetables", type: "header" },
    { key: "broccoli", name: "Broccoli" },
    { key: "carrot", name: "Carrot" },
    { key: "lettuce", name: "Lettuce" }
]
```
