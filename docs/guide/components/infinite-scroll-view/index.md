---
page: true
title: InfiniteScrollView
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# InfiniteScrollView

## Quick Start

### Default

---

<fv-infinite-scroll-view :theme="theme">
</fv-infinite-scroll-view>

```vue-html
    <fv-infinite-scroll-view :theme="theme">
    </fv-infinite-scroll-view>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
