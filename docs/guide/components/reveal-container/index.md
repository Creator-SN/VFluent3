---
page: true
title: RevealContainer
--- 


<!-- lang-switch -->
<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

### RevealContainer-DEMO
--- 


<ClientOnly>
<fv-RevealContainer>
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer>
</fv-RevealContainer>
```

Disabled 


<ClientOnly>
<fv-RevealContainer disabled>
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer disabled>
</fv-RevealContainer>
```

### RevealContainer-Customize
---

Single Color


<ClientOnly>
<fv-RevealContainer backgroundColor="rgba(0, 98, 158, 0.3)" borderColor="rgba(0, 98, 158, 0.3)">
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer backgroundColor="rgba(0, 98, 158, 0.3)" borderColor="rgba(0, 98, 158, 0.3)">
</fv-RevealContainer>
```

Gradient Color


<ClientOnly>
<fv-RevealContainer :backgroundGradientList="['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)']" :borderGradientList="['#40e0d0', '#40e0d0', '#ff8c00', '#ff8c00', '#ff0080', 'rgba(255, 255, 255, 0)']" borderGradientSize="120">
</fv-RevealContainer>
</ClientOnly>

```vue
<fv-RevealContainer :backgroundGradientList="['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)']" :borderGradientList="['#40e0d0', '#40e0d0', '#ff8c00', '#ff8c00', '#ff0080', 'rgba(255, 255, 255, 0)']" borderGradientSize="120">
</fv-RevealContainer>
```

### Properties
---
| Property               | Type    | Required | Default                    | Description                                        |
|:----------------------:|:-------:|:--------:|:--------------------------:|:--------------------------------------------------:|
| revealContainer        | boolean | No       | false                      |                                                    |
| parent                 | any     | No       | null                       |                                                    |
| borderWidth            | number  | No       | 1                          |                                                    |
| borderRadius           | number  | No       | 6                          |                                                    |
| backgroundColor        | string  | No       | 'rgba(121, 119, 117, 0.6)' |                                                    |
| backgroundGradientList | array   | No       | []                         |                                                    |
| backgroundGradientSize | number  | No       | 120                        |                                                    |
| borderColor            | string  | No       | 'rgba(121, 119, 117, 0.6)' |                                                    |
| borderGradientList     | array   | No       | []                         |                                                    |
| borderGradientSize     | number  | No       | 60                         |                                                    |
| debounceDistance       | number  | No       | 300                        | See the RevealContainer `debounceDistance` option. |
| disabled               | boolean | No       | false                      |                                                    |
| theme                  | string  | No       | 'global'                   |                                                    |
| lang                   | string  | No       | "global"                   | See the RevealContainer `lang` option.             |

### Events
---
| Event | Arguments | Description |
|:-----:|:---------:|:-----------:|
| click | event     | Click Event |
  

### Data

1. revealContainer




```javascript
{
    init: false,    // 默认值为false, 定义了一个包含RevealContainer的组件后, init会自行修改, 不需要手动修改其值.
    el: () => HTMLElement, // 此为要绑定的对象, 必须采用函数式声明.
    revealHandlerList: []   // 所有被侦听的RevealContainer对象.
}
```

2. parent



```javascript
parent: () => HTMLElement
```
