---
page: true
title: RatingControl
---


<!-- lang-switch -->
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

### Properties
---
| Property      | Type    | Required | Default            | Description                                   |
|:-------------:|:-------:|:--------:|:------------------:|:---------------------------------------------:|
| modelValue    | number  | No       | 0                  | See the RatingControl `modelValue` option.    |
| maxRate       | number  | No       | 5                  | See the RatingControl `maxRate` option.       |
| halfRate      | boolean | No       | false              | See the RatingControl `halfRate` option.      |
| defaultIcon   | string  | No       | 'FavoriteStar'     | See the RatingControl `defaultIcon` option.   |
| selectedIcon  | string  | No       | 'FavoriteStarFill' | See the RatingControl `selectedIcon` option.  |
| borderColor   | string  | No       | ''                 | Border color.                                 |
| selectedColor | string  | No       | ''                 | See the RatingControl `selectedColor` option. |
| isClear       | boolean | No       | false              | See the RatingControl `isClear` option.       |
| readonly      | boolean | No       | false              | See the RatingControl `readonly` option.      |
| theme         | string  | No       | 'global'           | Theme color.                                  |
| disabled      | boolean | No       | false              | See the RatingControl `disabled` option.      |
| lang          | string  | No       | "global"           | See the RatingControl `lang` option.          |



### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| change | Number    | See the component `change` option. |
| hover  | Object    | See the component `hover` option.  |
| leave  | Number    | See the component `leave` option.  |
