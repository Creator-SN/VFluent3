---
page: true
title: TableView
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
export default {
  data() {
    return {
        obj: {
            heads: [
                {
                    key: 'name',
                    name: 'Name',
                    emoji: '😂',
                    type: 'text',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'age',
                    name: 'Age',
                    emoji: '👴',
                    type: 'number',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'time',
                    name: 'Time',
                    emoji: '🕒',
                    type: 'date',
                    timeFormat: '12',
                    showEndDate: true,
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'email',
                    name: 'Email',
                    emoji: '@',
                    type: 'email',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'age1',
                    name: 'Age',
                    emoji: '👴',
                    type: 'number',
                    minWidth: 60,
                    width: 100
                },
                {
                    key: 'time1',
                    name: 'Time',
                    emoji: '🕒',
                    type: 'date',
                    minWidth: 60,
                    width: 100
                }
            ],
            rows: [
                {
                    name: 'Tom',
                    age: 18,
                    email: 'tom@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Jerry',
                    age: 20,
                    email: 'Jerry@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Minskiter',
                    age: 20,
                    email: 'Minskiter@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'PCPower',
                    age: 20,
                    email: 'PCPower@cat.com',
                    time: '2020-01-01 12:00:00'
                },
                {
                    name: 'Lina Bell',
                    age: 20,
                    email: 'fatbabby@cat.com',
                    time: '2020-01-01 12:00:00'
                }
            ]
        }
    }
  },
  methods: {
  }
}
</script>

<fv-TableView v-model="obj" style="width: 100%; height: auto;">
</fv-TableView>

<div style="width: 100%; height: 1000px;"></div>

### Properties
---
| Property            | Type     | Required | Default               | Description                                                              |
|:-------------------:|:--------:|:--------:|:---------------------:|:------------------------------------------------------------------------:|
| modelValue          | object   | No       | {}                    | See the TableView `modelValue` option.                                   |
| i18n                | function | No       | (key) => key          | See the TableView `i18n` option.                                         |
| foreground          | string   | No       | 'rgba(0, 90, 158, 1)' | Theme color.                                                             |
| deleteColumnFunc    | function | No       | null                  | See the TableView `deleteColumnFunc` option.                             |
| deleteRowsFunc      | function | No       | null                  | See the TableView `deleteRowsFunc` option.                               |
| copyTableFunc       | function | No       | null                  | See the TableView `copyTableFunc` option.                                |
| pastedTableFunc     | function | No       | null                  | See the TableView `pastedTableFunc` option.                              |
| syncRowsFunc        | function | No       | null                  | See the TableView `syncRowsFunc` option.                                 |
| rightMenuBackground | string   | No       | ''                    | See the TableView `rightMenuBackground` option.                          |
| extensions          | array    | No       | []                    | Extensions.                                                              |
| theme               | string   | No       | 'global'              | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| disabled            | boolean  | No       | false                 | See the TableView `disabled` option.                                     |
| lang                | string   | No       | "global"              | See the TableView `lang` option.                                         |

### Events
---
| Event | Arguments | Description |
|:-----:|:---------:|:-----------:|
|       |           |             |

### Extensions



```javascript
{
    name: 'Text', // 列类型名称
    type: 'text', // 列类型
    icon: 'List', // 列类型图标
    emoji: '📝', // 列类型emoji
    headComponent: textHead, // 列头组件
    cellComponent: textCell, // 列单元格组件
    filter: ({ input, value }) => { // 过滤函数
        if (!input) return true;
        return (
            value.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
    },
    sortAsc: (a, b) => { // 升序排序函数
        return a.localeCompare(b);
    },
    sortDesc: (a, b) => { // 降序排序函数
        return b.localeCompare(a);
    },
    toString: value => { // 转换为字符串函数
        return value;
    }
}
```









- index.js:

```javascript
import { markRaw } from 'vue';
import numberHead from './numberHead.vue';
import numberCell from './numberCell.vue';

export default {
    name: 'Number',
    type: 'number',
    icon: 'NumberField',
    emoji: '🔢',
    headComponent: markRaw(numberHead),
    cellComponent: markRaw(numberCell),
    filter: ({ input, value }) => {
        if (!input) return true;
        return (
            input === value
        );
    },
    sortAsc: (a, b) => {
        return a.localeCompare(b);
    },
    sortDesc: (a, b) => {
        return b.localeCompare(a);
    }
}
```

- numberHead.vue:



```vue
<template>
    <fv-table-view-head-base
        :value="value"
        :index="index"
        :i18n="i18n"
        :foreground="foreground"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :theme="theme"
        :wrapperWidth="'260px'"
        :dragItem="dragItem"
        :formatFunction="formatNumberHead"
        @duplicate-column="$emit('duplicate-column', $event)"
        @drop-item="$emit('drop-item', $event)"
        @delete-column="$emit('delete-column', $event)"
    >
        <template v-slot:default>
            ...
        </template>
        <template v-slot:entire>
            ...
        </template>
        <template v-slot:menu>
            ...
        </template>
    </fv-table-view-head-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: ''
        },
        dragItem: {
            type: Object,
            default: null
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    ...,
    methods: {
        formatNumberHead(value) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '🔢',
                type: 'number',
                minWidth: 60,
                width: 100,
                numberFormat: 'Number',
                showAs: 'number',
                showColor: '#958DF1',
                divideBy: 100,
                showNumber: true,
                fixed: false,
                fixedSide: false,
                wrap: false,
                visible: true
            };
            for (let key in defaultHead) {
                if (!value[key]) value[key] = defaultHead[key];
            }
            if (!value.__guid) value.__guid = this.GuidWithoutDash();
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    }
};
</script>
```



- numberCell.vue:



```vue
<template>
    <fv-table-view-cell-base
        :value="value"
        :head="head"
        :i18n="i18n"
        :selectPos="selectPos"
        :foreground="foreground"
        :row_index="row_index"
        :col_index="col_index"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :formatFunction="formatNumberCell"
        :theme="theme"
        @drop-item="$emit('drop-item', $event)"
        @set-select="$emit('set-select', $event)"
    >
        <template v-slot:default>
            ...
        </template>
        <template v-slot:entire>
            ...
        </template>
    </fv-table-view-cell-base>
</template>

<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({})
        },
        head: {
            type: Object,
            default: () => ({})
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        selectPos: {
            type: Object,
            default: () => ({})
        },
        foreground: {
            default: ''
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        row_index: {
            type: Number,
            default: 0
        },
        col_index: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    ...,
    methods: {
        formatNumberCell(value) {
            ...
        },
        GuidWithoutDash() {
            ...
        }
    }
};
</script>
```
