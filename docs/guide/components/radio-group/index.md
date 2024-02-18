---
page: true
title: RadioGroup
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# RadioGroup

## Quick Start

### Default

---

<fv-radio-group :theme="theme">
</fv-radio-group>

```vue-html
    <fv-radio-group :theme="theme">
    </fv-radio-group>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
