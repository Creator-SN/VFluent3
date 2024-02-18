---
page: true
title: RatingControl
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# RatingControl

## Quick Start

### Default

---

<fv-rating-control :theme="theme">
</fv-rating-control>

```vue-html
    <fv-rating-control :theme="theme">
    </fv-rating-control>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
