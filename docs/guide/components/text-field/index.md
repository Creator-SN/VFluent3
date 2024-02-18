---
page: true
title: TextField
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# TextField

## Quick Start

### Default

---

<fv-text-field :theme="theme">
</fv-text-field>

```vue-html
    <fv-text-field :theme="theme">
    </fv-text-field>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
