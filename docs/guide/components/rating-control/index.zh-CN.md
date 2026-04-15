---
page: true
title: RatingControl
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### RatingControl-DEMO
---

<script>
export default {

    data () {
        return {
            value: 2.5
        }
    },
    methods: {
        hoverValue (target) {
            this.value = target.index + (target.ratio > 50 ? 0.5 : 0);
        }
    }
}
</script>

<fv-RatingControl value="3">
</fv-RatingControl>

```vue
<fv-RatingControl value="3">
</fv-RatingControl>
```

### RatingControl-Half Rate
--- 

<fv-RatingControl value="2.5" :halfRate="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="2.5" :halfRate="true">
</fv-RatingControl>
```

with Hover Title

<fv-RatingControl v-model="value" :halfRate="true" @hover="hoverValue">
</fv-RatingControl>

<p>{{value}}</p>

```vue
<fv-RatingControl v-model="value" :halfRate="true" @hover="hoverValue">
</fv-RatingControl>

<script>
export default {

    data () {
        return {
            value: 2.5
        }
    },
    methods: {
        hoverValue (target) {
            this.value = target.index + (target.ratio > 50 ? 0.5 : 0);
        }
    }
}
</script>
```

### RatingControl-Clearable
--- 

<fv-RatingControl value="2.5" :halfRate="true" :isClear="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="2.5" :halfRate="true" :isClear="true">
</fv-RatingControl>
```

### RatingControl-Readonly
--- 

<fv-RatingControl value="3.5" :halfRate="true" :isClear="true" readonly>
</fv-RatingControl>

```vue
<fv-RatingControl value="3.5" :halfRate="true" :isClear="true" readonly>
</fv-RatingControl>
```

### RatingControl-Customize
--- 

<fv-RatingControl value="1.5" defaultIcon="Heart" selectedIcon="HeartFill" borderColor="rgba(200, 200, 200, 1)" selectedColor="rgba(173, 38, 45, 1)" :halfRate="true" :isClear="true">
</fv-RatingControl>

```vue
<fv-RatingControl value="1.5" defaultIcon="Heart" selectedIcon="HeartFill" borderColor="rgba(200, 200, 200, 1)" selectedColor="rgba(173, 38, 45, 1)" :halfRate="true" :isClear="true">
</fv-RatingControl>
```

### 属性
---
| 属性          | 类型    | 必填  | 默认值             | 说明                         |
|:-------------:|:-------:|:-----:|:------------------:|:----------------------------:|
| modelValue    | number  | 否    | 0                  | 分值。                       |
| maxRate       | number  | 否    | 5                  | 最大值。                     |
| halfRate      | boolean | 否    | false              | 是否允许半分。               |
| defaultIcon   | string  | 否    | 'FavoriteStar'     | 默认图标。                   |
| selectedIcon  | string  | 否    | 'FavoriteStarFill' | 选中图标。                   |
| borderColor   | string  | 否    | ''                 | 边框颜色。                   |
| selectedColor | string  | 否    | ''                 | 选中颜色。                   |
| isClear       | boolean | 否    | false              | 是否允许清除。               |
| readonly      | boolean | 否    | false              | 只读。                       |
| theme         | string  | 否    | 'global'           | 主题色。                     |
| disabled      | boolean | 否    | false              | 参见组件的 `disabled` 选项。 |
| lang          | string  | 否    | "global"           | 参见组件的 `lang` 选项。     |



### 事件
---
| 事件名 | 参数   | 说明             |
|:------:|:------:|:----------------:|
| change | Number | 分值改变时触发。 |
| hover  | Object | 鼠标悬浮时触发。 |
| leave  | Number | 鼠标离开时触发。 |
