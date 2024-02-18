---
page: true
title: Shimmer
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Shimmer

## Quick Start

### Default

---

<fv-shimmer :theme="theme">
</fv-shimmer>

```vue-html
    <fv-shimmer :theme="theme">
    </fv-shimmer>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
