---
page: true
title: TimePicker
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# TimePicker

## Quick Start

### Default

---

<fv-time-picker :theme="theme">
</fv-time-picker>

```vue-html
    <fv-time-picker :theme="theme">
    </fv-time-picker>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
