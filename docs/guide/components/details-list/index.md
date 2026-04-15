---
page: true
title: DetailsList
--- 

<!-- lang-switch -->
### DetailsList-DEMO
---

<script>
export default {
    data () {
        return {
            value: [
                {
                  id: "",
                  name: "Windows 10（2019 年 11 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:37:41 PM",
                  update_time: "2019/10/10 1:37:41 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:05:21 PM",
                  update_time: "2019/10/10 7:59:50 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "macOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:23 PM",
                  update_time: "2019/10/10 7:59:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Android",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:45 PM",
                  update_time: "2019/10/10 7:12:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "iOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:29 PM",
                  update_time: "2019/10/10 7:12:29 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Windows 10（2019 年 5 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSC"
                  },
                  publish_time: "2019/10/10 6:51:07 PM",
                  update_time: "2019/10/10 6:51:07 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 10（2018 年 10 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:30:10 PM",
                  update_time: "2019/10/10 6:50:34 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Visual Studio Download Center",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:26:39 PM",
                  update_time: "2019/10/10 1:26:39 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio Code",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:23:46 PM",
                  update_time: "2019/10/10 1:23:46 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:17:24 PM",
                  update_time: "2019/10/10 1:17:24 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Microsoft Office 365",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 10:32:18 AM",
                  update_time: "2019/10/10 10:32:18 AM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 7",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 4:24:17 PM",
                  update_time: "2019/10/10 3:46:50 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 8",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:29:59 PM",
                  update_time: "2019/10/10 3:46:44 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2013",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:02 AM",
                  update_time: "2019/10/10 3:46:20 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2016",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:12 AM",
                  update_time: "2019/10/10 3:46:14 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft Office 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:16 AM",
                  update_time: "2019/10/10 3:46:05 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 8.1",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:37 PM",
                  update_time: "2019/10/10 3:40:37 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows Vista",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:30 PM",
                  update_time: "2019/10/10 3:40:30 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows XP ",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:22 PM",
                  update_time: "2019/10/10 3:40:22 PM",
                  prop: "Windows"
                }
          ],
          head: [{
                  content: "Name",
                  minWidth: 60,
                  width: 80,
                  sortName: "name",
                  visible: true
              }, {
                  content: "Publisher",
                  minWidth: 60,
                  width: 80,
                  sortName: "publisher",
                  visible: true
              }, {
                  content: "Publish Time",
                  minWidth: 60,
                  width: 190,
                  sortName: "publish_time",
                  visible: true
              }, {
                  content: "Prop",
                  minWidth: 60,
                  width: 92,
                  sortName: "prop",
                  visible: true
              }, {
                  content: "User Name",
                  minWidth: 60,
                  width: 80,
                  visible: true
          }],
          group: [
              {
                  key: "prop",
                  value: "Windows",
                  name: "A"
              },
              {
                  key: "prop",
                  value: "Edge",
                  name: "B"
              },
              {
                  key: "prop",
                  value: "Office",
                  name: "C"
              },
              {
                  key: "prop",
                  value: "Visual Studio",
                  name: "D"
              }
          ],
          multiSelection: false,
          compact: false,
          filter: {
              key: "name",
              value: ""
          }
        }
    }
}
</script>

<style lang="scss">
.fv-row-css
{
    &:nth-child(odd)
    {
        background: rgba(239, 239, 239, 1);
    }

    &:nth-child(even)
    {
        background: rgba(245, 245, 245, 1);
    }
}
</style>

<ClientOnly>
<div>
    <fv-text-box v-model="filter.value" placeholder="Filter by name"></fv-text-box>
    <fv-toggle-switch v-model="multiSelection" on="Multi-Selection" off="Single-Selection"></fv-toggle-switch>
    <fv-toggle-switch v-model="compact" on="Compact" off="Normal"></fv-toggle-switch>
    <div style="padding: 15px; 0px; display: flex; overflow-x: auto;">
        <fv-check-box v-model="item.visible" v-for="(item, index) in head" :key="index" style="margin-right: 5px;">{{item.visible ? 'Show' : 'Hide'}} {{item.content}}</fv-check-box>
    </div>
    <fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList v-model="value" :head="head">
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList-Allow Drag

---

<ClientOnly>
<div>
    <fv-DetailsList v-model="value" :head="head" :multiSelection="true" :compact="compact" :allowDrag="true">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="true"
  :compact="compact"
  :allowDrag="true"
>
      <template v-slot:column_0="x">
          <p>{{x.item.name}}</p>
      </template>
      <template v-slot:column_1="x">
          <p class="sec">{{x.item.publisher}}</p>
      </template>
      <template v-slot:column_2="x">
          <p class="sec">{{x.item.publish_time}}</p>
      </template><template v-slot:column_3="x">
          <p class="sec">{{x.item.prop}}</p>
      </template>
      <template v-slot:column_4="x">
          <p class="sec">{{x.item.userInfo.name}}</p>
      </template>
</fv-DetailsList>
```

### DetailsList-Grouped

---
<ClientOnly>
<fv-DetailsList v-model="value" :head="head" :multiSelection="multiSelection" :compact="compact" :group="group" :showGroup="true" :allowDrag="true"><template v-slot:column_0="x"><p>{{x.item.name}}</p></template><template v-slot:column_1="x"><p class="sec">{{x.item.publisher}}</p></template><template v-slot:column_2="x"><p class="sec">{{x.item.publish_time}}</p></template><template v-slot:column_3="x"><p class="sec">{{x.item.prop}}</p></template><template v-slot:column_4="x"><p class="sec">{{x.item.userInfo.name}}</p></template></fv-DetailsList>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="multiSelection"
  :compact="compact"
  :group="group"
  :showGroup="true"
>
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList-Dark Theme

---
<ClientOnly>
<div style="position: relative; width: 100%; height: 700px; background: black;">
    <fv-DetailsList v-model="value" :head="head" :multiSelection="multiSelection" :compact="compact" :group="group" :showGroup="true" theme="dark">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
  </fv-DetailsList>
</div>
</ClientOnly>

<div style="width: 100%; height: 100px;"></div>

```vue
<fv-DetailsList
  v-model="value"
  :head="head"
  :multiSelection="multiSelection"
  :compact="compact"
>
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p>{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p>{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p>{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p>{{x.item.userInfo.name}}</p>
    </template>
  </fv-DetailsList>
```

### DetailsList Customize Row CSS

---
<ClientOnly>
<div>
    <fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact" rowCss="fv-row-css">
        <template v-slot:column_0="x">
            <p>{{x.item.name}}</p>
        </template>
        <template v-slot:column_1="x">
            <p class="sec">{{x.item.publisher}}</p>
        </template>
        <template v-slot:column_2="x">
            <p class="sec">{{x.item.publish_time}}</p>
        </template><template v-slot:column_3="x">
            <p class="sec">{{x.item.prop}}</p>
        </template>
        <template v-slot:column_4="x">
            <p class="sec">{{x.item.userInfo.name}}</p>
        </template>
    </fv-DetailsList>
</div>

</ClientOnly>

```vue
<fv-DetailsList v-model="value" :head="head" :filter="filter" :multiSelection="multiSelection" :compact="compact" rowCss="fv-row-css">
    <template v-slot:column_0="x">
        <p>{{x.item.name}}</p>
    </template>
    <template v-slot:column_1="x">
        <p class="sec">{{x.item.publisher}}</p>
    </template>
    <template v-slot:column_2="x">
        <p class="sec">{{x.item.publish_time}}</p>
    </template><template v-slot:column_3="x">
        <p class="sec">{{x.item.prop}}</p>
    </template>
    <template v-slot:column_4="x">
        <p class="sec">{{x.item.userInfo.name}}</p>
    </template>
</fv-DetailsList>
```

```scss
.fv-row-css
{
    &:nth-child(odd)
    {
        background: rgba(239, 239, 239, 1);
    }

    &:nth-child(even)
    {
        background: rgba(245, 245, 245, 1);
    }
}
```

### Properties

---

| Property            | Type    | Required | Default                                     | Description                                                              |
|:-------------------:|:-------:|:--------:|:-------------------------------------------:|:------------------------------------------------------------------------:|
| modelValue          | array   | No       | []                                          | See the DetailsList `modelValue` option.                                 |
| head                | array   | No       | []                                          | See the DetailsList `head` option.                                       |
| group               | array   | No       | []                                          | See the DetailsList `group` option.                                      |
| filter              | object  | No       | () => { return { key: 'any', value: '' }; } | See the DetailsList `filter` option.                                     |
| showGroup           | boolean | No       | false                                       | See the DetailsList `showGroup` option.                                  |
| autoHeight          | boolean | No       | false                                       | See the DetailsList `autoHeight` option.                                 |
| foreground          | string  | No       | ''                                          | See the DetailsList `foreground` option.                                 |
| headBackground      | string  | No       | ''                                          | See the DetailsList `headBackground` option.                             |
| compact             | boolean | No       | false                                       | See the DetailsList `compact` option.                                    |
| multiSelection      | boolean | No       | false                                       | See the DetailsList `multiSelection` option.                             |
| allowDrag           | boolean | No       | false                                       | See the DetailsList `allowDrag` option.                                  |
| rowCSS              | String  | No       | N/A                                         | See the DetailsList `rowCSS` option.                                     |
| rightMenuWidth      | number  | No       | 200                                         | See the DetailsList `rightMenuWidth` option.                             |
| showRightMenu       | boolean | No       | true                                        | See the DetailsList `showRightMenu` option.                              |
| rightMenuBackground | string  | No       | ''                                          | See the DetailsList `rightMenuBackground` option.                        |
| rightMenuFullExpand | boolean | No       | false                                       | See the DetailsList `rightMenuFullExpand` option.                        |
| theme               | string  | No       | 'global'                                    | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| rowCss              | string  | No       | ''                                          | See the DetailsList `rowCss` option.                                     |
| disabled            | boolean | No       | false                                       | See the DetailsList `disabled` option.                                   |
| lang                | string  | No       | "global"                                    | See the DetailsList `lang` option.                                       |

### Events

---

| Event        | Arguments                       | Description                              |
|:------------:|:-------------------------------:|:----------------------------------------:|
| change-value | 修改后的 value                  | See the component `change-value` option. |
| choose-items | currentChoose                   | See the component `choose-items` option. |
| lazyload     | 修改后的 value                  | See the component `lazyload` option.     |
| rightclick   | 当前选中的 row-item             | See the component `rightclick` option.   |
| drop-items   | 返回对象包含`transfer`和`value` | See the component `drop-items` option.   |

### Slots

---

1. Head







```vue
<template v-slot:head="x">
  <p class="default-title">{{ x.item.content }}</p>
</template>
```

2. Column









```vue
<template v-slot:column_0="x">
  <p>{{ x.item.name }}</p>
</template>
<template v-slot:column_1="x">
  <p class="sec">{{ x.item.publisher }}</p>
</template>
<template v-slot:column_2="x">
  <p class="sec">{{ x.item.publish_time }}</p> </template
><template v-slot:column_3="x">
  <p class="sec">{{ x.item.prop }}</p>
</template>
<template v-slot:column_4="x">
  <p class="sec">{{ x.item.userInfo.name }}</p>
</template>
```

3. Row Expand






```vue
<template v-slot:row_expand="x">
    <div style="position: absolute;"></div>
</template>
```

4. Group



```vue
<slot name="group" :item="gi" :index="i" :isMulti="multiSelection" :isChoose="isGroupChooseAll(gi)">
    <span v-show="multiSelection" class="icon-block icon" key="multi-col" @click="chooseGroup(gi)">
        <span class="icon" :class="{choose: isGroupChooseAll(gi)}">
            <i class="ms-Icon ms-Icon--FullCircleMask ll"></i>
            <i class="ms-Icon ms-Icon--CircleRing ll"></i>
            <i class="ms-Icon ms-Icon--Completed ll"></i>
        </span>
    </span>
    <span class="expand" :class="{choose: gi.expand}" @click="expandGroup(gi)">
        <i class="ms-Icon ms-Icon--ChevronRight"></i>
    </span>
    <span class="col">
        <p>{{gi.name}}</p>
    </span>
</slot>
```








```vue
<template v-slot:group="x">
  <p>{{ x.item.name }}</p>
</template>
```

5. Goup Content



```vue
<slot name="group_content" :item="gi" :index="i">
    <span class="col">
        <p>{{gi.name}}</p>
    </span>
</slot>
```








```vue
<template v-slot:group_content="x">
  <p>{{ x.item.name }}</p>
</template>
```

6. Context Menu



```vue
<template v-slot:menu>
  <div>
    <span>
      <i>[图标]</i>
      <p>[内容]</p>
    </span>
    ...
    <hr />
    <span>
      <i>[图标]</i>
      <p>[内容]</p>
    </span>
  </div>
</template>
```

### Data

---

1. value

```javascript
value = [{any: '', ...}]

//e.g.//

value: [{id: "", name: "", publisher: "", userInfo: {}, publish_time: "", update_time: "", prop: ""}]
```

2. head

```javascript
head = [
  {
    content: "", //默认表头的列名
    minWidth: "", //最小的列宽, 默认为60
    width: "", //初始的列宽, 默认为80
    sortName: "", //按字段名来排序, 名字为value中的属性, DetailsList将根据当前的属性类型智能排序
    customSort: {}, //自定义排序方法, 在此定义函数满足预设两个参数(itemA, itemB)分别代表value中的两项并根据用户需要自定义函数方法, 此字段定义后, sortName仍需填写, 但值可任意
    visible: true //是否显示该列, 支持函数式声明
  }
];

**特别地** 0.2.17版本后支持采用函数式字段, 其中支持的字段包括`visible`

//e.g.//

head: [
  {
    content: "Name",
    minWidth: 60,
    width: 80,
    sortName: "name",
    visible: true
  },
  {
    content: "Publisher",
    minWidth: 60,
    width: 80,
    sortName: "publisher",
    visible: true
  },
  {
    content: "Publish Time",
    minWidth: 60,
    width: 190,
    sortName: "publish_time",
    visible: true
  },
  {
    content: "Prop",
    minWidth: 60,
    width: 92,
    sortName: "prop",
    visible: true
  },
  {
    content: "User Name",
    minWidth: 60,
    width: 80,
    visible: true
  }
];
```

3. group

```javascript
group = [
  {
    key: "", //分组的键值, 键来自value的属性
    value: "", //分组的键值对应的具体值, DetailsList会根据当前的key匹配value来进行分组
    name: "" //分组的其他数据, 默认模板将以name属性来渲染名称
  }
];

//e.g.//

group: [
  {
    key: "prop",
    value: "Windows",
    name: "A"
  },
  {
    key: "prop",
    value: "Edge",
    name: "B"
  },
  {
    key: "prop",
    value: "Office",
    name: "C"
  },
  {
    key: "prop",
    value: "Visual Studio",
    name: "D"
  }
];
```

### Appendix

---












### Custom Class

---

|     类名(Name)      |                                           说明(statement)                                           |
|:-------------------:|:---------------------------------------------------------------------------------------------------:|
|   fv-custom-head    | 客制化表头, 主要递推关系: fv-custom-head -> icon-block, col -> col-content, expand -> default-title |
|    fv-custom-row    |                      客制化行, 主要递推关系: fv-custom-row -> icon-block, col                       |
| fv-custom-group-row |               客制化组, 主要递推关系: fv-custom-group-row -> icon-blocks, expand, col               |

```scss
.fv-custom-head {
  .icon-block {
    .icon {
    }
  }
  .col {
    .col-content {
      .default-title {
      }
    }

    .expand {
    }
  }
}

.fv-custom-row {
  .icon-block {
    .icon {
    }
  }
  .col {
  }
}

.fv-custom-group-row {
  &.choose {
  }

  .icon-block {
    .icon {
    }
  }
  .col {
  }

  .expand {
  }
}
```
