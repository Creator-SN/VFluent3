---
page: true
title: ImgBox
---


<!-- lang-switch -->
### 使用场景
---

- `ImgBox` 适合不会受到跨域限制的图片场景，尤其是同域图片资源。
- 它通过内部请求流程加载图片，因此可以显示加载进度条。
- 当你需要进度反馈，并且图片地址适合同域或可直接请求的方式时，优先使用 `ImgBox`。

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
| 事件名     | 参数   | 说明                           |
|:----------:|:------:|:------------------------------:|
| load       | object | 图片加载完成时触发。           |
| error      | object | 图片元素加载失败时触发。       |
| load-error | object | 图片资源请求失败时触发。       |
