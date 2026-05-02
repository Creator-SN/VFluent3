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

### Properties

---

| Property        | Type    | Required | Default           | Description                                                              |
|:---------------:|:-------:|:--------:|:-----------------:|:------------------------------------------------------------------------:|
| title           | string  | No       | 'NavigationPanel' | See the NavigationPanel `title` option.                                  |
| expand          | boolean | No       | true              | See the NavigationPanel `expand` option.                                 |
| expandMode      | string  | No       | 'relative'        | See the NavigationPanel `expandMode` option.                             |
| expandWidth     | number  | No       | 350               | See the NavigationPanel `expandWidth` option.                            |
| expandDisplay   | number  | No       | 1024              | See the NavigationPanel `expandDisplay` option.                          |
| compactWidth    | number  | No       | 50                | See the NavigationPanel `compactWidth` option.                           |
| flyoutDisplay   | number  | No       | 0                 | See the NavigationPanel `flyoutDisplay` option.                          |
| fullSizeDisplay | number  | No       | 800               | See the NavigationPanel `fullSizeDisplay` option.                        |
| mobileDisplay   | number  | No       | 0                 | See the NavigationPanel `mobileDisplay` option.                          |
| showBack        | boolean | No       | true              | See the NavigationPanel `showBack` option.                               |
| showSearch      | boolean | No       | true              | See the NavigationPanel `showSearch` option.                             |
| settingTitle    | string  | No       | 'Settings'        | See the NavigationPanel `settingTitle` option.                           |
| showSetting     | boolean | No       | true              | See the NavigationPanel `showSetting` option.                            |
| background      | string  | No       | ''                | See the NavigationPanel `background` option.                             |
| theme           | string  | No       | 'global'          | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| showNav         | boolean | No       | true              | See the NavigationPanel `showNav` option.                                |
| disabled        | boolean | No       | false             | See the NavigationPanel `disabled` option.                               |
| lang            | string  | No       | "global"          | See the NavigationPanel `lang` option.                                   |

### Events

---

| Event         | Arguments  | Description                               |
|:-------------:|:----------:|:-----------------------------------------:|
| setting-click | Object     | See the component `setting-click` option. |
| update:expand | boolean    | See the component `update:expand` option. |
| expand-change | boolean    | See the component `expand-change` option. |
| expand-click  |            |                                           |
| back          | MouseEvent | See the component `back` option.          |

### Slots

---

1. SearchBlock



```javascript
<template v-slot:searchBlock></template>
```

2. NavIcon



```javascript
<template v-slot:navIcon>
    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
</template>
```

2. BackIcon



```javascript
<template v-slot:backIcon>
    <i class="ms-Icon ms-Icon--Back icon"></i>
</template>
```

3. Title



```javascript
<template v-slot:title="{ show }">
    <p v-show="show" class="name title">{{ title }}</p>
</template>
```

4. Panel



```javascript
<template v-slot:panel></template>
```

5. Banner



```javascript
<template v-slot:banner></template>
```

6. Setting

Use this slot to render custom content in the settings entry area.

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

Use this slot to render a custom overlay mask for the whole component, for example a global loading layer.

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
            Loading...
        </div>
    </template>
</fv-NavigationPanel>
```


### Appendix

---



```vue
<fv-NavigationPanel v-model="items" ref="nav"></fv-NavigationPanel>
let setting = this.$refs.nav.setting;
```
