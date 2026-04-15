---
page: true
title: Drawer
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
  export default {

    data(){
      return {
        visible:false,
        v2: false,
        v3: false,
        theme:0
      }
    },
    methods:{
      toggle(){
        this.visible=!this.visible;
      },
      toggleV2(){
        this.v2 = !this.v2;
      },
      toggleV3(){
        this.v3 = !this.v3;
      }
    }, 
    computed:{
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

### Drawer
---

<ClientOnly>

<fv-button style="width: 120px;" @click="toggle" >Show / Hide</fv-button>

<fv-drawer v-model="visible">
</fv-drawer>

```vue
<fv-drawer v-model="visible">
</fv-drawer>
```

- Change Side

<fv-button  style="width: 120px;" @click="toggleV2" >Show / Hide</fv-button>

<fv-drawer :zIndex="9999" v-model="v2" position="left">
</fv-drawer>

```vue
<fv-drawer v-model="v2" position="left">
</fv-drawer>
```

### Drawer Footer

<fv-button style="width: 120px;" @click="toggleV3" >Show / Hide</fv-button>

<fv-drawer v-model="v3" isFooter appendBody>
</fv-drawer>

```vue
<fv-drawer v-model="v3" isFooter appendBody>
</fv-drawer>
```

</ClientOnly>

### Properties

---
| Property       | Type    | Required | Default     | Description                             |
|:--------------:|:-------:|:--------:|:-----------:|:---------------------------------------:|
| theme          | string  | No       | 'global'    | Theme color.                            |
| modelValue     | any     | No       | undefined   | See the Drawer `modelValue` option.     |
| length         | number  | No       | 800         | See the Drawer `length` option.         |
| title          | string  | No       | 'Drawer'    | See the Drawer `title` option.          |
| titleSize      | number  | No       | 20          | See the Drawer `titleSize` option.      |
| titleWeight    | string  | No       | 'bold'      | See the Drawer `titleWeight` option.    |
| titleColor     | string  | No       | ''          | See the Drawer `titleColor` option.     |
| background     | string  | No       | ''          | See the Drawer `background` option.     |
| borderRadius   | string  | No       | ''          | See the Drawer `borderRadius` option.   |
| controlPadding | string  | No       | '12px 24px' | See the Drawer `controlPadding` option. |
| contentPadding | string  | No       | '24px'      | See the Drawer `contentPadding` option. |
| showTitleBar   | boolean | No       | true        | See the Drawer `showTitleBar` option.   |
| isFooter       | boolean | No       | false       | See the Drawer `isFooter` option.       |
| isLightDismiss | boolean | No       | true        | See the Drawer `isLightDismiss` option. |
| isAcrylic      | boolean | No       | true        | See the Drawer `isAcrylic` option.      |
| zIndex         | number  | No       | 30          | See the Drawer `zIndex` option.         |
| position       | string  | No       | 'bottom'    | Position.                               |
| appendBody     | boolean | No       | true        | See the Drawer `appendBody` option.     |
| disabled       | boolean | No       | false       | See the Drawer `disabled` option.       |
| lang           | string  | No       | "global"    | See the Drawer `lang` option.           |
  
### Slots
---
1. Default



```vue
<template>
    <p></p>
</template>
```

2. Header



```javascript
<template v-slot:header>
</template>
```

3. Footer



```javascript
<template v-slot:footer>
</template>
```
