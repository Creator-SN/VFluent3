---
page: true
title: Slider
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
  export default {
    data(){
      return {
        value:50,
        changeTime:0,
        clickTime:0
      }
    },
    methods:{
      change(){
        this.changeTime++;
      },
      click(){
        this.clickTime++;
      }
    }
  }
</script>

### Slider-Light
   

   

<ClientOnly>
<fv-slider :mininum="9" :maxinum="30" :showLabel="true">
<template v-slot="prop" >
  <span>{{prop.modelValue}}</span>
</template>
</fv-slider>
</ClientOnly>

```vue
<fv-slider :mininum="9" :maxinum="30" :showLabel="true">
<template v-slot="prop" >
  <span>{{prop.modelValue}}</span>
</template>
</fv-slider>
```

### Slider-Dark


<ClientOnly>
<fv-slider theme="dark">
</fv-slider>
</ClientOnly>

```vue
<fv-slider theme="dark">
</fv-slider>
```

### Slider-With-Tick-Mark


<ClientOnly>
<fv-slider :scale="20" :unit="2">
</fv-slider>
</ClientOnly>

```vue
<fv-slider :scale="20" :unit="2">
</fv-slider>
```

### Slider-With-Label


<ClientOnly>
<fv-slider :scale="20" :showLabel="true" :unit="20">
<template v-slot="prop" >
  <span>{{prop.modelValue}}</span>
</template>
</fv-slider>
</ClientOnly>

```vue
<fv-slider :scale="20" :showLabel="true" :unit="20">
<template v-slot="prop" >
  <span>{{prop.modelValue}}</span>
</template>
</fv-slider>
```

### Slider-With-Vertical


<ClientOnly>
<fv-slider v-model="value" :scale="20" :unit="20" :vertical="true" :showLabel="true" @change="change" @click="click">
</fv-slider>
</ClientOnly>

```vue
<fv-slider v-model="value" :scale="20" :unit="20" :vertical="true" :showLabel="true" @change="change" @click="click">
</fv-slider>
```
Slider: {{value}}%  Change: {{changeTime}} Click: {{clickTime}}


### Silder-Disabled

<ClientOnly>
<fv-slider disabled>
</fv-slider>
</ClientOnly> 

```vue
<fv-slider disabled>
</fv-slider> 
```

### Silder-Custom-Style

<ClientOnly>
<fv-slider v-model="value" style="width:150px;" showLabel color="#2ed573" background="white" iconWrapperBackground="transparent">
<template v-slot="prop">
{{prop.modelValue}}%
</template>
</fv-slider>
</ClientOnly>  

```vue
<fv-slider v-model="value" style="width:150px;" showLabel color="#2ed573" background="white" iconWrapperBackground="transparent">
<template v-slot="prop">
{{prop.modelValue}}%
</template>
</fv-slider>  
```


### Properties
---
| Property              | Type    | Required | Default                                     | Description                                    |
|:---------------------:|:-------:|:--------:|:-------------------------------------------:|:----------------------------------------------:|
| modelValue            |         | No       | 0                                           | The component value used by v-model.           |
| v-model/value         | Number  | No       | 0                                           | See the Slider `v-model/value` option.         |
| theme                 | string  | No       | 'global'                                    | No                                             |
| disabled              | boolean | No       | false                                       | Whether the component is disabled.             |
| unit                  | number  | No       | 1                                           | See the Slider `unit` option.                  |
| mininum               | number  | No       | 0                                           | See the Slider `mininum` option.               |
| maxinum               | number  | No       | 100                                         | See the Slider `maxinum` option.               |
| icon                  | string  | No       | 'CircleFill' // default:"StatusCircleOuter" | MS-icon                                        |
| vertical              | boolean | No       | false                                       | See the Slider `vertical` option.              |
| showLabel             | boolean | No       | false                                       | See the Slider `showLabel` option.             |
| scale                 |         | No       | false                                       | false                                          |
| color                 | string  | No       | ''                                          | See the Slider `color` option.                 |
| background            | string  | No       | ''                                          | See the Slider `background` option.            |
| iconWrapperBackground | string  | No       | ''                                          | See the Slider `iconWrapperBackground` option. |
| lang                  | string  | No       | "global"                                    | See the Slider `lang` option.                  |

### Events
---
| Event  | Arguments | Description                        |
|:------:|:---------:|:----------------------------------:|
| click  | event     | See the component `click` option.  |
| change | event     | See the component `change` option. |

### Slots
``` vue-html
<template v-slot="prop">
  <span>{{prop.modelValue}}</span>
<\template>
```
