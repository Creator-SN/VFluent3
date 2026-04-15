---
page: true
title: Radio
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
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


### Properties
---
| Property              | Type    | Required | Default                 | Description                                   |
|:---------------------:|:-------:|:--------:|:-----------------------:|:---------------------------------------------:|
| modelValue            |         | No       | ''                      | The component value used by v-model.          |
| v-model/value         | Object  | Yes      | undefined               | See the Radio `v-model/value` option.         |
| label                 |         | Yes      | undefined               | See the Radio `label` option.                 |
| theme                 | string  | No       | 'global'                | Theme color.                                  |
| icon                  | string  | No       | null                    | MS-ICON                                       |
| color                 | string  | No       | ''                      | See the Radio `color` option.                 |
| foreground            | string  | No       | 'rgba(0, 90, 158, 0.8)' | See the Radio `foreground` option.            |
| iconBlockBorderRadius | number  | No       | 6                       | See the Radio `iconBlockBorderRadius` option. |
| iconBlockBorderWidth  | number  | No       | 2                       | See the Radio `iconBlockBorderWidth` option.  |
| image                 | string  | No       | null                    | See the Radio `image` option.                 |
| activeImage           | string  | No       | null                    | See the Radio `activeImage` option.           |
| disabled              | boolean | No       | false                   | Whether the component is disabled.            |
| lang                  | string  | No       | "global"                | See the Radio `lang` option.                  |

### Events
---
| Event   | Arguments | Description                         |
|:-------:|:---------:|:-----------------------------------:|
| click   | event     | See the component `click` option.   |
| actived | event     | See the component `actived` option. |
