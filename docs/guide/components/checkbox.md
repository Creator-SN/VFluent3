---
page: true
title: CheckBox
---

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'; 

const isDark = ref(false)

let observer: MutationObserver|undefined = undefined; 

const setDark = () => {
  isDark.value = document.documentElement.classList.contains('dark'); 
}; 

onMounted(() => {
  setDark(); 
  observer = new MutationObserver(setDark); 
  observer.observe(document.documentElement, {

    attributes: true,
    attributeFilter: ['class'],

  }); 
}); 

onBeforeUnmount(() => {
  observer?.disconnect(); 
}); 

const computedTheme = computed(()=>{

    if (isDark.value){
        return 'dark'
    }
    return 'light'

})

function click(){

    alert('click')

}
</script>

# CheckBox

## Quick Start    

<fv-check-box :theme="computedTheme" @click="click"></fv-check-box>

``` vue
<fv-check-box :theme="computedTheme"></fv-check-box>
```

## Properties

---
|  Property  |             Type             | Required | Default |    Statement    |
|:------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|    theme     | ['light', 'dark', 'global'] |       No       |     "global"      |     Theme      |
|   disabled   |             [boolean]              |       No       |      false      |    Disabled    |


## Emits

---
| EmitName | Arguments | Statement |
|:------------:|:--------------:|:---------------:|
|    click     |     value[boolean\|null]      | CheckBox onclick  |

## Slot

---

### Default

```vue
<fv-check-box>
  {{label here}}
</fv-check-box>
```
