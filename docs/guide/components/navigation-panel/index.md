---
page: true
title: NavigationPanel
--- 
### NavigationPanel-DEMO
---

<div style="position: relative; width: 100%; height: 800px; display: flex;">
<ClientOnly> 
<fv-NavigationPanel flyoutDisplay="500"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly> 
</div>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationPanel></fv-NavigationPanel>
</div>
```

### NavigationPanel-Flyout

---

<div style="position: relative; width: 100%; height: 800px; display: flex;">
<ClientOnly>
<fv-NavigationPanel expandMode="flyout"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationPanel expandMode="flyout"></fv-NavigationPanel>
</div>
```

### NavigationPanel-Mobile Display

---

<div style="position: relative; width: 100%; height: 800px; display: flex;">
<ClientOnly>
<fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationPanel>
</div>
```

### NavigationPanel-Dark Theme

---

1. Standard

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
<ClientOnly>
<fv-NavigationPanel theme="dark"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel theme="dark"></fv-NavigationPanel>
```

2. Flyout

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
<ClientOnly>
<fv-NavigationPanel expandMode="flyout" theme="dark"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel expandMode="flyout" theme="dark"></fv-NavigationPanel>
```

3. Mobile

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
<ClientOnly>
<fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationPanel>
<fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationPanel>
```

### Propoties

---

|   属性(attr)    |      类型(type)       | 必填(required) | 默认值(default) |                                说明(statement)                                 |
|:---------------:|:---------------------:|:--------------:|:---------------:|:------------------------------------------------------------------------------:|
|      title      |        String         |       No       | NavigationPanel |                              NavigationPanel 标题                              |
|     expand      |        Boolean        |       No       |      true       |                    初始是否展开, 可通过 sync 方法来同步状态                    |
|   expandMode    | ['relative','flyout'] |       No       |    relative     |                           展开模式, 有占位和浮动两种                           |
|   expandWidth   |        Number         |       No       |       350       |                             展开宽度, 以`px`为单位                             |
|  expandDisplay  |        Number         |       No       |      1024       |                            浏览器宽度大于多少时展开                            |
|  compactWidth   |        Number         |       No       |       50        |                             折叠宽度, 以`px`为单位                             |
|  flyoutDisplay  |        Number         |       No       |        0        | 浏览器宽度小于多少时开启浮动模式, 若`expandMode`设为`flyout`, 则始终为浮动模式 |
| fullSizeDisplay |        Number         |       No       |       800       |                          浏览器宽度小于多少时全屏显示                          |
|  mobileDisplay  |        Number         |       No       |        0        |                       浏览器宽度小于多少时开启移动端模式                       |
|    showBack     |        Boolean        |       No       |      true       |                                是否显示后退按钮                                |
|   showSearch    |        Boolean        |       No       |      true       |                                 是否显示搜索框                                 |
|  settingTitle   |        String         |       No       |    Settings     |                                 设置选项的标题                                 |
|   showSetting   |        Boolean        |       No       |      true       |                                是否显示设置选项                                |
|   background    |    [string(color)]    |       No       |       N/A       |                             NavigationPanel 背景色                             |
|      theme      |        String         |       No       |     system      |           主题样式, 包含`light`, `dark`, `system`, `custom`几种样式            |

### Events

---

| 事件名(Name)  | 参数类型(args) |                    说明(statement)                    |
|:-------------:|:--------------:|:-----------------------------------------------------:|
| setting-click |     Object     | 设置选项被点击后触发事件, 返回`{ event: MouseEvent }` |
| update:expand |    boolean     |         当折叠或展开时同步外界传入的`expand`          |
| expand-change |    boolean     |         当折叠或展开时触发事件并提供当前状态          |
| expand-click  |                |                                                       |
|     back      |   MouseEvent   |               返回选项被点击后触发事件                |

### Slot

---

1. SearchBlock

自定义搜索框区域内容, 默认的搜索框无实际作用

```javascript
<template v-slot:searchBlock></template>
```

2. NavIcon

自定义`NavigationPanel`导航按钮区域内容, 默认的导航按钮为`GlobalNavButton`图标

```javascript
<template v-slot:navIcon>
    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
</template>
```

2. BackIcon

自定义`NavigationPanel`后退按钮区域内容, 默认的后退按钮为`Back`图标

```javascript
<template v-slot:backIcon>
    <i class="ms-Icon ms-Icon--Back icon"></i>
</template>
```

3. Title

自定义`NavigationPanel`标题区域内容, 默认的标题为`title`属性值

```javascript
<template v-slot:title="{ show }">
    <p v-show="show" class="name title">{{ title }}</p>
</template>
```

4. Panel

自定义`NavigationPanel`中的内容

```javascript
<template v-slot:panel></template>
```

5. Banner

自定义`NavigationPanel`顶部banner区域内容, 可用于自定义logo等

```javascript
<template v-slot:banner></template>
```


### Appendix

---

1. 获取`NavigationPanel`中`setting`的`dom`方法:

```vue
<fv-NavigationPanel v-model="items" ref="nav"></fv-NavigationPanel>
let setting = this.$refs.nav.setting;
```