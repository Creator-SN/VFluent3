---
page: true
title: DatePicker
---

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


### Propoties
---
|     属性(attr)     |             类型(type)             | 必填(required) |      默认值(default)       |   说明(statement)   |
| :----------------: | :--------------------------------: | :------------: | :------------------------: | :-----------------: |
|      v-model       |               [Date]               |       No       |            Date            |     绑定的时间      |
|       theme        | ['system','dark','light','custom'] |       No       |          'system'          |       主题色        |
|       months       |               Array                |       No       | ["January","February",...] |    月份显示数组     |
|       weeks        |               Array                |       No       |     ["Sun.","Mon."...]     |    星期显示输出     |
|      hideYear      |              Boolean               |       No       |           false            |    是否隐藏年份     |
|     hideMonth      |              Boolean               |       No       |           false            |    是否隐藏月份     |
|      hideDay       |              Boolean               |       No       |           false            |    是否隐藏天数     |
|      showWeek      |              Boolean               |       No       |           false            |    是否显示星期     |
|  inputBackground   |               String               |       No       |            N/A             |    输入框背景色     |
|  innerBorderColor  |               String               |       No       |            N/A             |    内部边框颜色     |
|  optionBackground  |               String               |       No       |            N/A             |    选择器背景色     |
| slideBtnBackground |               String               |       No       |            N/A             | 滑动按钮Hover背景色 |
|      disabled      |              Boolean               |       No       |           false            |   是否禁用选项框    |
|     hoverColor     |               String               |       No       |         undefined          |  选项的Hover背景色  |

### Events
---
| 事件名(Name) | 参数类型(args) |    说明(statement)     |
| :----------: | :------------: | :--------------------: |
|    change    |                | 当选中的时间发生变化时 |
  
