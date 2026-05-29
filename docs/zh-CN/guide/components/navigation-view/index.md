---
page: true
title: NavigationView
---


<!-- lang-switch -->
### NavigationView-DEMO
---

<script>
export default {
    data () {
        return {
            value: {},
            options: [
                { key: 0, name: "Fruits", type: "header"},
                { key: 1, name: "Apple", icon: "WindowsLogo"},
                { key: 2, name: "Banana", icon: "DelveAnalyticsLogo"},
                { key: 3, name: "Orange", icon: "Guitar"},
                { key: 4, name: "Grape", icon: "HailDay"},
                { key: 5, name: "", type: "divider" },
                { key: 6, name: "Vegetables", type: "header"},
                { key: 7, name: "Broccoli", icon: "QuadColumn"},
                { key: 8, name: "Carrot", icon: "Quantity"},
                { key: 9, name: "Lettuce", icon: "TestBeaker"}
            ]
        }
    },
    watch: {
        value (val) {
            console.log(val)
        }
    },
    methods: {
        navigationClick (event) {
            console.log('click', event)
        }
    }
}
</script>

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView  v-model="value" :options="options" @item-click="navigationClick"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+View" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+View" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView v-model="value" :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+View" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+View" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Mobile Display

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

1. Standard

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

2. Flyout

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

3. Mobile

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://placehold.co/1280x720/png?text=VFluent+Navigation+Panel" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### 属性
---

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:---:|:---:|:---:|:---:|:---|
| modelValue | object | 否 | {} | 当前选中项，通过 `v-model` 绑定。 |
| options | array | 否 | [] | 导航项数据，结构参考 `ListView` 的 `items`。 |
| title | string | 否 | 'NavigationView' | NavigationView 标题。 |
| expand | boolean | 否 | true | 初始是否展开，可通过 `v-model:expand` / `update:expand` 同步状态。 |
| expandMode | string | 否 | 'relative' | 展开模式，可选普通占位展开或 `flyout` 浮动展开。 |
| expandWidth | number | 否 | 350 | 展开宽度，单位为 `px`。 |
| expandDisplay | number | 否 | 1024 | 视口宽度大于该值时允许展开。 |
| compactWidth | number | 否 | 46 | 收起宽度，单位为 `px`。 |
| flyoutDisplay | number | 否 | 0 | 视口宽度小于该值时启用浮动模式；若 `expandMode="flyout"` 则始终为浮动模式。 |
| fullSizeDisplay | number | 否 | 800 | 视口宽度小于该值且展开时，导航区域宽度会切换为 `100%`。 |
| mobileDisplay | number | 否 | 0 | 视口宽度小于该值时启用移动端悬浮控制模式。 |
| showBack | boolean | 否 | true | 是否显示返回按钮。 |
| showSearch | boolean | 否 | true | 是否显示搜索区域。 |
| settingTitle | string | 否 | 'Settings' | 设置项标题。 |
| showSetting | boolean | 否 | true | 是否显示底部设置项。 |
| searchPlaceholder | string | 否 | 'Search' | 搜索框占位文本。 |
| foreground | string | 否 | '' | 标题项前景色。 |
| background | string | 否 | '' | 导航面板背景色。 |
| panelClassName | string | 否 | '' | 透传给 NavigationPanel 根节点的自定义类名。 |
| mobileControlBackground | string | 否 | '' | 透传给 NavigationPanel 的移动端悬浮控制区背景色。 |
| mobileControlAcrylic | boolean | 否 | false | 是否为移动端悬浮控制区启用模糊亚克力效果。 |
| mobileControlDirection | string | 否 | 'column' | 移动端悬浮控制按钮的排列方向。 |
| mobileControlLeft | string | 否 | '0px' | 移动端悬浮控制区的 CSS `left` 值。 |
| mobileControlTop | string | 否 | '12px' | 移动端悬浮控制区的 CSS `top` 值。 |
| zIndex | string/number | 否 | '' | 同时控制移动端悬浮控制区和 NavigationPanel 根节点的 CSS `z-index` 值。 |
| theme | string | 否 | 'global' | 主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| emits | array | 否 | [ 'update:modelValue', 'expand-change', 'setting-click', 'item-click', 'back', 'expand-click', 'update:expand' ] | 组件发出的事件声明。 |
| showNav | boolean | 否 | true | 是否显示导航按钮。 |
| disabled | boolean | 否 | false | 是否禁用。 |
| lang | string | 否 | "global" | 语言配置。 |

### 事件

---

| 事件名 | 参数 | 说明 |
|:---:|:---:|:---|
| item-click | object | 点击导航项时触发，返回当前项。 |
| setting-click | Object | 点击设置项时触发，返回 `{ event: MouseEvent }`。 |
| update:expand | boolean | 展开状态变化时同步外部 `expand`。 |
| expand-change | boolean | 展开状态变化时触发，并返回当前状态。 |
| expand-click | boolean | 点击导航按钮切换展开状态时触发，并返回切换后的状态。 |
| back | MouseEvent | 点击返回按钮时触发。 |

### 插槽

---

1. ListItem

自定义列表项渲染，作用域参数与 `ListView` 保持一致，常用字段有 `item`、`index`、`valueTrigger`。

```vue
<template v-slot:listItem="x">
    <i v-show="x.valueTrigger(x.item.icon) !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.valueTrigger(x.item.icon)}`]"></i>
    <p class="name" :style="{ color: x.valueTrigger(x.item.type) == 'header' ? foreground : ''}">{{x.valueTrigger(x.item.name)}}</p>
</template>
```

收起状态下如果你自定义了文本节点，记得保留 `name` 类名，便于样式正确工作。

2. NavIcon

自定义导航按钮区域内容，默认图标为 `GlobalNavButton`。

```vue
<template v-slot:navIcon>
    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
</template>
```

3. BackIcon

自定义返回按钮区域内容，默认图标为 `Back`。

```vue
<template v-slot:backIcon>
    <i class="ms-Icon ms-Icon--Back icon"></i>
</template>
```

4. Title

自定义标题区域内容，默认展示 `title` 属性值。

```vue
<template v-slot:title="{ show }">
    <p v-show="show" class="name title">{{ title }}</p>
</template>
```

5. Banner

自定义顶部 `banner` 区域内容，可用于 Logo 等。

```vue
<template v-slot:banner>
    <div class="banner">
        <img src="https://placehold.co/200x300/png?text=Logo" alt="logo" />
    </div>
</template>
```

6. Setting

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

7. Mask

自定义组件遮罩层内容，可用于全局加载态等场景。

```vue
<fv-NavigationView :options="options">
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
</fv-NavigationView>
```

### Data

---

1. options

- 数据格式参考 `ListView` 中 `items` 的结构；建议在存在同名项时始终提供 `key` 进行区分。
- 可以通过 `icon` 字段应用 `Fabric Icon` 图标。

```javascript
options = [{ key: "", name: "", type: "", icon: "", disabled: "" }];

// e.g. //

options: [
    { key: 0, name: "Fruits", type: "header"},
    { key: 1, name: "Apple", icon: "WindowsLogo"},
    { key: 2, name: "Banana", icon: "DelveAnalyticsLogo"},
    { key: 3, name: "Orange", icon: "Guitar"},
    { key: 4, name: "Grape", icon: "HailDay"},
    { key: 5, name: "", type: "divider" },
    { key: 6, name: "Vegetables", type: "header"},
    { key: 7, name: "Broccoli", icon: "QuadColumn"},
    { key: 8, name: "Carrot", icon: "Quantity"},
    { key: 9, name: "Lettuce", icon: "TestBeaker"}
];
```

### Appendix

---

1. `NavigationView` 的 `setting` 项不包含在 `options` 中，因此无法直接在 `options` 里找到它。
当选中 `setting` 项时，`value` 会变成 `{ name: ">setting", type: "setting" }`，你也可以从外部直接赋这个值来切换到设置项。

特别地，自 `0.1.54` 版本后支持函数式字段，支持的字段包括 `name`、`disabled`、`choosen`、`type`、`icon`、`show`。
