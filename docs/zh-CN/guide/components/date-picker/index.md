---
page: true
title: DatePicker
---


<!-- lang-switch -->
<script>
  export default {
    data(){
      return {
        theme:0,
        date:new Date()
      }
    },
    computed:{
      $theme(){
        return !this.theme?'light':'dark';
      },
      divStyle(){
        if (this.$theme=='light'){
          return {
            backgroundColor:'#fff',
            padding:'20px',
            color:'#000',
          }
        }else{
          return {
            backgroundColor:'#000',
            padding:'20px',
            color:'#fff',
          }
        }
      },
    }
  }
</script>

### DatePicker-Default

<ClientOnly>
<fv-DatePicker v-model="date" >
</fv-DatePicker>
</ClientOnly>

``` vue
<fv-DatePicker v-model="date" >
</fv-DatePicker>
```

### DatePicker-Simple

<ClientOnly>
<fv-DatePicker v-model="date" :hideYear="true">
</fv-DatePicker>
</ClientOnly>

``` vue
<fv-DatePicker v-model="date"  :hideYear="true">
</fv-DatePicker>
```

### DatePicker-Full

<ClientOnly>
<fv-DatePicker v-model="date"  :showWeek="true">
</fv-DatePicker>
</ClientOnly>

``` vue
<fv-DatePicker v-model="date" :showWeek="true">
</fv-DatePicker>
```

### DatePicker-Disabled

<ClientOnly>
<fv-DatePicker v-model="date"  :showWeek="true" disabled>
</fv-DatePicker>
</ClientOnly>

``` vue
<fv-DatePicker v-model="date" :showWeek="true">
</fv-DatePicker>
```

### DatePicker-Custom

<ClientOnly>
<fv-DatePicker 
v-model="date" 
:showWeek="true" 
inputBackground="rgba(0, 90, 204, 0.6)"
innerBorderColor="rgba(0, 90, 204, 0.1)"
optionBackground="rgba(0, 90, 204, 0.1)"
slideBtnBackground="rgba(29, 37, 61, 1)"
selectedBackground="rgba(200, 200, 220, 0.9)"
hoverColor="rgba(0, 153, 204, 0.1)"
>
</fv-DatePicker>
</ClientOnly>

``` vue
<fv-DatePicker 
  v-model="date" 
  :showWeek="true" 
  inputBackground="rgba(0, 90, 204, 0.6)"
  innerBorderColor="rgba(0, 90, 204, 0.1)"
  optionBackground="rgba(0, 90, 204, 0.1)"
  slideBtnBackground="rgba(29, 37, 61, 1)"
  selectedBackground="rgba(200, 200, 220, 0.9)"
  hoverColor="rgba(0, 153, 204, 0.1)"
>
</fv-DatePicker>

<style>
  .custom_style{
    background-color: rgb(0, 204, 153);
    border:1px solid rgb(0, 204, 153);
    color:white;
  }
  .custom_style:hover{
    border:1px solid rgb(0, 204, 153);
    background-color: rgb(0, 204, 153,0.8);
  }
</style>
```


### 属性
---
| 属性               | 类型    | 必填  | 默认值                                                                                                                       | 说明                                   |
|:------------------:|:-------:|:-----:|:----------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------:|
| modelValue         | Date    | 否    | () => new Date()                                                                                                             | 绑定的时间。                           |
| theme              | string  | 否    | 'global'                                                                                                                     | 主题色。                               |
| months             | array   | 否    | [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] | 月份显示数组。                         |
| weeks              | array   | 否    | ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']                                                                     | 星期显示输出。                         |
| hideYear           | boolean | 否    | false                                                                                                                        | 是否隐藏年份。                         |
| hideMonth          | boolean | 否    | false                                                                                                                        | 是否隐藏月份。                         |
| hideDay            | boolean | 否    | false                                                                                                                        | 是否隐藏天数。                         |
| showWeek           | boolean | 否    | false                                                                                                                        | 是否显示星期。                         |
| inputBackground    | string  | 否    | ''                                                                                                                           | 输入框背景色。                         |
| innerBorderColor   | string  | 否    | 'rgba(200, 200, 200, 0.3)'                                                                                                   | 内部边框颜色。                         |
| optionBackground   | string  | 否    | ''                                                                                                                           | 选择器背景色。                         |
| slideBtnBackground | string  | 否    | ''                                                                                                                           | 滑动按钮Hover背景色。                  |
| disabled           | boolean | 否    | false                                                                                                                        | 是否禁用选项框。                       |
| hoverColor         | string  | 否    | undefined                                                                                                                    | 选项的Hover背景色。                    |
| selectedBackground | string  | 否    | ''                                                                                                                           | 参见组件的 `selectedBackground` 选项。 |
| reverseLayout      | boolean | 否    | false                                                                                                                        | 参见组件的 `reverseLayout` 选项。      |
| lang               | string  | 否    | "global"                                                                                                                     | 参见组件的 `lang` 选项。               |

### 事件
---
| 事件名 | 参数  | 说明                     |
|:------:|:-----:|:------------------------:|
| change |       | 当选中的时间发生变化时。 |
