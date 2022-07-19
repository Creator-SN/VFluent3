---
page: true
title: Button
---

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watchEffect,computed } from 'vue';

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

## Button

### Quick Start    
   
<br/>
<FvButton isBoxShadow @click="click" :theme="computedTheme"></FvButton>

``` vue
<FvButton isBoxShadow @click="click" :theme="computedTheme"></FvButton>
```