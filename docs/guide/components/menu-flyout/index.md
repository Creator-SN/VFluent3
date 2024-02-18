---
page: true
title: MenuFlyout
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# MenuFlyout

## Quick Start

### Default

---

<fv-menu-flyout :theme="theme">
</fv-menu-flyout>

```vue-html
    <fv-menu-flyout :theme="theme">
    </fv-menu-flyout>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
