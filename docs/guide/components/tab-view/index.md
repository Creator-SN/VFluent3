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

## Quick Start

### Default

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

### With Add Button

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

## Item Structure

---

```js
[
    {
        key: 'explorer',
        name: 'Explorer',
        icon: 'FolderHorizontal'
    },
    {
        key: 'docs',
        name: 'Docs',
        img: '/logo.png'
    },
    {
        key: 'welcome',
        title: 'Welcome',
        icon: 'Home',
        closable: false
    }
]
```

## Properties

---
|       Property        |      Type       | Required |       Default       |                                                   Description                                                   |
| :-------------------: | :-------------: | :------: | :-----------------: | :-------------------------------------------------------------------------------------------------------------: |
|      modelValue       |     object      |    No    |        null         |                                          Currently selected tab item.                                           |
|         items         |      array      |    No    | `[{ name: 'Tab' }]` | Tab item list. Each item usually uses `key`, `name` or `title`, plus optional `icon`, `img`, `image`, or `src`. |
|       itemWidth       | number / string |    No    |         180         |                                          Unified width for every tab.                                           |
|      itemHeight       | number / string |    No    |         38          |                                                   Tab height.                                                   |
|        padding        |     string      |    No    |         ''          |                                         Outer padding of the component.                                         |
|     borderRadius      | number / string |    No    |          8          |                                              Outer border radius.                                               |
|      foreground       |     string      |    No    |         ''          |                                       Text and icon color of normal tabs.                                       |
|   choosenForeground   |     string      |    No    |         ''          |                                    Text and icon color of the selected tab.                                     |
|   chooseBackground    |     string      |    No    |         ''          |                                         Background of the selected tab.                                         |
|      background       |     string      |    No    |         ''          |                                        Background of the whole TabView.                                         |
|       fontSize        | number / string |    No    |         13          |                                          Font size of the tab title.                                           |
|    imgBorderRadius    | number / string |    No    |          4          |                                          Border radius for tab images.                                          |
|       draggable       |     boolean     |    No    |        true         |                                 Whether tabs can be reordered by drag and drop.                                 |
|       closable        |     boolean     |    No    |        true         |            Whether tabs show a close button by default. Items can set `closable: false` to opt out.             |
|     showAddButton     |     boolean     |    No    |        false        |                                Whether to show the add button on the right side.                                |
|     addButtonIcon     |     string      |    No    |        'Add'        |                                    Fluent icon name used by the add button.                                     |
|  addButtonBackground  |     string      |    No    |         ''          |                                          Background of the add button.                                          |
|  addButtonForeground  |     string      |    No    |         ''          |                                       Foreground color of the add button.                                       |
|    closeButtonIcon    |     string      |    No    |    'ChromeClose'    |                                   Fluent icon name used by the close button.                                    |
|     closeIconSize     | number / string |    No    |         10          |                                         Icon size of the close button.                                          |
| closeButtonForeground |     string      |    No    |         ''          |                                      Foreground color of the close button.                                      |
|         theme         |     string      |    No    |      'global'       |                    Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`.                     |
|       disabled        |     boolean     |    No    |        false        |                                          Disable the whole component.                                           |
|         lang          |     string      |    No    |      'global'       |                                  Language option inherited from common props.                                   |

## Events

---
|       Event       | Arguments |                                  Description                                   |
| :---------------: | :-------: | :----------------------------------------------------------------------------: |
| update:modelValue |  object   |                    Triggered when the selected tab changes.                    |
|   update:items    |   array   |             Triggered after drag reordering updates the tab list.              |
|      change       |  object   |                    Triggered when the selected tab changes.                    |
|        add        |   event   |                   Triggered when the add button is clicked.                    |
|       close       |  object   | Triggered when a tab is closed. Returns `event`, `item`, `items`, and `index`. |
|      reorder      |  object   |  Triggered after drag reordering. Returns `item`, `items`, `from`, and `to`.   |
