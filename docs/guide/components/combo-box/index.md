---
page: true
title: ComboBox
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const value = ref();

const options = [{
    key:"Microsoft"
},{
    key:"Apple"
},{
    key:"Google"
},{
    key:"Facebook"
},{
    key:"Github"
}]


</script>

# ComboBox

## Quick Start

### Default

---

<fv-combo-box v-model="value" :options="options" :theme="theme" placeholder="Input your company" autofocus>
</fv-combo-box>

```vue-html{2-6}
    <fv-combo-box 
        v-model="value"
        :options="options" 
        :theme="theme" 
        placeholder="Input your company"
        autofocus
    >
    </fv-combo-box>
```

### Editable

---

<fv-combo-box style="width:100%;" :options="options" editable :theme="theme" placeholder="Input your company">
</fv-combo-box>

```vue-html{2,4}
    <fv-combo-box 
        style="width:100%;" 
        :options="options" 
        editable 
        :theme="theme" 
        placeholder="Input your company"
    >
    </fv-combo-box>
```

### Disabled

---

<fv-combo-box v-model="value" :options="options" disabled :theme="theme" placeholder="Input your company">
</fv-combo-box>

```vue-html{2}
    <fv-combo-box 
        disabled
        :options="options" 
        :theme="theme" 
        placeholder="Input your company"
    >
    </fv-combo-box>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
