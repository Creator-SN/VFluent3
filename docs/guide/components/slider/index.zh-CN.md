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


### 属性
---
| 属性                  | 类型    | 必填  | 默认值                                      | 说明                     |
|:---------------------:|:-------:|:-----:|:-------------------------------------------:|:------------------------:|
| modelValue            |         | 否    | 0                                           | 组件的双向绑定值。       |
| v-model/value         | Number  | No    | 0                                           | 绑定的值。               |
| theme                 | string  | 否    | 'global'                                    | No                       |
| disabled              | boolean | 否    | false                                       | 是否禁用。               |
| unit                  | number  | 否    | 1                                           | 一格的间隔。             |
| mininum               | number  | 否    | 0                                           | 最小值。                 |
| maxinum               | number  | 否    | 100                                         | 最大值。                 |
| icon                  | string  | 否    | 'CircleFill' // default:"StatusCircleOuter" | MS-icon                  |
| vertical              | boolean | 否    | false                                       | 是否垂直。               |
| showLabel             | boolean | 否    | false                                       | 是否显示标签。           |
| scale                 |         | 否    | false                                       | false                    |
| color                 | string  | 否    | ''                                          | 按钮的颜色。             |
| background            | string  | 否    | ''                                          | 背景颜色。               |
| iconWrapperBackground | string  | 否    | ''                                          | icon外围容器背景颜色。   |
| lang                  | string  | 否    | "global"                                    | 参见组件的 `lang` 选项。 |

### 事件
---
| 事件名 | 参数  | 说明                                           |
|:------:|:-----:|:----------------------------------------------:|
| click  | event | 按动按钮触发函数。                             |
| change | event | 当value值改变时触发函数，默认第一个参数为value |

### 插槽
``` vue-html
<template v-slot="prop">
  <span>{{prop.modelValue}}</span>
<\template>
```
