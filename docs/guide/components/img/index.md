---
page: true
title: Img
--- 

<!-- lang-switch -->
### Differences
---

- `Img` is the recommended general-purpose component.
- It switches between `ImgBox` and `Image` automatically according to the loading situation.
- Use `Img` when you want a single component API and do not want to choose between same-origin and cross-origin loading manually.

### Img-DEMO
---


<div style="width: 100%; height: 500px;">
    
<ClientOnly>
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+1" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+1" style="width: 500px; height: 300px;"></fv-Img>
```

<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+2" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+2" style="width: 500px; height: 300px;"></fv-Img>
```

### Img-Lazy Load
---
<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+3" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://placehold.co/500x300/png?text=VFluent+Sample+3" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
```


### Properties
---
| Property     | Type    | Required | Default               | Description                    |
|:------------:|:-------:|:--------:|:---------------------:|:------------------------------:|
| src          | string  | No       | ''                    | See the Img `src` option.      |
| onlazy       | boolean | No       | false                 | Lazy load image                |
| loadingColor | string  | No       | 'rgba(36, 36, 36, 1)' |                                |
| onbackground | boolean | No       | false                 | Show as background             |
| theme        | string  | No       | 'global'              | See the Img `theme` option.    |
| disabled     | boolean | No       | false                 | See the Img `disabled` option. |
| lang         | string  | No       | "global"              | See the Img `lang` option.     |

### Events
---
| Event | Arguments | Description                                  |
|:-----:|:---------:|:--------------------------------------------:|
| load  | object    | Triggered when the image finishes loading.   |
| error | object    | Triggered when the image fails to load.      |
