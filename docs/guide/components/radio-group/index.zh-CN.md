---
page: true
title: RadioGroup
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
<script>
  export default {
    data(){
      return {
        value:"option",
        label:""
      }
    },
    methods:{
      change(value){  
        this.label=value;
      }
    }
  }
</script>

### RadioGroup-DEMO
--- 


<ClientOnly>
<fv-radioGroup v-model="value" label="Options:">
<div class="row-block">
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option3">Option3</fv-radio>
</div>
</fv-radioGroup>
</ClientOnly>

```vue
<fv-radioGroup v-model="value" label="Options:">
<div class="row-block">
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option3">Option3</fv-radio>
</div>
</fv-radioGroup>
```

### RadioGroup inline 

---

<ClientOnly>
<fv-radioGroup v-model="value" label="Options:" inline>
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</fv-radioGroup>
</ClientOnly>

```vue
<fv-radioGroup v-model="value" label="Options:" inline>
  <fv-radio label="option1">Option1</fv-radio>
  <fv-radio label="option2">Option2</fv-radio>
</fv-radioGroup>
```


### Radio Icon

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:">
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:">
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
</fv-radio-group>
```


### Radio Icon Dark inline

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:" theme="dark" inline @change="change">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:" theme="dark" inline @change="change">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</fv-radio-group>
```

{{label}}

### Radio Icon Dark Disabled

---

<ClientOnly>
<fv-radio-group v-model="value"  label="Options:"  disabled>
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option4" icon="QuickNote">Option4</fv-radio>
  <fv-radio label="option5" icon="QuickNote">Option5</fv-radio>
  <fv-radio label="option6" icon="QuickNote">Option6</fv-radio>
</div>
</fv-radio-group>
</ClientOnly>

```vue
<fv-radio-group v-model="value"  label="Options:"  disabled>
<div class="row-block">
  <fv-radio label="option1" icon="QuickNote">Option1</fv-radio>
  <fv-radio label="option2" icon="QuickNote">Option2</fv-radio>
  <fv-radio label="option3" icon="QuickNote">Option3</fv-radio>
</div>
<div class="row-block">
  <fv-radio label="option4" icon="QuickNote">Option4</fv-radio>
  <fv-radio label="option5" icon="QuickNote">Option5</fv-radio>
  <fv-radio label="option6" icon="QuickNote">Option6</fv-radio>
</div>
</fv-radio-group>
```

### 属性
---

| 属性       | 类型    | 必填  | 默认值    | 说明                     |
|:----------:|:-------:|:-----:|:---------:|:------------------------:|
| modelValue | any     | 是    | undefined | 选中值。                 |
| theme      | string  | 否    | 'global'  | 主题色。                 |
| label      | string  | 否    | ''        | 标签。                   |
| disabled   | boolean | 否    | false     | 是否禁用。               |
| inline     | boolean | 否    | false     |                          |
| lang       | string  | 否    | "global"  | 参见组件的 `lang` 选项。 |

### 事件
---
| 事件名 | 参数             | 说明               |
|:------:|:----------------:|:------------------:|
| change | event(value,...) | 选项值改变时触发。 |
