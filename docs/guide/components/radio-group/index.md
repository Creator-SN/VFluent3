---
page: true
title: RadioGroup
---


<!-- lang-switch -->
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

### Properties
---

| Property   | Type    | Required | Default   | Description                             |
|:----------:|:-------:|:--------:|:---------:|:---------------------------------------:|
| modelValue | any     | Yes      | undefined | See the RadioGroup `modelValue` option. |
| theme      | string  | No       | 'global'  | Theme color.                            |
| label      | string  | No       | ''        | See the RadioGroup `label` option.      |
| disabled   | boolean | No       | false     | Whether the component is disabled.      |
| inline     | boolean | No       | false     |                                         |
| lang       | string  | No       | "global"  | See the RadioGroup `lang` option.       |

### Events
---
| Event  | Arguments        | Description                        |
|:------:|:----------------:|:----------------------------------:|
| change | event(value,...) | See the component `change` option. |
