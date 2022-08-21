---
page: true
title: ColorPicker
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# ColorPicker

## Quick Start

### Default

---

<fv-color-picker :theme="theme">
</fv-color-picker>

```vue-html
    <fv-color-picker :theme="theme">
    </fv-color-picker>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
