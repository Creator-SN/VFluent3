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
                people: ['https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/deepseek.svg', 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg', 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/qwen.svg'],
                pos: ['Beijing', 'Shanghai', 'Shenzhen'],
                pro: ['IT', 'Doctor', 'Artist']
            },
            resultPlaceholder: []
        }
    },
    methods: {
        customFilterFunc (target) {
            let result = {};
            for (let name in target) {
                if (name == 'people')
                    continue;
                let arr = [];
                for (let item of target[name]) {
                    if (item.toString().toLowerCase().indexOf(this.value.toLowerCase()) > -1)
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

标准

<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

禁用

<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>

```vue
<fv-SearchBox icon="Search" placeholder="Search" :options="items"></fv-SearchBox>

<fv-SearchBox icon="Search" placeholder="Search" :options="items" disabled></fv-SearchBox>
```

### SearchBox-RevealBorder
---

<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>

```vue
<fv-SearchBox placeholder="Please enter the text here." icon="Search" :options="items" :revealBorder="true" borderColor="rgba(0, 0, 0, 0.01)" borderRadius="3" :isBoxShadow="true"></fv-SearchBox>
```

### SearchBox-Custom Search Result
---

<div>
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" v-model:resultPlaceholder="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <div style="position: relative; width: 100%; height: 40px; display: flex; align-items: center;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 25px; height: 25px; margin: 5px; border-radius: 50%;" @click.capture="resultPlaceholder.push(item)"/>
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
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" v-model:resultPlaceholder="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <div style="position: relative; width: 100%; height: 40px; display: flex; align-items: center;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 25px; height: 25px; margin: 5px; border-radius: 50%;" @click.capture="resultPlaceholder.push(item)"/>
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
<fv-SearchBox icon="Search" placeholder="Search" :options="items" underline></fv-SearchBox>

<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" underline></fv-SearchBox>

<fv-SearchBox icon="Search" placeholder="Search" :options="items" :revealBorder="true" underline></fv-SearchBox>
```

### SearchBox-Dark Theme
---

1. 原始模板

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>

2. 自定义模板

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" v-model:resultPlaceholder="resultPlaceholder">
    <template v-slot:resultPlaceholder="x">
        <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
    </template>
    <template v-slot:searchResult="x">
        <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
            <div style="position: relative; width: 100%; height: 60px; display: flex;">
                <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.capture="resultPlaceholder.push(item)"/>
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
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items"></fv-SearchBox>
</div>
```

```vue
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox v-model="value" icon="Search" placeholder="Search" theme="dark" :options="custom_items" :focusShow="true" :customFilter="customFilterFunc" v-model:resultPlaceholder="resultPlaceholder">
        <template v-slot:resultPlaceholder="x">
            <fv-img v-for="(item, index) in resultPlaceholder" :key="index" :src="item" style="width: 25px; height: 25px; margin: 0px 3px; border-radius: 50%;"/>
        </template>
        <template v-slot:searchResult="x">
            <div style="position: relative; width: 100%; height: auto; display: flex; flex-direction: column;">
                <div style="position: relative; width: 100%; height: 60px; display: flex;">
                    <fv-img v-for="(item, index) in x.data.people" :key="index" :src="item" style="width: 50px; height: 50px; margin: 5px; border-radius: 50%;" @click.capture="resultPlaceholder.push(item)"/>
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
```

### TextBox-Customize
---

自定义边框颜色

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

自定义背景

<div style="width: 100%; padding: 25px; background: black;">
<fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>

```vue
<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" borderColor="rgba(0,153,204,1)" focusBorderColor="rgba(0,204,153,1)"></fv-SearchBox>
</div>

<div style="width: 100%; padding: 25px; background: black;">
    <fv-SearchBox icon="Search" placeholder="Search" theme="dark" :options="items" background="rgba(0,153,204,1)" borderColor="rgba(0,153,204,1)"></fv-SearchBox>
</div>
```

### 属性
---
| Property           | Type    | Required | Default  | Description |
|:------------------:|:-------:|:--------:|:--------:|:-----------:|
| modelValue         | string  | No       | ''       | 组件的 `v-model` 值。 |
| options            | array   | No       | []       | 搜索结果选项。 |
| placeholder        | string  | No       | ''       | 输入框占位文本。 |
| type               | string  | No       | 'text'   | 输入框类型。 |
| readonly           | boolean | No       | false    | 是否只读。 |
| maxlength          | string  | No       | ''       | 最大输入长度。 |
| customFilter       | boolean | No       | false    | 是否使用自定义过滤逻辑。 |
| resultPlaceholder  | boolean | No       | false    | 结果占位内容。 |
| focusShow          | boolean | No       | false    | 获取焦点时是否显示结果。 |
| leftIcon           | string  | No       | ''       | 左侧图标。 |
| icon               | string  | No       | ''       | 右侧图标。 |
| underline          | boolean | No       | false    | 是否使用下划线样式。 |
| background         | string  | No       | ''       | 搜索框背景。 |
| hoverBackground    | string  | No       | ''       | 搜索框 hover 背景。 |
| borderWidth        | number  | No       | 1        | 边框宽度。 |
| borderColor        | string  | No       | ''       | 边框颜色。 |
| focusBorderColor   | string  | No       | ''       | 聚焦时边框颜色。 |
| foreground         | string  | No       | ''       | 文本颜色。 |
| fontSize           | number  | No       | 13.3     | 字体大小。 |
| fontWeight         | string  | No       | 'normal' | 字体粗细。 |
| textAlign          | string  | No       | 'left'   | 文本对齐方式。 |
| borderRadius       | number  | No       | 3        | 搜索框圆角。 |
| resultBackground   | string  | No       | ''       | 搜索结果容器背景。 |
| resultBorderRadius | string  | No       | ''       | 搜索结果容器圆角。 |
| resultBoxShadow    | boolean | No       | false    | 是否显示 `$ms-depth-shadow-16`。 |
| revealBorder       | boolean | No       | false    | 是否启用 reveal 边框效果。 |
| status             | string  | No       | ''       | 状态样式。 |
| debounceDelay      | number  | No       | 300      | 防抖延迟。 |
| disabled           | boolean | No       | false    | 是否禁用。 |
| theme              | string  | No       | 'global' | 主题。 |
| isBoxShadow        | boolean | No       | false    | 搜索框本体是否显示阴影。 |
| lang               | string  | No       | "global" | 语言。 |

### 事件
---
| Event                    | Arguments | Description |
|:------------------------:|:---------:|:-----------:|
| keydown                  | event     | 键盘按下事件。 |
| keyup                    | event     | 键盘抬起事件。 |
| change                   | event     | 输入值变更事件。 |
| paste                    | event     | 粘贴事件。 |
| left-icon-click          | event     | 左侧图标点击事件。 |
| icon-click               | event     | 右侧图标点击事件。 |
| lazyload                 | array     | 搜索结果滚动到底部时触发。 |
| update:resultPlaceholder | array     | 更新结果占位内容。 |
| clear-click              | array     | 清空按钮点击事件。 |
| choose-result            | object    | 选择搜索结果后触发。 |
| debounce-input           | string    | 防抖后的输入内容。 |

### 插槽
---
1. SearchResult

用于自定义搜索结果区域，插槽参数包含：

- `data`: 当前过滤后的结果数据
- `chooseResult`: 选择结果时调用的方法

```vue
<template v-slot:searchResult="x">
    <fv-list-view v-model="x.data" :theme="theme" style="width: 100%; height: auto;" @chooseItem="x.chooseResult"></fv-list-view>
</template>
```

2. ResultPlaceholder

用于自定义左侧结果占位区域。

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

// e.g.

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
