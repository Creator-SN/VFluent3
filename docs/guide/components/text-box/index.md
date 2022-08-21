---
page: true
title: TextBox
--- 

<script lang="ts" setup>
import {  onMounted, onUnmounted, ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()

const value = ref<string>("")

const template = `MIT License

Copyright (c) 2022 Creator SN®

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

let index = 0;
let stop = false;

const input = ref(null)

onMounted(()=>{
    const cb = ()=>{
        index = (index+1) % template.length;
        value.value = template.substring(0,index)
        if (stop===false)
            window.requestAnimationFrame(cb)
    }
    cb()
})

onUnmounted(()=>{
    stop = true;
})

function focus(evt:FocusEvent){
    console.log("focus",evt)
}

function change(val:string){
    console.log(val)
}

function blur(val:string){
    console.log("blur",val)
}

function errorInput(val:string){
    console.error("your error input",val);
}

function warningInput(val:string){
    console.warn("your warning input",val);
}


</script>

# TextBox

## Quick Start

### Default

---

<div>
Input single line:  <fv-text-box :input-rules="/^[0-9]*$/" :pattern="/^1234/" :theme="theme" @focus="focus" @change="change" @blur="blur" :maxlength="30" hover-border-color="rgba(0, 204, 153, 1)" @error-input="errorInput"
@warning-input="warningInput"/>
</div>

```vue-html{2-9}
    <fv-text-box 
        :input-rules="/^[0-9]*$/"
        :pattern="/^1234/"
        :theme="theme" 
        @focus="focus" 
        @change="change" 
        @blur="blur"
        :maxlength="30"
        hover-border-color="rgba(0, 204, 153, 1)"
        @error-input="errorInput"
        @warning-input="warningInput"
    >
    </fv-text-box>
```

::: warning Warning
Only input-rules characters can be entered. If you input other characters, the border color is warning color. If the input does not match the pattern, the border color is error color. Error color will override warning color.
:::

### Width

Input single line:  

<div>
<fv-text-box :input-rules="/^[0-9\.]*$/" min-width="100%" style="width:50%;" :theme="theme" @focus="focus" @change="change" @blur="blur" placeholder="Input numbers" hover-border-color="rgba(0, 204, 153, 1)" @error-input="errorInput"
@warning-input="warningInput"/>
</div>

```vue-html{3}
    <fv-text-box 
        :input-rules="/^[0-9\.]*$/" 
        style="width:50%;" 
        :theme="theme" 
        @focus="focus" 
        @change="change" 
        @blur="blur" 
        placeholder="Input numbers" 
        hover-border-color="rgba(0, 204, 153, 1)" 
        @error-input="errorInput"
        @warning-input="warningInput"
    />
```


### Password

---

<div>
Input password:  <fv-text-box :input-rules="/^[0-9a-zA-Z\-@!]*$/" style="min-width:200px;" placeholder="Input your password" :theme="theme" password @focus="focus" @change="change" @blur="blur"/>
</div>

```vue-html{3-6}
    <fv-text-box 
        :theme="theme" 
        placeholder="Input your password"
        style="min-width:200px;"
        :input-rules="/^[0-9a-zA-Z\-@!]*$/"
        password
        @focus="focus" 
        @change="change" 
        @blur="blur"
    >
    </fv-text-box>
```

### Multiline

---

<div>
Input multiline:   
<fv-text-box multiline :theme="theme" @focus="focus" @change="change" @blur="blur" />
</div>

```vue-html{2}
    <fv-text-box 
        multiline 
        :theme="theme" 
        @focus="focus" 
        @change="change" 
        @blur="blur"
    >
    </fv-text-box>
```

### Readonly

---

<div>
Input multiline:  <fv-text-box ref="input" readonly multiline :theme="theme" v-model="value" autofocus />
</div>

```vue-html
    <fv-text-box multiline :theme="theme" readonly>
    </fv-text-box>
```


 ### Disabled 

---

<div>
Input multiline:  <fv-text-box disabled multiline :theme="theme" v-model="value" @focus="focus"/>
</div>

```vue-html
    <fv-text-box multiline :theme="theme" disabled>
    </fv-text-box>
``` 

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->