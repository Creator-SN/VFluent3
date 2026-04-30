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
                    closable: false
                }
            ],
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
            ],
            dynamicValue: null,
            dynamicItems: [
                { key: 'home', name: '首页', icon: 'Home', closable: false },
                { key: 'activity', name: '活动', icon: 'Timeline' },
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

### TabView-点击加号添加随机项目
---

<fv-tab-view
    v-model="dynamicValue"
    :items="dynamicItems"
    :itemWidth="150"
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
        icon: 'FolderHorizontal',
        img: ''
    }
]
```

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
| showAddButton | boolean | 否 | `false` | 是否显示右侧添加按钮。 |
| addButtonIcon | string | 否 | `'Add'` | 添加按钮使用的 Fluent 图标名。 |
| addButtonBackground | string | 否 | `''` | 添加按钮背景色。 |
| addButtonForeground | string | 否 | `''` | 添加按钮前景色。 |
| closeButtonIcon | string | 否 | `'ChromeClose'` | 关闭按钮使用的 Fluent 图标名。 |
| closeIconSize | number / string | 否 | `10` | 关闭按钮图标大小。 |
| closeButtonForeground | string | 否 | `''` | 关闭按钮前景色。 |
| theme | string | 否 | `'global'` | 主题样式，支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled | boolean | 否 | `false` | 是否禁用整个组件。 |
| lang | string | 否 | `'global'` | 从公共属性继承的语言选项。 |

### 事件
---
| 事件名 | 参数 | 说明 |
|:------:|:----:|:----:|
| update:modelValue | object | 选中标签变更时触发。 |
| update:items | array | 关闭标签或拖拽重排后触发，返回新的标签列表。 |
| change | object | 选中标签变更时触发。 |
| add | event | 点击添加按钮时触发。 |
| close | object | 关闭标签时触发，返回 `event`、`item`、`items` 和 `index`。 |
| reorder | object | 拖拽重排完成后触发，返回 `item`、`items`、`from` 和 `to`。 |
