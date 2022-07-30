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

<div style="margin-bottom:5px; ">
<fv-button :theme="theme" @click="setInt">Reset</fv-button>
</div>

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

```vue-html
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

<fv-check-box :theme="theme" v-model="value" disabled>
  Disabled CheckBox
</fv-check-box>

```vue-html
  <fv-check-box :theme="theme" v-model="value" disabled>
    Disabled CheckBox
  </fv-check-box>
```

## Box Side

---
<fv-check-box :theme="theme" box-side="end">
  Checkbox rendered with boxSide "end"
</fv-check-box>

```vue-html
  <fv-check-box :theme="theme" box-side="end">
    Checkbox rendered with boxSide "end"
  </fv-check-box>
```

## Custom

---
1. Set border width.
<fv-check-box :theme="theme" :border-width="2">
  Checkbox rendered with borderWidth "2"
</fv-check-box>

```vue-html
  <fv-check-box :theme="theme" :border-width="2">
    Checkbox rendered with borderWidth "2"
  </fv-check-box>
```

2. Set background and border color.
<fv-check-box
  :theme="theme" 
  borderColor="rgba(0, 204, 153, 1)" 
  foreground="rgba(0, 204, 153, 1)" 
  background="rgba(0, 204, 153, 1)">
  Checkbox
</fv-check-box>

```vue-html
  <fv-check-box
    :theme="theme" 
    borderColor="rgba(0, 204, 153, 1)" 
    foreground="rgba(0, 204, 153, 1)" 
    background="rgba(0, 204, 153, 1)">
    Checkbox
  </fv-check-box>
```

## Properties

---
|  Property  |             Type             | Required | Default |    Statement    |
|:------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|    theme     | ['light', 'dark', 'global'] |       No       |     "global"      |     Theme      |
|   disabled   |             [boolean]              |       No       |      false      |    Disabled    |
| modelValue    |             [boolean, null]              |       No       |     undefined     |     CheckBox value, null means Indeterminate       |
| foreground  |              [string]              |       No       |      undefined       |   CheckBox foreground   |
| borderColor |              [string]              |       No       |       undefined       |  CheckBox borderColor   |
| background  |              [string]              |       No       |       undefined       |    CheckBox background    |
|   boxSide   |          ['start', 'end']           |       No       |      start      | CheckBox position |
| borderWidth |              [number, string]              |       No       |        1.5        |   CheckBox border width   |
| hoverColor  |              [string]              |       No       |     undefined     | Checkbox false status hover color |

## Emits

---
| EmitName | Arguments | Statement |
|:------------:|:--------------:|:---------------:|
|    click     |     value[boolean, null]      | CheckBox onclick  |
| update:modelValue     |     value[boolean]      | v-model           |
|    focus     |     evt[FocusEvent] | CheckBox focus |
|    blur      |     evt[FocusEvent] | CheckBox blur |
|    change    |     value[boolean, null]  | Checkbox change |

## Slot

---

### Default

```vue
<fv-check-box>
  {{label here}}
</fv-check-box>
```
