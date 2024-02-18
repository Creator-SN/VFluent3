---
page: true
title: NavigationView
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# NavigationView

## Quick Start

### Default

---

<fv-navigation-view :theme="theme">
</fv-navigation-view>

```vue-html
    <fv-navigation-view :theme="theme">
    </fv-navigation-view>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
