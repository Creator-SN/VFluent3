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


### 属性
---
| 属性         | 类型    | 必填  | 默认值                | 说明                                             |
|:------------:|:-------:|:-----:|:---------------------:|:------------------------------------------------:|
| url          | string  | 否    | ''                    | Image url，be careful don't use cross-domain url |
| onlazy       | boolean | 否    | false                 | Lazy load image                                  |
| loadingColor | string  | 否    | 'rgba(36, 36, 36, 1)' |                                                  |
| onbackground | boolean | 否    | false                 | Show as background                               |
| theme        | string  | 否    | 'global'              | 参见组件的 `theme` 选项。                        |
| disabled     | boolean | 否    | false                 | 参见组件的 `disabled` 选项。                     |
| lang         | string  | 否    | "global"              | 参见组件的 `lang` 选项。                         |

### 事件
---
| 事件名 | 参数   | 说明                                                                |
|:------:|:------:|:-------------------------------------------------------------------:|
| error  | object | Image load failed will call back error function with error message. |
