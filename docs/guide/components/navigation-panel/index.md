---
page: true
title: NavigationPanel
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# NavigationPanel

## Quick Start

### Default

---

<fv-navigation-panel :theme="theme">
</fv-navigation-panel>

```vue-html
    <fv-navigation-panel :theme="theme">
    </fv-navigation-panel>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
