---
page: true
title: CheckBox
---

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const value = ref<null|boolean>(null)

function click(val:boolean|null){
  console.log('click',val)
}

function setInt(){
  value.value = null; 
}

function change(val:boolean|null){
  console.log("change", val)
}

function focus(evt: FocusEvent){
  console.log("focus", evt)
}

function blur(evt: FocusEvent){
  console.log("blur", evt)
}

</script>

# CheckBox

## Quick Start    

### Default

<div style="margin:5px; ">
<fv-button :theme="theme" style="width:120px;" @click="setInt">Reset value</fv-button>
</div>

---

<fv-check-box 
  :theme="theme" 
  v-model="value" 
  @click="click" 
  @change="change" 
  @blur="blur" 
  @focus="focus"
>
  CheckBox
</fv-check-box>

```vue-html{2-7}
  <fv-check-box 
    :theme="theme" 
    v-model="value" 
    @click="click" 
    @change="change" 
    @blur="blur" 
    @focus="focus"
  >
    CheckBox
  </fv-check-box>
```

## Disabled

<fv-check-box 
  :theme="theme" 
  v-model="value" 
  disabled>
  Disabled CheckBox
</fv-check-box>

```vue-html{4}
  <fv-check-box 
    :theme="theme" 
    v-model="value" 
    disabled
  >
    Disabled CheckBox
  </fv-check-box>
```

## Box Side

---
<fv-check-box :theme="theme" box-side="end">
  Checkbox rendered with boxSide "end"
</fv-check-box>

```vue-html{3}
  <fv-check-box 
    :theme="theme" 
    box-side="end"
  >
    Checkbox rendered with boxSide "end"
  </fv-check-box>
```

## Custom

---
1. Set border width.
<fv-check-box :theme="theme" :border-width="2">
  Checkbox rendered with borderWidth "2"
</fv-check-box>

```vue-html{3}
  <fv-check-box 
    :theme="theme" 
    :border-width="2"
  >
    Checkbox rendered with borderWidth "2"
  </fv-check-box>
```

2. Set background and border color.
<fv-check-box
  :theme="theme" 
  border-color="rgba(0, 204, 153, 1)" 
  foreground="rgba(0, 204, 153, 1)" 
  background="rgba(0, 204, 153, 1)">
  Checkbox
</fv-check-box>

```vue-html{3-5}
  <fv-check-box
    :theme="theme" 
    border-color="rgba(0, 204, 153, 1)" 
    foreground="rgba(0, 204, 153, 1)" 
    background="rgba(0, 204, 153, 1)"
  >
    Checkbox
  </fv-check-box>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->

## Slot

---

### Default

```vue-html
  <fv-check-box>
    {{label here}}
  </fv-check-box>
```
