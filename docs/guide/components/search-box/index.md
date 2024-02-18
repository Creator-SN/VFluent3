---
page: true
title: SearchBox
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# SearchBox

## Quick Start

### Default

---

<fv-search-box :theme="theme">
</fv-search-box>

```vue-html
    <fv-search-box :theme="theme">
    </fv-search-box>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
