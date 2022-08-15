---
page: true
title: InfoBox
--- 

<script lang="ts" setup>
import {InfoBoxMethod, InfoBoxKey, InfoBoxParams} from "@/packages"
import { inject } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const infoBox = inject<InfoBoxMethod>(InfoBoxKey)

const {theme} = useTheme()

let instance:InfoBoxParams;

const onConfirm = function(){
    if (instance!==undefined){
        instance.close()
    }
    if (infoBox!==undefined){
        instance = infoBox({
            title: "Confirm",
            message: "You click the confirm button",
            status:"correct",
            theme: theme.value
        })
    }
}

const onCancel = function(){
    if (instance!==undefined){
        instance.close()
    }
    if (infoBox!==undefined)
        instance = infoBox({
            title: "Cancel",
            message: "You click the cancel button",
            status:"blocked",
            theme: theme.value
        })
}

</script>

# InfoBox

## Quick Start

### Default

---

1. info

<fv-info-box status="info" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
    Info here...
</fv-info-box>

```vue-html
    <fv-info-box status="info" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
        Info here...
    </fv-info-box>
```

2. correct

<fv-info-box status="correct" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
    Info here...
</fv-info-box>

```vue-html
    <fv-info-box status="correct" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
        Info here...
    </fv-info-box>
```

3. warning

<fv-info-box status="warning" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
    Info here...
</fv-info-box>

```vue-html
    <fv-info-box status="warning" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
        Info here...
    </fv-info-box>
```

4. error

<fv-info-box status="error" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
    Info here...
</fv-info-box>

```vue-html
    <fv-info-box status="error" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
        Info here...
    </fv-info-box>
```

4. blocked

<fv-info-box status="blocked" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
    Info here...
</fv-info-box>

```vue-html
    <fv-info-box status="blocked" :theme="theme" @confirm="onConfirm" @cancel="onCancel">
        Info here...
    </fv-info-box>
```

### Global Function
1. use setup (recommend)

```vue
<script lang="ts" setup>
import {InfoBoxMethod, InfoBoxKey, InfoBoxParams} from "@/packages"
import { inject } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const infoBox = inject<InfoBoxMethod>(InfoBoxKey)

const {theme} = useTheme()

let instance:InfoBoxParams;

const onConfirm = function(){
    if (instance!==undefined){
        instance.close()
    }
    if (infoBox!==undefined){
        instance = infoBox({
            title: "Confirm",
            message: "You click the confirm button",
            status:"correct",
            theme: theme.value
        })
    }
}

const onCancel = function(){
    if (instance!==undefined){
        instance.close()
    }
    if (infoBox!==undefined)
        instance = infoBox({
            title: "Cancel",
            message: "You click the cancel button",
            status:"blocked",
            theme: theme.value
        })
}

</script>
```

2. use options

```vue
<script>
export default{
    methods:{
        infoBox(){
            this.$infoBox({
                title: "Confirm",
                message: "You click the confirm button",
                status:"correct",
                theme: this.theme
            })
        }
    }
}
</script>
```


<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
