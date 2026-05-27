---
page: true
title: TabView
---

<!-- lang-switch -->
### TabView-示例
---

<script>
export default {
    data () {
        return {
            value: null,
            items: [
                {
                    key: 'explorer',
                    name: '资源管理器',
                    icon: 'FolderHorizontal'
                },
                {
                    key: 'search',
                    name: '搜索',
                    icon: 'Search'
                },
                {
                    key: 'docs',
                    name: '文档',
                    img: 'https://img.icons8.com/color/48/microsoft.png'
                },
                {
                    key: 'welcome',
                    title: '欢迎',
                    icon: 'Home',
                    modified: () => true,
                    closable: false
                }
            ],
            manyItemsValue: null,
            manyItems: [
                { key: 'welcome', name: '欢迎', icon: 'Home', closable: false },
                { key: 'explorer', name: '资源管理器', icon: 'FolderHorizontal' },
                { key: 'search', name: '搜索', icon: 'Search', modified: true },
                { key: 'extensions', name: '扩展', icon: 'Puzzle' },
                { key: 'source-control', name: '源代码管理', icon: 'Repo' },
                { key: 'terminal', name: '终端', icon: 'CommandPrompt' },
                { key: 'settings', name: '设置', icon: 'Settings' },
                { key: 'profile', name: '个人资料', icon: 'Contact' },
                { key: 'notifications', name: '通知', icon: 'Ringer' },
                { key: 'release-notes', name: '发行说明', icon: 'ReadingMode' },
                { key: 'feedback', name: '反馈', icon: 'Feedback' }
            ],
            dynamicValue: null,
            dynamicItems: [
                { key: 'home', name: '首页', icon: 'Home', closable: false },
                { key: 'activity', name: '活动', icon: 'Timeline', modified: true },
                { key: 'design', name: '设计', icon: 'Design' }
            ],
            tabSeed: 1
        }
    },
    mounted () {
        this.value = this.items[0]
        this.manyItemsValue = this.manyItems[0]
        this.dynamicValue = this.dynamicItems[0]
    },
    methods: {
        handleAdd() {
            const presets = [
                { name: '草稿', icon: 'Edit' },
                { name: '便笺', icon: 'StickyNotes' },
                { name: '预览', icon: 'View' },
                { name: '文档', icon: 'Document' }
            ]
            const preset = presets[(this.tabSeed - 1) % presets.length]
            const next = {
                key: `new-${this.tabSeed}`,
                name: `${preset.name} ${this.tabSeed}`,
                icon: preset.icon
            }
            this.tabSeed += 1
            this.dynamicItems = [...this.dynamicItems, next]
            this.dynamicValue = next
        },
        handleClose(event) {
            console.log('close', event.item)
        },
        handleBeforeClose(payload) {
            return payload.item.closable !== false
        },
        handleReorder(event) {
            console.log('reorder', event.items)
        }
    }
}
</script>

<ClientOnly>

<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
>
</fv-tab-view>

```vue
<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
>
</fv-tab-view>
```

### TabView-多标签
---

<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
>
</fv-tab-view>

```vue
<script>
export default {
    data () {
        return {
            manyItemsValue: null,
            manyItems: [
                { key: 'welcome', name: '欢迎', icon: 'Home', closable: false },
                { key: 'explorer', name: '资源管理器', icon: 'FolderHorizontal' },
                { key: 'search', name: '搜索', icon: 'Search' },
                { key: 'extensions', name: '扩展', icon: 'Puzzle' },
                { key: 'source-control', name: '源代码管理', icon: 'Repo' },
                { key: 'terminal', name: '终端', icon: 'CommandPrompt' },
                { key: 'settings', name: '设置', icon: 'Settings' },
                { key: 'profile', name: '个人资料', icon: 'Contact' },
                { key: 'notifications', name: '通知', icon: 'Ringer' },
                { key: 'release-notes', name: '发行说明', icon: 'ReadingMode' },
                { key: 'feedback', name: '反馈', icon: 'Feedback' }
            ]
        }
    }
}
</script>

<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
>
</fv-tab-view>
```

### TabView-溢出模式
---

1. 滚动

<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
    overflowMode="scroll"
>
</fv-tab-view>

2. 压缩

<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
    overflowMode="shrink"
>
</fv-tab-view>

```vue
<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
    overflowMode="scroll"
>
</fv-tab-view>

<fv-tab-view
    v-model="manyItemsValue"
    :items="manyItems"
    :itemWidth="160"
    overflowMode="shrink"
>
</fv-tab-view>
```

### TabView-点击加号添加随机项目
---

<fv-tab-view
    v-model="dynamicValue"
    :items="dynamicItems"
    :itemWidth="150"
    modifiedButtonIcon="CircleFill"
    :beforeClose="handleBeforeClose"
    :showAddButton="true"
    @add="handleAdd"
    @close="handleClose"
    @reorder="handleReorder"
>
</fv-tab-view>

```vue
<fv-tab-view
    v-model="dynamicValue"
    :items="dynamicItems"
    :itemWidth="150"
    modifiedButtonIcon="CircleFill"
    :beforeClose="handleBeforeClose"
    :showAddButton="true"
    @add="handleAdd"
    @close="handleClose"
    @reorder="handleReorder"
>
</fv-tab-view>

<script>
export default {
    data () {
        return {
            dynamicValue: null,
            dynamicItems: [
                { key: 'home', name: '首页', icon: 'Home', closable: false },
                { key: 'activity', name: '活动', icon: 'Timeline' },
                { key: 'design', name: '设计', icon: 'Design' }
            ],
            tabSeed: 1
        }
    },
    methods: {
        handleAdd() {
            const presets = [
                { name: '草稿', icon: 'Edit' },
                { name: '便笺', icon: 'StickyNotes' },
                { name: '预览', icon: 'View' },
                { name: '文档', icon: 'Document' }
            ]
            const preset = presets[(this.tabSeed - 1) % presets.length]
            const next = {
                key: `new-${this.tabSeed}`,
                name: `${preset.name} ${this.tabSeed}`,
                icon: preset.icon
            }
            this.tabSeed += 1
            this.dynamicItems = [...this.dynamicItems, next]
            this.dynamicValue = next
        }
    }
}
</script>
```

点击 `+` 按钮后，会向当前标签列表追加一个随意生成的新项目。

</ClientOnly>

### 数据结构
---

1. items

```javascript
items = [
    {
        key: 'explorer',
        name: '资源管理器',
        title: '资源管理器',
        show: true,
        disabled: false,
        draggable: true,
        closable: true,
        modified: false,
        icon: 'FolderHorizontal',
        img: ''
    }
]
```

`modified` 也支持传入函数，会通过 `valueTrigger` 计算，因此可以按标签项动态决定是否显示“未保存”状态。

### 属性
---
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:----:|:----:|:----:|:------:|:----:|
| modelValue | object | 否 | `null` | 当前选中的标签项。 |
| items | array | 否 | `[{ name: 'Tab' }]` | 标签项数组。单项通常使用 `key`、`name` 或 `title`，并可选传入 `icon`、`img`、`image` 或 `src`。 |
| itemWidth | number / string | 否 | `180` | 所有标签统一宽度。 |
| itemHeight | number / string | 否 | `38` | 标签高度。 |
| padding | string | 否 | `''` | 组件外层内边距。 |
| borderRadius | number / string | 否 | `8` | 组件外层圆角。 |
| foreground | string | 否 | `''` | 普通标签的文字和图标颜色。 |
| choosenForeground | string | 否 | `''` | 选中标签的文字和图标颜色。 |
| chooseBackground | string | 否 | `''` | 选中标签的背景色。 |
| background | string | 否 | `''` | 整个 TabView 的背景色。 |
| hoverBackground | string | 否 | `''` | 标签悬停时的背景色。 |
| activeBackground | string | 否 | `''` | 标签按下时的背景色。 |
| fontSize | number / string | 否 | `13` | 标签标题字号。 |
| imgBorderRadius | number / string | 否 | `4` | 标签图片圆角。 |
| draggable | boolean | 否 | `true` | 是否允许拖拽调整标签顺序。 |
| closable | boolean | 否 | `true` | 是否默认显示关闭按钮。单项可通过 `closable: false` 单独关闭。 |
| listPadding | string | 否 | `''` | 标签列表内部容器的内边距。 |
| itemBorderRadius | number / string | 否 | `8` | 每个标签项的圆角。 |
| showAddButton | boolean | 否 | `false` | 是否显示右侧添加按钮。 |
| addButtonIcon | string | 否 | `'Add'` | 添加按钮使用的 Fluent 图标名。 |
| addButtonBackground | string | 否 | `''` | 添加按钮背景色。 |
| addButtonForeground | string | 否 | `''` | 添加按钮前景色。 |
| closeButtonIcon | string | 否 | `'ChromeClose'` | 关闭按钮使用的 Fluent 图标名。 |
| closeIconSize | number / string | 否 | `10` | 关闭按钮图标大小。 |
| modifiedButtonIcon | string | 否 | `'CircleFill'` | 已修改标签在未 hover 时显示的 Fluent 图标名。 |
| modifiedIconSize | number / string | 否 | `8` | 已修改状态指示图标大小。 |
| beforeClose | function | 否 | `() => true` | 关闭标签前的拦截函数。接收 `{ event, item, items, index }`，只有返回 `true` 时才会继续关闭。 |
| closeButtonForeground | string | 否 | `''` | 关闭按钮前景色。 |
| styleMode | string | 否 | `'borderless'` | 标签的视觉样式。当前支持 `borderless` 和 `rounded`。 |
| overflowMode | string | 否 | `'scroll'` | 多标签溢出时的处理方式。`scroll` 保持标签宽度并启用横向滚动，`shrink` 会把标签压缩到同一行内。 |
| theme | string | 否 | `'global'` | 主题样式，支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled | boolean | 否 | `false` | 是否禁用整个组件。 |
| lang | string | 否 | `'global'` | 从公共属性继承的语言选项。 |

### 插槽
---

1. item

自定义整个标签项内容。使用后会替换默认的“图标 + 标题”布局。

* item: 当前标签项
* index: 当前标签索引
* eqal: 返回当前标签是否被选中
* valueTrigger: 用于读取标签项上的静态值或函数返回值

```vue
<template v-slot:item="{ item, index, eqal, valueTrigger }">
    <div
        style="display: flex; align-items: center; gap: 8px;"
    >
        <i
            class="ms-Icon"
            :class="`ms-Icon--${valueTrigger(item.icon)}`"
        ></i>
        <b>{{ valueTrigger(item.name) }}</b>
        <span v-if="eqal(item)">当前</span>
    </div>
</template>
```

2. icon

仅自定义默认布局中的图标区域。如果已经使用 `item` 完整自定义标签项，则此插槽不会生效。

* item: 当前标签项
* index: 当前标签索引
* eqal: 返回当前标签是否被选中
* valueTrigger: 用于读取标签项上的静态值或函数返回值

```vue
<template v-slot:icon="{ item, valueTrigger }">
    <i
        class="ms-Icon"
        :class="`ms-Icon--${valueTrigger(item.icon)}`"
        style="font-size: 18px;"
    ></i>
</template>
```

3. close-button

自定义可关闭标签上的关闭按钮内容。

* item: 当前标签项
* index: 当前标签索引
* modified: 当前标签项是否处于已修改状态

```vue
<template v-slot:close-button="{ item, modified }">
    <i
        class="ms-Icon"
        :class="modified ? 'ms-Icon--CircleFill' : 'ms-Icon--Cancel'"
        :title="item.name"
    ></i>
</template>
```

4. add-button

自定义右侧添加按钮内容，仅在 `showAddButton` 为 `true` 时显示。

```vue
<template v-slot:add-button>
    <i class="ms-Icon ms-Icon--Add"></i>
</template>
```

### 事件
---
| 事件名 | 参数 | 说明 |
|:------:|:----:|:----:|
| update:modelValue | object | 选中标签变更时触发。 |
| update:items | array | 关闭标签或拖拽重排后触发，返回新的标签列表。 |
| change | object | 选中标签变更时触发。 |
| click | object | 点击标签时触发，返回当前被点击的标签项。 |
| add | event | 点击添加按钮时触发。 |
| close | object | 关闭标签时触发，返回 `event`、`item`、`items` 和 `index`。 |
| reorder | object | 拖拽重排完成后触发，返回 `item`、`items`、`from` 和 `to`。 |
