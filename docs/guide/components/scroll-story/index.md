---
page: true
title: ScrollStory
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# ScrollStory

## Quick Start

### Default

---

<fv-scroll-story :theme="theme">
</fv-scroll-story>

```vue-html
    <fv-scroll-story :theme="theme">
    </fv-scroll-story>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
