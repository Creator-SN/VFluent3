---
page: true
title: ProgressBar
---

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const progress = [0, 10, 20, 50, 70, 100]

const state = ref<string>("running")
const value = ref<number>(70)
let index = 0
let timeout: NodeJS. Timer|undefined = undefined; 

const onChange = (val:number)=>{
    console.log("change",val)
}

const onLoaded = (val:number)=>{
    console.log('loaded',val)
}

onMounted(()=>{

    timeout = setInterval(() => {
        if (state.value==="running"){
            value.value = progress[index]
            index = (index+1) % progress.length
        }
    }, 1500);

})

onUnmounted(()=>{
    if (timeout!==undefined)
        clearInterval(timeout)
})

</script>

# ProgressBar

## Quick Start

STATE: {{state}}

---
<fv-radio v-model="state" label="running" group="state" :theme="theme">Running</fv-radio>
<fv-radio v-model="state" label="pause" group="state" :theme="theme">Pause</fv-radio>
<fv-radio v-model="state" label="error" group="state" :theme="theme">Error</fv-radio>

### Default

---

<fv-progress-bar @change="onChange" @loaded="onLoaded" v-model="value" :max="100" :theme="theme" :pause="state==='pause'" :error="state==='error'" /> {{value}}%

```vue-html{2-6}
    <fv-progress-bar 
        v-model="value" 
        @change="onChange" 
        @loaded="onLoaded"
        :max="100" 
        :theme="theme" 
        :pause="state==='pause'" 
        :error="state==='error'" 
    /> 
```

### Indeterminate

---

<fv-progress-bar :indeterminate="true" :pause="state==='pause'" :error="state==='error'" :theme="theme" />

```vue-html{2}
    <fv-progress-bar 
        :indeterminate="true" 
        :pause="state==='pause'" 
        :error="state==='error'" 
        :theme="theme"
    />
```

### Custom

---

1. indeterminate

<fv-progress-bar pause-foreground="rgba(229, 0, 249, 1)" error-foreground="rgba(249, 201, 0, 1)" :indeterminate="true" :pause="state==='pause'" :error="state==='error'" :theme="theme" foreground="rgba(0, 204, 153, 1)" />

```vue-html{3-5}
    <fv-progress-bar 
        :indeterminate="true" 
        pause-foreground="rgba(229, 0, 249, 1)" 
        error-foreground="rgba(249, 201, 0, 1)"
        foreground="rgba(0, 204, 153, 1)"
        :pause="state==='pause'" 
        :error="state==='error'" 
        :theme="theme"
    />
```

2. determinate

<fv-progress-bar pause-foreground="rgba(229, 0, 249, 1)" error-foreground="rgba(249, 201, 0, 1)" background="rgba(0,0,0,1)" v-model="value" :max="100" :theme="theme" :pause="state==='pause'" :error="state==='error'" foreground="rgba(0, 204, 153, 1)"/> {{value}}%

```vue-html{5-8}
    <fv-progress-bar 
        v-model="value" 
        :max="100" 
        :theme="theme" 
        pause-foreground="rgba(229, 0, 249, 1)" 
        error-foreground="rgba(249, 201, 0, 1)"
        foreground="rgba(0, 204, 153, 1)"
        background="rgba(0,0,0,1)"
        :pause="state==='pause'" 
        :error="state==='error'" 
    /> 
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
