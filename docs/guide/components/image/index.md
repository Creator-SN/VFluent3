---
page: true
title: Image
--- 

<!-- lang-switch -->
### Image-DEMO
---

<script>
export default {
    data () {
        return {
            images: ['https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true', 'https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true']
        }
    },
    mounted () {
        
    }
}
</script>

<ClientOnly>
<div style="width: 100%; height: 300px;">
    <fv-Image :src="images[0]" style="width: 500px; height: 300px;"></fv-Image>
</div>
</ClientOnly>

```vue
<fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Image>
```

<div style="width: 100%; height: 500px;">
    
<ClientOnly>
<fv-Image :src="images[1]" style="width: 500px; height: 300px;"></fv-Image>
</ClientOnly>
</div>

```vue
<fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Image>
```

### Image-Lazy Load

---

<div style="width: 100%; height: 300px;">
    
<ClientOnly>
<fv-Image :src="images[2]" :onlazy="true" style="width: 500px; height: 300px;"></fv-Image>
</ClientOnly>
</div>

```vue
<fv-Image src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Image>
```


### Properties

---

| Property | Type    | Required | Default  | Description                      |
|:--------:|:-------:|:--------:|:--------:|:--------------------------------:|
| src      | string  | No       | ''       | See the Image `src` option.      |
| onlazy   | boolean | No       | false    | See the Image `onlazy` option.   |
| theme    | string  | No       | 'global' | See the Image `theme` option.    |
| disabled | boolean | No       | false    | See the Image `disabled` option. |
| lang     | string  | No       | "global" | See the Image `lang` option.     |
