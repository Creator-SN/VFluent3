---
page: true
title: Image
--- 

<!-- lang-switch -->
### When To Use
---

- `Image` is suitable for cross-origin image loading scenarios.
- It focuses on direct image rendering and does not provide the progress behavior used by `ImgBox`.
- Prefer `Image` when the source is cross-origin or when `ImgBox` is not suitable for the request mode.

### Image-DEMO
---

<script>
export default {
    data () {
        return {
            images: ['https://placehold.co/500x300/png?text=VFluent+Sample+1', 'https://placehold.co/500x300/png?text=VFluent+Sample+2', 'https://placehold.co/500x300/png?text=VFluent+Sample+3']
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
<fv-Image src="https://placehold.co/500x300/png?text=VFluent+Sample+1" style="width: 500px; height: 300px;"></fv-Image>
```

<div style="width: 100%; height: 500px;">
    
<ClientOnly>
<fv-Image :src="images[1]" style="width: 500px; height: 300px;"></fv-Image>
</ClientOnly>
</div>

```vue
<fv-Image src="https://placehold.co/500x300/png?text=VFluent+Sample+2" style="width: 500px; height: 300px;"></fv-Image>
```

### Image-Lazy Load

---

<div style="width: 100%; height: 300px;">
    
<ClientOnly>
<fv-Image :src="images[2]" :onlazy="true" style="width: 500px; height: 300px;"></fv-Image>
</ClientOnly>
</div>

```vue
<fv-Image src="https://placehold.co/500x300/png?text=VFluent+Sample+3" :onlazy="true" style="width: 500px; height: 300px;"></fv-Image>
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

### Events
---
| Event | Arguments | Description                                  |
|:-----:|:---------:|:--------------------------------------------:|
| load  | object    | Triggered when the image finishes loading.   |
| error | object    | Triggered when the image fails to load.      |
