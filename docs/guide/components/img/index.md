---
page: true
title: Img
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const imageLists = ref<Array<string>>([
    "https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg",
    "https://rescreator.blob.core.windows.net/slider/e131600a-b9c7-40e7-aa92-d85db97aed0e.jpg",
    "https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true",
    "https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true",
    "https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true"
])

const lazyImage = ref<Array<string>>([
    "https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg"
])

const handleAdd = ()=>{
    lazyImage.value.push(imageLists.value[Math.floor(Math.random()*imageLists.value.length)])
}

const onLoad = (evt:Event)=>{
    console.log("loaded",evt.target)
}

const onError = (evt:Event)=>{
    console.error("error",evt)
}

</script>

# Img

## Quick Start

### Default

---

<fv-img alt="An image" style="width:350px; height:350px; " fit="cover" src="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" :theme="theme">
</fv-img>

```vue-html{2-6}
    <fv-img 
        style="width:350px;height:350px;" 
        fit="cover" 
        alt="An image"
        src="https://rescreator.blob.core.windows.net/slider/01277a52-2379-475e-b5f6-7c8788dac898.jpg" 
        :theme="theme">
    </fv-img>
```

### Cached cross origin

---

<fv-button :theme="theme" @click="handleAdd">Add Image</fv-button>

---

<div style="height:390px;overflow: auto;">
<div v-for="(item,index) in lazyImage">
<fv-img cache crossorigin="anonymous" alt="An image" style="width:350px;height:350px;" fit="cover" :src="item" :theme="theme">
</fv-img>
<hr>
</div>
</div>

```vue-html{2-3}
    <fv-img 
        cache
        crossorigin="anonymous" 
        alt="An image" 
        style="width:350px;height:350px;" 
        fit="cover" 
        :src="item"
        :theme="theme">
    </fv-img>
```

::: warning
The server response header Access-Control-Allow-Origin must allow the current origin
:::

### Lazy load

---

<div style="height:390px;overflow: auto;">
<div v-for="(item,index) in lazyImage">
<fv-img lazy alt="An image" style="width:350px; height:350px; " fit="cover" :src="item" :theme="theme" @loaded="onLoad">
</fv-img>
<hr>
</div>
</div>

```vue-html{2}
    <fv-img 
        lazy 
        alt="An image" 
        style="width:350px; height:350px;" 
        fit="cover" 
        :src="item" 
        :theme="theme" 
        @loaded="onLoad">
    </fv-img>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
