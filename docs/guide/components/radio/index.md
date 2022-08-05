---
page: true
title: Radio
---

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const value = ref<boolean|number|string>()

function click(val:boolean|number|string){
  console.log('click', val)
}

function change(val:boolean|number|string){
  console.log('change', val)
}
</script>

## Quick Start    

### Default

<br/>
Value: &nbsp; {{value}}  

---  

<fv-radio 
  v-model="value"
  :theme="theme" 
  group="radio" 
  label="Microsoft"  
  @click="click" 
  @change="change">
Microsoft
</fv-radio>
<fv-radio 
  v-model="value"
  :theme="theme" 
  group="radio" 
  label="Google"  
  @click="click" 
  @change="change">
Google
</fv-radio>
<fv-radio 
  v-model="value"
  :theme="theme" 
  group="radio" 
  label="Apple"  
  @click="click" 
  @change="change">
Apple
</fv-radio>

```vue-html
  <fv-radio 
    v-model="value"
    :theme="theme" 
    group="radio" 
    label="Microsoft"  
    @click="click" 
    @change="change">
  Microsoft
  </fv-radio>
  <fv-radio 
    v-model="value"
    :theme="theme" 
    group="radio" 
    label="Google"  
    @click="click" 
    @change="change">
  Google
  </fv-radio>
  <fv-radio 
    v-model="value"
    :theme="theme" 
    group="radio" 
    label="Apple"  
    @click="click" 
    @change="change">
  Apple
  </fv-radio>

```

### Disabled

---

<fv-radio :theme="theme" group="radio" label="Microsoft" v-model="value" @click="click" disabled>Microsoft</fv-radio>
<fv-radio :theme="theme" group="radio" label="Google" v-model="value" @click="click" disabled>Google</fv-radio>
<fv-radio :theme="theme" group="radio" label="Apple" v-model="value" @click="click" disabled>Apple</fv-radio>

```vue-html
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Microsoft" 
    v-model="value" 
    @click="click" 
    disabled>
  Microsoft
  </fv-radio>
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Google" 
    v-model="value" 
    @click="click" 
    disabled>
  Google
  </fv-radio>
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Apple" 
    v-model="value" 
    @click="click" 
    disabled>
  Apple
  </fv-radio>
```

### Box Side

--- 

<fv-radio :theme="theme" group="radio" label="Microsoft" v-model="value" @click="click" box-side="end">Microsoft</fv-radio>
<fv-radio :theme="theme" group="radio" label="Google" v-model="value" @click="click" box-side="end">Google</fv-radio>
<fv-radio :theme="theme" group="radio" label="Apple" v-model="value" @click="click" box-side="end">Apple</fv-radio>

```vue-html
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Microsoft" 
    v-model="value" 
    @click="click" 
    box-side="end">
  Microsoft
  </fv-radio>
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Google" 
    v-model="value" 
    @click="click" 
    box-side="end">
  Google
  </fv-radio>
  <fv-radio 
    :theme="theme" 
    group="radio" 
    label="Apple" 
    v-model="value" 
    @click="click" 
    box-side="end">
  Apple
  </fv-radio>
```

### Custom

---
1. Set border width.
<fv-radio :theme="theme" :border-width="2" v-model="value">
  Radio rendered with borderWidth "2"
</fv-radio>

```vue-html
  <fv-radio :theme="theme" :border-width="2" v-model="value">
    Radio rendered with borderWidth "2"
  </fv-radio>
```

2. Set background and border color.
<fv-radio
  :theme="theme" 
  border-color="rgba(0, 204, 153, 1)" 
  foreground="rgba(0, 204, 153, 1)" 
  background="rgba(0, 204, 153, 1)"
  v-model="value">
  Radio
</fv-radio>

```vue-html
  <fv-radio
    :theme="theme" 
    border-color="rgba(0, 204, 153, 1)" 
    foreground="rgba(0, 204, 153, 1)" 
    background="rgba(0, 204, 153, 1)">
    Radio
  </fv-radio>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->

## Slot

---

### Default

```vue-html
  <fv-radio>
    {{label here}}
  </fv-radio>
```
