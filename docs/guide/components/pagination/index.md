---
page: true
title: Pagination
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Pagination

## Quick Start

### Default

---

<fv-pagination :theme="theme">
</fv-pagination>

```vue-html
    <fv-pagination :theme="theme">
    </fv-pagination>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
