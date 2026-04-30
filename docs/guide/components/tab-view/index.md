---
page: true
title: TabView
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# TabView

## Quick Start

### Default

---

<fv-tab-view :theme="theme">
</fv-tab-view>

```vue-html
    <fv-tab-view :theme="theme">
    </fv-tab-view>
```

## Properties

---
| Property | Type | Required | Default | Description |
|:--------:|:----:|:--------:|:-------:|:-----------:|
| theme | string | No | 'global' | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| lang | string | No | 'global' | Language option inherited from common component props. |

## Events

---
No custom events.
