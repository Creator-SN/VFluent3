---
page: true
title: NavigationPanel
---

<!-- lang-switch -->
### NavigationPanel-DEMO
---

<div style="position: relative; width: 100%; height: 800px; display: flex;">
<ClientOnly>
<fv-NavigationPanel flyoutDisplay="500"></fv-NavigationPanel>
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
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
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
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
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
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
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel theme="dark"></fv-NavigationPanel>
```

2. Flyout

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
<ClientOnly>
<fv-NavigationPanel expandMode="flyout" theme="dark"></fv-NavigationPanel>
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel expandMode="flyout" theme="dark"></fv-NavigationPanel>
```

3. Mobile

<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
<ClientOnly>
<fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationPanel>
<fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</ClientOnly>
</div>

```vue
<fv-NavigationPanel mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationPanel>
```

### 属性
---

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|:---|
| title | string | 否 | 'NavigationPanel' | NavigationPanel 标题。 |
| expand | boolean | 否 | true | 初始是否展开，可通过 `v-model:expand` / `update:expand` 同步状态。 |
| expandMode | string | 否 | 'relative' | 展开模式，可选普通占位展开或 `flyout` 浮动展开。 |
| expandWidth | number | 否 | 350 | 展开宽度，单位为 `px`。 |
| expandDisplay | number | 否 | 1024 | 视口宽度大于该值时允许展开。 |
| compactWidth | number | 否 | 50 | 收起宽度，单位为 `px`。 |
| flyoutDisplay | number | 否 | 0 | 视口宽度小于该值时启用浮动模式；若 `expandMode="flyout"` 则始终为浮动模式。 |
| fullSizeDisplay | number | 否 | 800 | 视口宽度小于该值且展开时，面板宽度会切换为 `100%`。 |
| mobileDisplay | number | 否 | 0 | 视口宽度小于该值时启用移动端悬浮控制模式。 |
| showBack | boolean | 否 | true | 是否显示返回按钮。 |
| showSearch | boolean | 否 | true | 是否显示搜索区域。 |
| settingTitle | string | 否 | 'Settings' | 设置项标题。 |
| showSetting | boolean | 否 | true | 是否显示设置项。 |
| background | string | 否 | '' | 面板背景色。 |
| mobileControlBackground | string | 否 | '' | 移动端悬浮控制区的背景色。 |
| mobileControlAcrylic | boolean | 否 | false | 是否为移动端悬浮控制区启用模糊亚克力效果。 |
| mobileControlDirection | string | 否 | 'column' | 移动端悬浮控制按钮的排列方向。 |
| mobileControlLeft | string | 否 | '0px' | 移动端悬浮控制区的 CSS `left` 值。 |
| mobileControlTop | string | 否 | '12px' | 移动端悬浮控制区的 CSS `top` 值。 |
| zIndex | string/number | 否 | '' | 同时控制移动端悬浮控制区和 NavigationPanel 根节点的 CSS `z-index` 值。 |
| theme | string | 否 | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| showNav | boolean | 否 | true | 是否显示导航按钮。 |
| disabled | boolean | 否 | false | 是否禁用。 |
| lang | string | 否 | "global" | 语言配置。 |

### 事件

---

| 事件名 | 参数 | 说明 |
|:---:|:---:|:---|
| setting-click | Object | 点击设置项时触发，返回 `{ event: MouseEvent }`。 |
| update:expand | boolean | 展开状态变化时同步外部 `expand`。 |
| expand-change | boolean | 展开状态变化时触发，并返回当前状态。 |
| expand-click | boolean | 点击导航按钮切换展开状态时触发，并返回切换后的状态。 |
| back | MouseEvent | 点击返回按钮时触发。 |

### 插槽

---

1. SearchBlock

自定义搜索区域内容，默认搜索框仅提供展示。

```javascript
<template v-slot:searchBlock></template>
```

2. NavIcon

自定义导航按钮区域内容，默认图标为 `GlobalNavButton`。

```javascript
<template v-slot:navIcon>
    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
</template>
```

3. BackIcon

自定义返回按钮区域内容，默认图标为 `Back`。

```javascript
<template v-slot:backIcon>
    <i class="ms-Icon ms-Icon--Back icon"></i>
</template>
```

4. Title

自定义标题区域内容，默认展示 `title` 属性值。

```javascript
<template v-slot:title="{ show }">
    <p v-show="show" class="name title">{{ title }}</p>
</template>
```

5. Panel

自定义面板主体内容。

```javascript
<template v-slot:panel></template>
```

6. Banner

自定义顶部 `banner` 区域内容，可用于 Logo 等。

```javascript
<template v-slot:banner></template>
```

7. Setting

自定义设置项区域内容。

```vue
<template v-slot:setting>
    <fv-animated-icon
        v-show="showSetting"
        ref="setting"
        modelValue="bounceRotate"
        class="fv-nav-default-item"
        :hideContent="!thisExpand"
        style="width: calc(100% - 10px)"
        @click="settingClick({ event: $event })"
    >
        <i class="ms-Icon ms-Icon--Settings icon"></i>
        <template v-slot:content>
            <p class="name">{{ settingTitle }}</p>
        </template>
    </fv-animated-icon>
</template>
```

8. Mask

自定义组件遮罩层内容，可用于全局加载态等场景。

```vue
<fv-NavigationPanel>
    <template v-slot:mask>
        <div
            style="
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.35);
                color: white;
                z-index: 10;
            "
        >
            加载中...
        </div>
    </template>
</fv-NavigationPanel>
```

### Appendix

---

1. 获取 `NavigationPanel` 中 `setting` 的 DOM 引用：

```vue
<fv-NavigationPanel v-model="items" ref="nav"></fv-NavigationPanel>
let setting = this.$refs.nav.setting;
```
