---
page: true
title: ColorPicker
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const colorMode = ref<'ring'|'box'>('ring')

const color = ref<string>("#FFFFFFFF"); 

</script>

# ColorPicker

## Quick Start

### Default

---

<div>
color: {{color}}
<br>
box type:
<fv-radio :theme="theme" v-model="colorMode" label="ring">Ring</fv-radio> 
<fv-radio :theme="theme" v-model="colorMode" label="box">Box</fv-radio> 
</div>

---

<fv-color-picker v-model="color" :theme="theme" :type="colorMode">
</fv-color-picker>

```vue-html

    <fv-color-picker :theme="theme">
    </fv-color-picker>

```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
