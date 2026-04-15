---
page: true
title: Radio
---


<!-- lang-switch -->
<script>
  export default {
    data(){
      return {
        value:"Option"
      }
    },
    methods:{
      active(){
        ++this.status;
      }
    }
  }
</script>
  
[[toc]]

### Radio

---


<ClientOnly>
<div>
<fv-radio v-model="value" label="Option">
Option
</fv-radio> 
<fv-radio v-model="value" label="Option2">
Option2
</fv-radio>
<fv-radio label="Option3" disabled>
Disabled
</fv-radio>
</div>
</ClientOnly>

```vue
<div>
<fv-radio v-model="value" label="Option">
Option
</fv-radio> 
<fv-radio v-model="value" label="Option2">
Option2
</fv-radio>
<fv-radio label="Option3" disabled>
Disabled
</fv-radio>
</div>
```

### Radio-Dark

---

<ClientOnly>
<div style="background:#000;height:30px;padding:20px;">
<fv-radio v-model="value" label="Option" theme="dark">Option</fv-radio>
<fv-radio v-model="value" label="Option2" theme="dark" disabled>Disabled</fv-radio>
</div>
</ClientOnly>

```vue
<div style="background:#000;height:30px;padding:20px;">
<fv-radio v-model="value" label="Option" theme="dark">Option</fv-radio>
<fv-radio v-model="value" label="Option2" theme="dark" disabled>Disabled</fv-radio>
</div>
```

### Radio With Icon

---

<ClientOnly>
<div >
<fv-radio v-model="value" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" >MSN</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" disabled >Disabled</fv-radio>

</div>
</ClientOnly>

```vue
<div >
<fv-radio v-model="value" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" >MSN</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" disabled >Disabled</fv-radio>

</div>
```

### Radio With Image

---

<div>
<ClientOnly>
<fv-radio image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png" activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png" v-model="value" label="chart" >Chart</fv-radio>
</ClientOnly>
</div>

```vue
<div>
<fv-radio image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png" activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png" v-model="value" label="chart" >Chart</fv-radio>
</div>
```

### Radio-Dark With Icon

---

<ClientOnly>
<div style="background:#000;padding:20px;">
<fv-radio v-model="value" label="NUIIris" icon="NUIIris" theme="dark">NUIIris</fv-radio>
<fv-radio v-model="value" label="NUIIris" icon="NUIIris" theme="dark" disabled>disabled</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" theme="dark">MSN</fv-radio>
</div>
</ClientOnly>

```vue
<div style="background:#000;padding:20px;">
<fv-radio v-model="value" label="NUIIris" icon="NUIIris" theme="dark">NUIIris</fv-radio>
<fv-radio v-model="value" label="NUIIris" icon="NUIIris" theme="dark" disabled>disabled</fv-radio>
<fv-radio v-model="value" label="MSN" icon="NUIFace" theme="dark">MSN</fv-radio>
</div>
```

### Radio Custom Color

---
<ClientOnly>
<fv-radio  icon="NUIIris" v-model="value" label="NUIIris" style="background:#00cc99;" theme="dark" >NUIIris</fv-radio>
<fv-radio icon="NUIIris" v-model="value" label="NUIIris" style="background:#00cc99;" theme="dark" disabled>Disabled</fv-radio>
</ClientOnly>

```vue
<fv-radio  icon="NUIIris" v-model="value" label="NUIIris" style="background:#00cc99;" theme="dark" >NUIIris</fv-radio>
<fv-radio icon="NUIIris" v-model="value" label="NUIIris" style="background:#00cc99;" theme="dark" disabled>Disabled</fv-radio>
```


### 属性
---
| 属性                  | 类型    | 必填  | 默认值                  | 说明                     |
|:---------------------:|:-------:|:-----:|:-----------------------:|:------------------------:|
| modelValue            |         | 否    | ''                      | 组件的双向绑定值。       |
| v-model/value         | Object  | Yes   | undefined               | 选项值。                 |
| label                 |         | 是    | undefined               | 选项值。                 |
| theme                 | string  | 否    | 'global'                | 主题色。                 |
| icon                  | string  | 否    | null                    | MS-ICON                  |
| color                 | string  | 否    | ''                      | 文字和图标前景色。       |
| foreground            | string  | 否    | 'rgba(0, 90, 158, 0.8)' | Radio前景色。            |
| iconBlockBorderRadius | number  | 否    | 6                       | 带图标样式圆角大小。     |
| iconBlockBorderWidth  | number  | 否    | 2                       | 带图标样式边框大小。     |
| image                 | string  | 否    | null                    | 32*32 图像链接。         |
| activeImage           | string  | 否    | null                    | 32*32 选中时的图像链接。 |
| disabled              | boolean | 否    | false                   | 是否禁用。               |
| lang                  | string  | 否    | "global"                | 参见组件的 `lang` 选项。 |

### 事件
---
| 事件名  | 参数  | 说明         |
|:-------:|:-----:|:------------:|
| click   | event | 点击。       |
| actived | event | 选中时触发。 |
