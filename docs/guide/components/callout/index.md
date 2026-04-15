---
page: true
title: Callout
--- 


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
  export default {
    data(){
      return {
        text:"1233",
        show:true,
        color:'#242424FF',
        beak:10,
        space:0,
        position:{key:'topLeft',text:'topLeft'},
        options:[
          {key:'topLeft',text:'topLeft'},
          {key:'topRight',text:'topRight'},
          {key:'topCenter',text:'topCenter'},
          {key:'bottomLeft',text:'bottomLeft'},
          {key:'bottomRight',text:'bottomRight'},
          {key:'bottomCenter',text:'bottomCenter'},
          {key:'leftTop',text:'leftTop'},
          {key:'leftCenter',text:'leftCenter'},
          {key:'leftBottom',text:'leftBottom'},
          {key:'rightTop',text:'rightTop'},
          {key:'rightBottom',text:'rightBottom'},
          {key:'rightCenter',text:'rightCenter'}
        ]
      }
    },
    methods:{
      changeText(text){
        this.text = text;
      }
    }
  }

</script>

### Callout 

<ClientOnly>
<fv-callout v-model="show" effect="hover" position="bottomLeft" :keepalive="false">
  <fv-button icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Color</fv-button>
  <template v-slot:main>
    <fv-color-picker v-model="color" style="width:500px"></fv-color-picker>
  </template>
</fv-callout>
</ClientOnly>

``` vue
<fv-callout v-model="show" effect="hover" position="bottomLeft">
  <fv-button icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <template v-slot:main>
    <fv-color-picker v-model="color" style="width:500px"></fv-color-picker>
  </template>
</fv-callout>
```

### Callout Custom

beak:

<fv-slider v-model="beak" :color="color" :mininum="9" :maxinum="30"  :showLabel="true">
<template v-slot:default="x">
  <span>{{x.modelValue}} px</span>
</template>
</fv-slider>

space:

<fv-slider v-model="space" :color="color" :scale="10" :maxinum="30" :showLabel="true">
<template v-slot:default="x">
  <span>{{x.modelValue}} px</span>
</template>
</fv-slider>

position:
<ClientOnly>
<fv-combobox v-model="position" :options="options">
</fv-combobox>
</ClientOnly>

{{position.key}}

<ClientOnly>
<fv-callout :lockScroll="true" :position="position.key" :beak="beak" :space="space" :popperStyle="{backgroundColor:color}" theme="dark" >
  <fv-button :background="color" theme="dark" icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <template v-slot:header>
    Fluent UI
  </template>
  <template v-slot:main>
    Hello Vue! Nice to meet you!
  </template>
  <template v-slot:footer>
    @Copyright Creator SN
  </template>
</fv-callout>
</ClientOnly>

```vue
<fv-callout :lockScroll="true" :position="position.key" :beak="beak" :space="space" :popperStyle="{ backgroundColor: color }" theme="dark">
  <fv-button :background="color" theme="dark" icon="ActionCenter" borderRadius="3" style="width: 120px; height: 45px;">Callout</fv-button>
  <template v-slot:header>
    Fluent UI
  </template>
  <template v-slot:main>
    Hello Vue! Nice to meet you!
  </template>
  <template v-slot:footer>
    @Copyright Creator SN
  </template>
</fv-callout>
```

### Properties

---

| Property    | Type    | Required | Default        | Description                          |
|:-----------:|:-------:|:--------:|:--------------:|:------------------------------------:|
| v-model     | Boolean | No       | false          | Whether the component is visible.    |
| theme       | string  | No       | 'global'       | Theme color.                         |
| disabled    | boolean | No       | false          | Whether the component is disabled.   |
| space       | number  | No       | 0              | Spacing in pixels.                   |
| beak        | number  | No       | 0              | Beak size in pixels.                 |
| position    | string  | No       | 'bottomCenter' | Position.                            |
| lockScroll  | boolean | No       | true           | Whether page scrolling is locked.    |
| focusTrap   | boolean | No       | false          | Whether focus trapping is enabled.   |
| delayClose  | number  | No       | 0              | See the Callout `delayClose` option. |
| effect      | string  | No       | 'click'        | Display trigger mode.                |
| popperStyle | object  | No       | {}             | Floating panel style.                |
| popperClass | array   | No       | []             | Floating panel CSS classes.          |
| keepalive   | boolean | No       | false          | See the Callout `keepalive` option.  |
| lang        | string  | No       | "global"       | See the Callout `lang` option.       |

### Appendix

---

1. position
