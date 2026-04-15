---
page: true
title: Drawer
---


<!-- lang-switch -->
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

### 属性

---
| 属性           | 类型    | 必填  | 默认值      | 说明                         |
|:--------------:|:-------:|:-----:|:-----------:|:----------------------------:|
| theme          | string  | 否    | 'global'    | 主题色。                     |
| modelValue     | any     | 否    | undefined   | 是否可视。                   |
| length         | number  | 否    | 800         | 抽屉长度。                   |
| title          | string  | 否    | 'Drawer'    | 标题栏。                     |
| titleSize      | number  | 否    | 20          | 标题栏字体大小。             |
| titleWeight    | string  | 否    | 'bold'      | 标题栏字体粗细。             |
| titleColor     | string  | 否    | ''          | 标题栏字体颜色。             |
| background     | string  | 否    | ''          | 是否有背景。                 |
| borderRadius   | string  | 否    | ''          | 圆角。                       |
| controlPadding | string  | 否    | '12px 24px' | 控制区内边距。               |
| contentPadding | string  | 否    | '24px'      | 内容内边距。                 |
| showTitleBar   | boolean | 否    | true        | 是否显示标题栏。             |
| isFooter       | boolean | 否    | false       | 是否显示Footer               |
| isLightDismiss | boolean | 否    | true        | 是否单击空白处关闭。         |
| isAcrylic      | boolean | 否    | true        | 是否亚克力模糊。             |
| zIndex         | number  | 否    | 30          | 层叠数。                     |
| position       | string  | 否    | 'bottom'    | 位置。                       |
| appendBody     | boolean | 否    | true        | 是否添加到body（IOS兼容）    |
| disabled       | boolean | 否    | false       | 参见组件的 `disabled` 选项。 |
| lang           | string  | 否    | "global"    | 参见组件的 `lang` 选项。     |
  
### 插槽
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
