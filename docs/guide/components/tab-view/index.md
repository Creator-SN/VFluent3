---
page: true
title: TabView
---

<!-- lang-switch -->
### TabView-Demo
---

<script>
export default {
    data () {
        return {
            value: null,
            items: [
                {
                    key: 'explorer',
                    name: 'Explorer',
                    icon: 'FolderHorizontal'
                },
                {
                    key: 'search',
                    name: 'Search',
                    icon: 'Search'
                },
                {
                    key: 'docs',
                    name: 'Docs',
                    img: 'https://img.icons8.com/color/48/microsoft.png'
                },
                {
                    key: 'welcome',
                    title: 'Welcome',
                    icon: 'Home',
                    closable: false
                }
            ],
            manyItemsValue: null,
            manyItems: [
                { key: 'welcome', name: 'Welcome', icon: 'Home', closable: false },
                { key: 'explorer', name: 'Explorer', icon: 'FolderHorizontal' },
                { key: 'search', name: 'Search', icon: 'Search' },
                { key: 'extensions', name: 'Extensions', icon: 'Puzzle' },
                { key: 'source-control', name: 'Source Control', icon: 'Repo' },
                { key: 'terminal', name: 'Terminal', icon: 'CommandPrompt' },
                { key: 'settings', name: 'Settings', icon: 'Settings' },
                { key: 'profile', name: 'Profile', icon: 'Contact' },
                { key: 'notifications', name: 'Notifications', icon: 'Ringer' },
                { key: 'release-notes', name: 'Release Notes', icon: 'ReadingMode' },
                { key: 'feedback', name: 'Feedback', icon: 'Feedback' }
            ],
            dynamicValue: null,
            dynamicItems: [
                { key: 'home', name: 'Home', icon: 'Home', closable: false },
                { key: 'activity', name: 'Activity', icon: 'Timeline' },
                { key: 'design', name: 'Design', icon: 'Design' }
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
                { name: 'Scratch', icon: 'Edit' },
                { name: 'Notes', icon: 'StickyNotes' },
                { name: 'Preview', icon: 'View' },
                { name: 'Draft', icon: 'Document' }
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

### TabView-Many Items
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
                { key: 'welcome', name: 'Welcome', icon: 'Home', closable: false },
                { key: 'explorer', name: 'Explorer', icon: 'FolderHorizontal' },
                { key: 'search', name: 'Search', icon: 'Search' },
                { key: 'extensions', name: 'Extensions', icon: 'Puzzle' },
                { key: 'source-control', name: 'Source Control', icon: 'Repo' },
                { key: 'terminal', name: 'Terminal', icon: 'CommandPrompt' },
                { key: 'settings', name: 'Settings', icon: 'Settings' },
                { key: 'profile', name: 'Profile', icon: 'Contact' },
                { key: 'notifications', name: 'Notifications', icon: 'Ringer' },
                { key: 'release-notes', name: 'Release Notes', icon: 'ReadingMode' },
                { key: 'feedback', name: 'Feedback', icon: 'Feedback' }
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

### TabView-Add Random Item
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
                { key: 'home', name: 'Home', icon: 'Home', closable: false },
                { key: 'activity', name: 'Activity', icon: 'Timeline' },
                { key: 'design', name: 'Design', icon: 'Design' }
            ],
            tabSeed: 1
        }
    },
    methods: {
        handleAdd() {
            const presets = [
                { name: 'Scratch', icon: 'Edit' },
                { name: 'Notes', icon: 'StickyNotes' },
                { name: 'Preview', icon: 'View' },
                { name: 'Draft', icon: 'Document' }
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

Click the `+` button to append a casual new tab item into the list.

</ClientOnly>

### Data
---

1. items

```javascript
items = [
    {
        key: 'explorer',
        name: 'Explorer',
        title: 'Explorer',
        show: true,
        disabled: false,
        draggable: true,
        closable: true,
        icon: 'FolderHorizontal',
        img: ''
    }
]
```

### Properties
---
| Property | Type | Required | Default | Description |
|:--------:|:----:|:--------:|:-------:|:-----------:|
| modelValue | object | No | `null` | Currently selected tab item. |
| items | array | No | `[{ name: 'Tab' }]` | Tab item list. Each item usually uses `key`, `name` or `title`, plus optional `icon`, `img`, `image`, or `src`. |
| itemWidth | number / string | No | `180` | Unified width for every tab. |
| itemHeight | number / string | No | `38` | Tab height. |
| padding | string | No | `''` | Outer padding of the component. |
| borderRadius | number / string | No | `8` | Outer border radius. |
| foreground | string | No | `''` | Text and icon color of normal tabs. |
| choosenForeground | string | No | `''` | Text and icon color of the selected tab. |
| chooseBackground | string | No | `''` | Background of the selected tab. |
| background | string | No | `''` | Background of the whole TabView. |
| hoverBackground | string | No | `''` | Background of a tab while hovering. |
| activeBackground | string | No | `''` | Background of a tab while active. |
| fontSize | number / string | No | `13` | Font size of the tab title. |
| imgBorderRadius | number / string | No | `4` | Border radius for tab images. |
| draggable | boolean | No | `true` | Whether tabs can be reordered by drag and drop. |
| closable | boolean | No | `true` | Whether tabs show a close button by default. Items can set `closable: false` to opt out. |
| showAddButton | boolean | No | `false` | Whether to show the add button on the right side. |
| addButtonIcon | string | No | `'Add'` | Fluent icon name used by the add button. |
| addButtonBackground | string | No | `''` | Background of the add button. |
| addButtonForeground | string | No | `''` | Foreground color of the add button. |
| closeButtonIcon | string | No | `'ChromeClose'` | Fluent icon name used by the close button. |
| closeIconSize | number / string | No | `10` | Icon size of the close button. |
| closeButtonForeground | string | No | `''` | Foreground color of the close button. |
| theme | string | No | `'global'` | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled | boolean | No | `false` | Disable the whole component. |
| lang | string | No | `'global'` | Language option inherited from common props. |

### Emits
---
| Event | Arguments | Description |
|:-----:|:---------:|:-----------:|
| update:modelValue | object | Triggered when the selected tab changes. |
| update:items | array | Triggered after close or drag reordering updates the tab list. |
| change | object | Triggered when the selected tab changes. |
| add | event | Triggered when the add button is clicked. |
| close | object | Triggered when a tab is closed. Returns `event`, `item`, `items`, and `index`. |
| reorder | object | Triggered after drag reordering. Returns `item`, `items`, `from`, and `to`. |
