---
page: true
title: Button
---

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const isDark = ref(false)

let observer:MutationObserver|undefined = undefined;

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

# Button

## Quick Start    

<fv-checkbox></fv-checkbox>


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
|    theme     | ['light','dark','global'] |       No       |     "global"      |     Theme      |

## Emits
---
| EmitName | Arguments | Statement |
|:------------:|:--------------:|:---------------:|
|    click     |     [Event]      | Button onclick  |

## Slot
---
### Default

``` vue
<fv-button>
  <div>
  </div>
</fv-button>
```