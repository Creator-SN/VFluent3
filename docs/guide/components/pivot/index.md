---
page: true
title: Pivot
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Pivot

## Quick Start

### Default

---

<fv-pivot :theme="theme">
</fv-pivot>

```vue-html
    <fv-pivot :theme="theme">
    </fv-pivot>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
