---
page: true
title: ImgBox
---

### ImgBox-DEMO
---

<ClientOnly>
<fv-ImgBox url="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 350px;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 350px;"></fv-ImgBox>
```

### ImgBox-Background Image
---

<ClientOnly>
<fv-ImgBox url="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" :onbackground="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```

### ImgBox-Lazy Load
---

<ClientOnly>
<fv-ImgBox url="https://pixabay.com/get/gc551fa833376f85019123271e24dd80e00437c1ad8aceda8c463ab6e72d1178577cd18729ca8f46f16afb8b35ec00050d1b69b703e1dcc43803efa200bcf447ebd607078ae82ce44d3286852dbe2fd52_1280.jpg?attachment=" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
</ClientOnly>

```vue
<fv-ImgBox url="https://pixabay.com/get/gc551fa833376f85019123271e24dd80e00437c1ad8aceda8c463ab6e72d1178577cd18729ca8f46f16afb8b35ec00050d1b69b703e1dcc43803efa200bcf447ebd607078ae82ce44d3286852dbe2fd52_1280.jpg?attachment=" :onlazy="true" style="width: 350px; height: 350px; background-size: cover;"></fv-ImgBox>
```


### Propoties
---
|  属性(attr)  |     类型(type)     |   必填(required)    |                   默认值(default)                    |                 说明(statement)                  |
|:------------:|:------------------:|:-------------------:|:----------------------------------------------------:|:------------------------------------------------:|
|     url      |       String       |         Yes         |                         N/A                          | Image url, be careful don't use cross-domain url |
|    onlazy    |      Boolean       |         No          |                        false                         |                 Lazy load image                  |
| loadingColor | [string(color)] No | rgba(0, 90, 158, 1) | The foreground of the progress-ring or progress-bar. |                                                  |
| onbackground |      Boolean       |         No          |                        false                         |                Show as background                |

### Events
---
| 事件名(Name) | 参数类型(args) |                           说明(statement)                           |
|:------------:|:--------------:|:-------------------------------------------------------------------:|
|    error     |     object     | Image load failed will call back error function with error message. |