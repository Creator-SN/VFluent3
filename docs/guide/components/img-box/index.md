---
page: true
title: ImgBox
---


<!-- lang-switch -->
### ImgBox-DEMO
---

<ClientOnly>
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+1" style="width: 350px; height: 350px;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+1" style="width: 350px; height: 350px;"></fv-ImgBox>
```

### ImgBox-Background Image
---

<ClientOnly>
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+2" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+2" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```

### ImgBox-Lazy Load
---

<ClientOnly>
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+Lazy" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://placehold.co/350x350/png?text=VFluent+ImgBox+Lazy" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```


### Properties
---
| Property     | Type    | Required | Default               | Description                                      |
|:------------:|:-------:|:--------:|:---------------------:|:------------------------------------------------:|
| url          | string  | No       | ''                    | Image url, be careful don't use cross-domain url |
| onlazy       | boolean | No       | false                 | Lazy load image                                  |
| loadingColor | string  | No       | 'rgba(36, 36, 36, 1)' |                                                  |
| onbackground | boolean | No       | false                 | Show as background                               |
| theme        | string  | No       | 'global'              | See the ImgBox `theme` option.                   |
| disabled     | boolean | No       | false                 | See the ImgBox `disabled` option.                |
| lang         | string  | No       | "global"              | See the ImgBox `lang` option.                    |

### Events
---
| Event | Arguments | Description                                                         |
|:-----:|:---------:|:-------------------------------------------------------------------:|
| error | object    | Image load failed will call back error function with error message. |
