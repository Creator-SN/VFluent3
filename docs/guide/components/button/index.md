---
page: true
title: Button
---

<script lang="ts" setup>
import {useTheme} from "../common"
const {theme} = useTheme()
function click(){
    console.log('click')
}
</script>

# Button

## Quick Start    

### Default

---

<fv-button @click="click" :theme="theme">Button</fv-button>

```vue-html{2,3}
  <fv-button 
    @click="click" 
    :theme="theme"
  >
    Button
  </fv-button>
```

### Is Box Shadow

<br/>
<fv-button is-box-shadow @click="click" :theme="theme">Button</fv-button>

```vue-html{2}
  <fv-button 
    is-box-shadow 
    @click="click" 
    :theme="theme"
  >
    Button
  </fv-button>
```

### Disabled

<br/>
<fv-button disabled @click="click" :theme="theme">Button</fv-button>

```vue-html{2}
  <fv-button 
    disabled 
    @click="click" 
    :theme="theme"
  >
    Button
  </fv-button>
```

### Custom style

---

<fv-button icon="Add" font-size="0.8rem" background="rgb(15, 60, 104)" foreground="whitesmoke" :border-radius="5"  @click="click" >Button</fv-button>

```vue-html{2-6}
  <fv-button 
    icon="Add"
    background="rgb(15, 60, 104)" 
    foreground="whitesmoke" 
    font-size="0.8rem"
    :border-radius="5"
    @click="click" 
  >
  Button
  </fv-button>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->


## Slot

---

### Default

```vue-html
  <fv-button>
    <span>Button</span>
  </fv-button>
```
