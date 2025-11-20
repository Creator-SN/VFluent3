---
page: true
title: Drawer
---

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

### Propoties

---
|   属性(attr)   |              类型(type)               | 必填(required) | 默认值(default) |      说明(statement)      |
| :------------: | :-----------------------------------: | :------------: | :-------------: | :-----------------------: |
|     theme      | ['system', 'dark', 'light', 'custom'] |       No       |    'system'     |          主题色           |
|     value      |                Boolean                |       No       |      false      |         是否可视          |
|     length     |           [number, string]            |       No       |       300       |         抽屉长度          |
|     title      |                String                 |       No       |    'Drawer'     |          标题栏           |
|   titleSize    |                String                 |       No       |       20        |      标题栏字体大小       |
|  titleWeight   |                String                 |       No       |     'bold'      |      标题栏字体粗细       |
|   titleColor   |                String                 |       No       |       ''        |      标题栏字体颜色       |
|   background   |                  ''                   |       No       |      false      |        是否有背景         |
|  borderRadius  |                String                 |       No       |       ''        |           圆角            |
| controlPadding |                String                 |       No       |   '12px 24px'   |       控制区内边距        |
| contentPadding |                String                 |       No       |     '24px'      |        内容内边距         |
|  showTitleBar  |                Boolean                |       No       |      true       |      是否显示标题栏       |
|    isFooter    |                Boolean                |       No       |      false      |      是否显示Footer       |
| isLightDismiss |                Boolean                |       No       |      false      |    是否单击空白处关闭     |
|   isAcrylic    |                Boolean                |       No       |      false      |      是否亚克力模糊       |
|     zIndex     |                Number                 |       No       |       10        |          层叠数           |
|    position    |  ['bottom', 'left', 'top', 'right']   |       No       |    'bottom'     |           位置            |
|   appendBody   |                Boolean                |       No       |      false      | 是否添加到body（IOS兼容） |
  
### Slot
---
1. Default

自定义容器内内容

```vue
<template>
    <p></p>
</template>
```

2. Header

自定义标题栏内容

```javascript
<template v-slot:header>
</template>
```

3. Footer

自定义`Footer`内容

```javascript
<template v-slot:footer>
</template>
```