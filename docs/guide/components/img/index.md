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
