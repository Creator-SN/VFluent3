---
page: true
title: Persona
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# Persona

## Quick Start

### Default

---

<fv-persona :theme="theme">
</fv-persona>

```vue-html
    <fv-persona :theme="theme">
    </fv-persona>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
