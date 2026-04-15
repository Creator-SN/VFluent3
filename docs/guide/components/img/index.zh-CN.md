---
page: true
title: Img
--- 

<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### Img-DEMO
---


<div style="width: 100%; height: 500px;">
    
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/1.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
```

<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/2.jpg?raw=true" style="width: 500px; height: 300px;"></fv-Img>
```

### Img-Lazy Load
---
<div style="width: 100%; height: 500px;">
<ClientOnly>
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
</ClientOnly>
</div>

```vue
<fv-Img src="https://github.com/aleversn/VFluent/blob/master/examples/assert/sample/3.jpg?raw=true" :onlazy="true" style="width: 500px; height: 300px;"></fv-Img>
```


### 属性
---
| 属性         | 类型    | 必填  | 默认值                | 说明                                                                                                        |
|:------------:|:-------:|:-----:|:---------------------:|:-----------------------------------------------------------------------------------------------------------:|
| src          | string  | 否    | ''                    | 图像资源路径，支持跨域和本域，本域下将默认启用ImgBox进行缓存管理，跨域时启用Image进行加载，但无法实现缓存。 |
| onlazy       | boolean | 否    | false                 | Lazy load image                                                                                             |
| loadingColor | string  | 否    | 'rgba(36, 36, 36, 1)' |                                                                                                             |
| onbackground | boolean | 否    | false                 | Show as background                                                                                          |
| theme        | string  | 否    | 'global'              | 参见组件的 `theme` 选项。                                                                                   |
| disabled     | boolean | 否    | false                 | 参见组件的 `disabled` 选项。                                                                                |
| lang         | string  | 否    | "global"              | 参见组件的 `lang` 选项。                                                                                    |
