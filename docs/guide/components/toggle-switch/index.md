---
page: true
title: ToggleSwitch
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const value = ref<boolean>(false)

function click(val:boolean){
  console.log('click', val)
}

function change(val:boolean){
  console.log("change", val)
}

function focus(evt: FocusEvent){
  console.log("focus", evt)
}

function blur(evt: FocusEvent){
  console.log("blur", evt)
}

</script>

# ToggleSwitch

## Quick Start

### Default

---
<fv-toggle-switch v-model="value" @click="click" @change="change" @blur="blur" @focus="focus"  :theme="theme" on="On" off="Off">
</fv-toggle-switch>

```vue-html{2-9}

    <fv-toggle-switch 
        v-model="value" 
        @click="click" 
        @change="change" 
        @blur="blur" 
        @focus="focus"
        :theme="theme" 
        on="ON" 
        off="OFF">
    </fv-toggle-switch>

```

### Disabled

---
<fv-toggle-switch v-model="value" @click="click" @change="change" @blur="blur" @focus="focus"  :theme="theme" on="On" off="Off" disabled>
</fv-toggle-switch>

```vue-html{10}
    <fv-toggle-switch 
        v-model="value" 
        @click="click" 
        @change="change" 
        @blur="blur" 
        @focus="focus"
        :theme="theme" 
        on="ON" 
        off="OFF"
        disabled>
    </fv-toggle-switch>
```

### Custom

---
1. custom color

<fv-toggle-switch v-model="value" @click="click" @change="change" @blur="blur" @focus="focus"  :theme="theme" on="Yes" off-foreground="rgba(0, 204, 153, 1)" on-background="rgba(0, 204, 153, 1)" foreground="rgba(0, 204, 153, 1)">
</fv-toggle-switch>

```vue-html{9-11}
    <fv-toggle-switch 
        v-model="value" 
        @click="click" 
        @change="change" 
        @blur="blur" 
        @focus="focus"  
        :theme="theme" 
        on="Yes" 
        off-foreground="rgba(0, 204, 153, 1)" 
        on-background="rgba(0, 204, 153, 1)" 
        foreground="rgba(0, 204, 153, 1)"
    >
    </fv-toggle-switch>
```

2. box side

<fv-toggle-switch v-model="value" @click="click" @change="change" @blur="blur" @focus="focus"  :theme="theme" on="Yes" off="No" off-foreground="rgba(0, 204, 153, 1)" on-background="rgba(0, 204, 153, 1)" foreground="rgba(0, 204, 153, 1)" box-side="end">
</fv-toggle-switch>

```vue-html{9,13}
    <fv-toggle-switch 
        v-model="value" 
        @click="click" 
        @change="change" 
        @blur="blur" 
        @focus="focus"  
        :theme="theme" 
        on="Yes" 
        off="No"
        off-foreground="rgba(0, 204, 153, 1)" 
        on-background="rgba(0, 204, 153, 1)" 
        foreground="rgba(0, 204, 153, 1)"
        box-side="end"
    >
    </fv-toggle-switch>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
