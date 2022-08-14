---
page: true
title: MessageBar
--- 

<script lang="ts" setup>
import { MessageBarKey, MessageBarMethod, MessageBarParams } from '@/packages';
import { inject, ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()
const message = inject<MessageBarMethod>(MessageBarKey)

let instance:MessageBarParams;

const onClose = (type?:'info'|'warning'|'correct'|'blocked'|'error')=>{
    if (message!==undefined){
        if (instance!==undefined){
            instance.close()
        }
        instance = message({
            status: type,
            message: `close ${type} message bar `,
            autoClose: 0,
            theme: theme.value,
            showControl: true,
            confirm:()=>{
                if (instance!==undefined){
                    instance.close()
                }
                instance = message({
                    status:"correct",
                    message:"Confirm",
                    theme: theme.value,
                    autoClose: 0
                })
            },
            cancel:()=>{
                if (instance!==undefined){
                    instance.close()
                }
                instance = message({
                    status:"blocked",
                    message:"Cancel",
                    theme: theme.value,
                    autoClose: 0
                })
            }
        })
    }
}

</script>

# MessageBar

## Quick Start

### Default

---

1. info

<fv-message-bar @close="onClose('info')" status="info" :theme="theme">
</fv-message-bar>

```vue-html
    <fv-message-bar @close="onClose('info')" status="info" :theme="theme">
    </fv-message-bar>
```

2. correct

<fv-message-bar @close="onClose('correct')" status="correct" :theme="theme">
</fv-message-bar>

```vue-html
    <fv-message-bar @close="onClose('correct')" status="correct" :theme="theme">
    </fv-message-bar>
```

3. warning

<fv-message-bar @close="onClose('warning')" status="warning" :theme="theme">
</fv-message-bar>

```vue-html
    <fv-message-bar @close="onClose('warning')" status="warning" :theme="theme">
    </fv-message-bar>
```

4. error

<fv-message-bar @close="onClose('error')" status="error" :theme="theme">
</fv-message-bar>

```vue-html
    <fv-message-bar @close="onClose('error')" status="error" :theme="theme">
    </fv-message-bar>
```

5. blocked

<fv-message-bar @close="onClose('blocked')" status="blocked" :theme="theme">
</fv-message-bar>

```vue-html
    <fv-message-bar @close="onClose('blocked')" status="blocked" :theme="theme">
    </fv-message-bar>
```

### Global Function

1. use setup (recommend)

```vue
<script lang="ts" setup>
const {theme} = useTheme()
const message = inject<MessageBarMethod>(MessageBarKey)

let instance:MessageBarParams;

const onClose = (type?:'info'|'warning'|'correct'|'blocked'|'error')=>{
    if (message!==undefined){
        if (instance!==undefined){
            instance.close()
        }
        instance = message({
            status: type,
            message: `close ${type} message bar `,
            autoClose: 0,
            theme: theme.value,
            showControl: true,
            confirm:()=>{
                if (instance!==undefined){
                    instance.close()
                }
                instance = message({
                    status:"correct",
                    message:"Confirm",
                    theme: theme.value,
                    autoClose: 0
                })
            },
            cancel:()=>{
                if (instance!==undefined){
                    instance.close()
                }
                instance = message({
                    status:"blocked",
                    message:"Cancel",
                    theme: theme.value,
                    autoClose: 0
                })
            }
        })
    }
}
</script>
```

2. use options
``` vue
<script lang="ts">
export default{
    methods:{
        message(){
            this.instance = this.$barWarning({
                status: this.type,
                message: `close ${this.type} message bar`,
                autoClose: 0,
                theme: this.theme.value,
                showControl: true,
                confirm:()=>{
                    if (this.instance!==undefined){
                        this.instance.close()
                    }
                    this.instance = this.$barWarning({
                        status:"correct",
                        message:"Confirm",
                        theme: this.theme.value,
                        autoClose: 0
                    })
                },
                cancel:()=>{
                    if (this.instance!==undefined){
                        this.instance.close()
                    }
                    this.instance = this.$barWarning({
                        status:"blocked",
                        message:"Cancel",
                        theme: this.theme.value,
                        autoClose: 0
                    })
                }
            })
        }
    }
}
</script>
```




<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
