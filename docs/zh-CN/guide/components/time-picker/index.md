---
page: true
title: TimePicker
---


<!-- lang-switch -->
<script>
  export default {
    data(){
      return {
        theme:0,
        date:new Date(),
        timeType: true
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

### TimePicker-Default


<ClientOnly>


<ClientOnly>
  <fv-toggle-switch v-model="timeType" on="12h" off="24H" :insideContent="true" width="60" height="30" style="margin-bottom: 5px;"></fv-toggle-switch>
  <fv-TimePicker style="width:50px" v-model="date" :timeType="timeType ? 12 : 24" />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date"  />
```

### TimePicker-24-hours
<ClientOnly>
  <fv-TimePicker v-model="date" :timeType="24" />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date"  :timeType="24" />
```

### TimePicker-Disabled
<ClientOnly>
  <fv-TimePicker v-model="date":timeType="24" :disabled="true" />
</ClientOnly>

``` vue
<fv-TimePicker v-model="date" :timeType="24" :disabled="true" />
```

### TimePicker-Custom-Style

<ClientOnly>
<fv-TimePicker 
v-model="date" 
theme="dark"
class="custom_style"
inputBackground="rgba(0, 90, 204, 0.6)"
innerBorderColor="rgba(0, 90, 204, 0.1)"
optionBackground="rgba(0, 90, 204, 0.1)"
slideBtnBackground="rgba(29, 37, 61, 1)"
selectedBackground="rgba(200, 200, 220, 0.9)"
hoverColor="rgba(0, 153, 204, 0.1)"
>
</fv-TimePicker>
</ClientOnly>

``` vue
<fv-TimePicker 
v-model="date" 
theme="dark"
class="custom_style"
inputBackground="rgba(0, 90, 204, 0.6)"
innerBorderColor="rgba(0, 90, 204, 0.1)"
optionBackground="rgba(0, 90, 204, 0.1)"
slideBtnBackground="rgba(29, 37, 61, 1)"
selectedBackground="rgba(200, 200, 220, 0.9)"
hoverColor="rgba(0, 153, 204, 0.1)"
>
</fv-TimePicker>
```


</ClientOnly>


### 属性
---
| 属性               | 类型    | 必填  | 默认值                     | 说明                                                                   |
|:------------------:|:-------:|:-----:|:--------------------------:|:----------------------------------------------------------------------:|
| modelValue         | Date    | 否    | () => new Date()           | 绑定的时间。                                                           |
| timeType           | number  | 否    | 12                         | 时间制（可选12，24）                                                   |
| period             | array   | 否    | ['A.M.', 'P.M.']           | 上午下午显示。                                                         |
| inputBackground    | string  | 否    | ''                         | 输入框背景色。                                                         |
| innerBorderColor   | string  | 否    | 'rgba(200, 200, 200, 0.3)' | 内部边框颜色。                                                         |
| optionBackground   | string  | 否    | ''                         | 选择器背景色。                                                         |
| slideBtnBackground | string  | 否    | ''                         | 滑动按钮Hover背景色。                                                  |
| disabled           | boolean | 否    | false                      | 是否禁用选项框。                                                       |
| hoverColor         | string  | 否    | undefined                  | 选项的Hover背景色。                                                    |
| secondType         | string  | 否    | 'same'                     | 默认秒数，'same'表示与当前传入日期一致，'zero'/'full'分别表示设为0/59s |
| theme              | string  | 否    | 'global'                   | Custom theme                                                           |
| selectedBackground | string  | 否    | ''                         | 参见组件的 `selectedBackground` 选项。                                 |
| lang               | string  | 否    | "global"                   | 参见组件的 `lang` 选项。                                               |


### 事件
---
| 事件名 | 参数  | 说明                     |
|:------:|:-----:|:------------------------:|
| change |       | 当选中的时间发生变化时。 |
