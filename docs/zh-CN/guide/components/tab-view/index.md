---
page: true
title: TabView
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
            ]
        }
    },
    mounted () {
        this.value = this.items[0]
    },
    methods: {
        handleAdd() {
            console.log('add')
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

# TabView

## 快速开始

### 默认

---

<ClientOnly>
<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
>
</fv-tab-view>
</ClientOnly>

```vue
<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
>
</fv-tab-view>
```

### 带添加按钮

---

<ClientOnly>
<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
    showAddButton
    @add="handleAdd"
    @close="handleClose"
    @reorder="handleReorder"
>
</fv-tab-view>
</ClientOnly>

```vue
<fv-tab-view
    v-model="value"
    :items="items"
    :itemWidth="150"
    showAddButton
    @add="handleAdd"
    @close="handleClose"
    @reorder="handleReorder"
>
</fv-tab-view>

<script>
export default {
    methods: {
        handleAdd() {
            console.log('add')
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
```

## 数据结构

---

```js
[
    {
        key: 'explorer',
        name: '资源管理器',
        icon: 'FolderHorizontal'
    },
    {
        key: 'docs',
        name: '文档',
        img: '/logo.png'
    },
    {
        key: 'welcome',
        title: '欢迎',
        icon: 'Home',
        closable: false
    }
]
```

## 属性

---
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:----:|:----:|:----:|:------:|:----:|
| modelValue | object | 否 | null | 当前选中的标签项。 |
| items | array | 否 | `[{ name: 'Tab' }]` | 标签页数据列表。单项数据通常使用 `key`、`name` 或 `title`，并可选搭配 `icon`、`img`、`image` 或 `src`。 |
| itemWidth | number / string | 否 | 180 | 所有标签统一宽度。 |
| itemHeight | number / string | 否 | 38 | 标签高度。 |
| padding | string | 否 | '' | 组件外层内边距。 |
| borderRadius | number / string | 否 | 8 | 组件外层圆角。 |
| foreground | string | 否 | '' | 普通标签的文字和图标颜色。 |
| choosenForeground | string | 否 | '' | 选中标签的文字和图标颜色。 |
| chooseBackground | string | 否 | '' | 选中标签的背景色。 |
| background | string | 否 | '' | 整个 TabView 的背景色。 |
| iconSize | number / string | 否 | 16 | 标签图标和添加按钮图标尺寸。 |
| imgBorderRadius | number / string | 否 | 4 | 标签图片圆角。 |
| draggable | boolean | 否 | true | 是否允许拖拽调整标签顺序。 |
| closable | boolean | 否 | true | 是否默认显示关闭按钮。单项可通过 `closable: false` 单独关闭。 |
| showAddButton | boolean | 否 | false | 是否显示右侧添加按钮。 |
| addButtonIcon | string | 否 | 'Add' | 添加按钮使用的 Fluent 图标名称。 |
| addButtonBackground | string | 否 | '' | 添加按钮背景色。 |
| addButtonForeground | string | 否 | '' | 添加按钮前景色。 |
| closeButtonIcon | string | 否 | 'ChromeClose' | 关闭按钮使用的 Fluent 图标名称。 |
| closeIconSize | number / string | 否 | 10 | 关闭按钮图标尺寸。 |
| closeButtonForeground | string | 否 | '' | 关闭按钮前景色。 |
| theme | string | 否 | 'global' | 主题样式，支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| disabled | boolean | 否 | false | 是否禁用整个组件。 |
| lang | string | 否 | 'global' | 从公共属性继承的语言选项。 |

## 事件

---
| 事件名 | 参数 | 说明 |
|:------:|:----:|:----:|
| update:modelValue | object | 选中标签变化时触发。 |
| update:items | array | 拖拽重排后触发，返回新的标签列表。 |
| change | object | 选中标签变化时触发。 |
| add | event | 点击添加按钮时触发。 |
| close | object | 关闭标签时触发，返回 `event`、`item`、`items` 和 `index`。 |
| reorder | object | 拖拽重排完成后触发，返回 `item`、`items`、`from`、`to`。 |
