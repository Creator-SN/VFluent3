---
page: true
title: Affix
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Affix

## Quick Start

### Default

---

<fv-affix :theme="theme">
</fv-affix>

```vue-html
    <fv-affix :theme="theme">
    </fv-affix>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
