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

```vue-html
  <fv-button @click="click" :theme="theme">Button</fv-button>
```

### Is Box Shadow

<br/>
<fv-button is-box-shadow @click="click" :theme="theme">Button</fv-button>

```vue-html
  <fv-button is-box-shadow @click="click" :theme="theme">Button</fv-button>
```

### Disabled

<br/>
<fv-button disabled @click="click" :theme="theme">Button</fv-button>

```vue-html
  <fv-button disabled @click="click" :theme="theme">Button</fv-button>
```

### Custom style

---

<fv-button icon="Add" font-size="0.8rem" background="rgb(15, 60, 104)" foreground="whitesmoke" :border-radius="5"  @click="click" >Button</fv-button>

```vue-html
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

## Properties

---
|  Property  |             Type             | Required | Default |    Statement    |
|:------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|
|     icon     |              [string]              |       No       |       undefined       | Icon with Fabric-Icon |
|  foreground  |              [string]           |       No       |       undefined       |     Foreground color     |
|  background  |              [string]           |       No       |       undefined       |     Background color     |
|   font-size   |              [number]              |       No       |       undefined       |    Font size    |
|  font-weight  |              [string]              |       No       |     "normal"      |    Font weight |
| is-box-shadow  |             [boolean]              |       No       |      false      |   Default shadow style    |
|   disabled   |             [boolean]              |       No       |      false      |    Disabled    |
| border-radius |              [number]              |       No       |        3        |    Border radius    |
| border-width  |              [number]              |       No       |        2        |    Border Width  |
|    theme     | ['light', 'dark', 'global'] |       No       |     "global"      |     Theme      |

## Emits

---
| EmitName | Arguments | Statement |
|:------------:|:--------------:|:---------------:|
|    click     |     [Event]      | Button onclick  |

## Slot

---

### Default

```vue-html
  <fv-button>
    <span>Button</span>
  </fv-button>
```
