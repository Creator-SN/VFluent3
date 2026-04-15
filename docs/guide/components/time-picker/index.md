---
page: true
title: TimePicker
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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


### Properties
---
| Property           | Type    | Required | Default                    | Description                                     |
|:------------------:|:-------:|:--------:|:--------------------------:|:-----------------------------------------------:|
| modelValue         | Date    | No       | () => new Date()           | See the TimePicker `modelValue` option.         |
| timeType           | number  | No       | 12                         | See the TimePicker `timeType` option.           |
| period             | array   | No       | ['A.M.', 'P.M.']           | See the TimePicker `period` option.             |
| inputBackground    | string  | No       | ''                         | See the TimePicker `inputBackground` option.    |
| innerBorderColor   | string  | No       | 'rgba(200, 200, 200, 0.3)' | See the TimePicker `innerBorderColor` option.   |
| optionBackground   | string  | No       | ''                         | See the TimePicker `optionBackground` option.   |
| slideBtnBackground | string  | No       | ''                         | See the TimePicker `slideBtnBackground` option. |
| disabled           | boolean | No       | false                      | See the TimePicker `disabled` option.           |
| hoverColor         | string  | No       | undefined                  | See the TimePicker `hoverColor` option.         |
| secondType         | string  | No       | 'same'                     | See the TimePicker `secondType` option.         |
| theme              | string  | No       | 'global'                   | Custom theme                                    |
| selectedBackground | string  | No       | ''                         | See the TimePicker `selectedBackground` option. |
| lang               | string  | No       | "global"                   | See the TimePicker `lang` option.               |


### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| change |           | See the component `change` option. |
