---
page: true
title: Panel
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Panel

## Quick Start

### Default

---

<fv-panel :theme="theme">
</fv-panel>

```vue-html
    <fv-panel :theme="theme">
    </fv-panel>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
