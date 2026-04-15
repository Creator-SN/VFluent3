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


### Properties
---
| Property           | Type    | Required | Default                                                                                                                      | Description                                     |
|:------------------:|:-------:|:--------:|:----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------:|
| modelValue         | Date    | No       | () => new Date()                                                                                                             | See the DatePicker `modelValue` option.         |
| theme              | string  | No       | 'global'                                                                                                                     | Theme color.                                    |
| months             | array   | No       | [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] | See the DatePicker `months` option.             |
| weeks              | array   | No       | ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']                                                                     | See the DatePicker `weeks` option.              |
| hideYear           | boolean | No       | false                                                                                                                        | See the DatePicker `hideYear` option.           |
| hideMonth          | boolean | No       | false                                                                                                                        | See the DatePicker `hideMonth` option.          |
| hideDay            | boolean | No       | false                                                                                                                        | See the DatePicker `hideDay` option.            |
| showWeek           | boolean | No       | false                                                                                                                        | See the DatePicker `showWeek` option.           |
| inputBackground    | string  | No       | ''                                                                                                                           | See the DatePicker `inputBackground` option.    |
| innerBorderColor   | string  | No       | 'rgba(200, 200, 200, 0.3)'                                                                                                   | See the DatePicker `innerBorderColor` option.   |
| optionBackground   | string  | No       | ''                                                                                                                           | See the DatePicker `optionBackground` option.   |
| slideBtnBackground | string  | No       | ''                                                                                                                           | See the DatePicker `slideBtnBackground` option. |
| disabled           | boolean | No       | false                                                                                                                        | See the DatePicker `disabled` option.           |
| hoverColor         | string  | No       | undefined                                                                                                                    | See the DatePicker `hoverColor` option.         |
| selectedBackground | string  | No       | ''                                                                                                                           | See the DatePicker `selectedBackground` option. |
| reverseLayout      | boolean | No       | false                                                                                                                        | See the DatePicker `reverseLayout` option.      |
| lang               | string  | No       | "global"                                                                                                                     | See the DatePicker `lang` option.               |

### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| change |           | See the component `change` option. |
