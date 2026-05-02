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


### 属性

---

| 属性     | 类型    | 必填  | 默认值   | 说明                                   |
|:--------:|:-------:|:-----:|:--------:|:--------------------------------------:|
| src      | string  | 否    | ''       | 图像 src，支持跨域加载，但不支持缓存。 |
| onlazy   | boolean | 否    | false    | 是否开启懒加载。                       |
| theme    | string  | 否    | 'global' | 参见组件的 `theme` 选项。              |
| disabled | boolean | 否    | false    | 参见组件的 `disabled` 选项。           |
| lang     | string  | 否    | "global" | 参见组件的 `lang` 选项。               |
