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
    <fv-img src="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView v-model="value" :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g072152fd3a4d4d2221a931dc4e77199cd9b84a01595a0c855db60d30faf12f3e7b5fd53bf822f8a812c67900ae03c364367ffbf63756bf5752abe1c48ed3e41b389ba40f71a94a73506b5c02bb374d0a_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Mobile Display

---

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### NavigationView-Flyout

---

1. Standard

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

2. Flyout

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" expandMode="flyout" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

3. Mobile

<ClientOnly>
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
</ClientOnly>

```vue
<div style="position: relative; width: 100%; height: 800px; background: black; display: flex;">
    <fv-NavigationView :options="options" mobileDisplay="100000000" flyoutDisplay="500" theme="dark"></fv-NavigationView>
    <fv-img src="https://pixabay.com/get/g565be166e8140f4ba327de9588f7861b05817f9a28f618d4e954c7144a8b0dfddbee037ae9c48046eb2012b6b855ee6b712ac77debfc0908aac74a33bbdd631cad05872f40a5bd1fd648e49325023e08_1280.jpg?attachment=" style="width: 350px; height: 100%; flex: 1;"></fv-img>
</div>
```

### Properties

---

| Property          | Type    | Required | Default                                                                                                          | Description                                                              |
|:-----------------:|:-------:|:--------:|:----------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------:|
| modelValue        | object  | No       | {}                                                                                                               | See the NavigationView `modelValue` option.                              |
| options           | array   | No       | []                                                                                                               | See the NavigationView `options` option.                                 |
| title             | string  | No       | 'NavigationView'                                                                                                 | See the NavigationView `title` option.                                   |
| expand            | boolean | No       | true                                                                                                             | See the NavigationView `expand` option.                                  |
| expandMode        | string  | No       | 'relative'                                                                                                       | See the NavigationView `expandMode` option.                              |
| expandWidth       | number  | No       | 350                                                                                                              | See the NavigationView `expandWidth` option.                             |
| expandDisplay     | number  | No       | 1024                                                                                                             | See the NavigationView `expandDisplay` option.                           |
| compactWidth      | number  | No       | 46                                                                                                               | See the NavigationView `compactWidth` option.                            |
| flyoutDisplay     | number  | No       | 0                                                                                                                | See the NavigationView `flyoutDisplay` option.                           |
| fullSizeDisplay   | number  | No       | 800                                                                                                              | See the NavigationView `fullSizeDisplay` option.                         |
| mobileDisplay     | number  | No       | 0                                                                                                                | See the NavigationView `mobileDisplay` option.                           |
| showBack          | boolean | No       | true                                                                                                             | See the NavigationView `showBack` option.                                |
| showSearch        | boolean | No       | true                                                                                                             | See the NavigationView `showSearch` option.                              |
| settingTitle      | string  | No       | 'Settings'                                                                                                       | See the NavigationView `settingTitle` option.                            |
| showSetting       | boolean | No       | true                                                                                                             | See the NavigationView `showSetting` option.                             |
| searchPlaceholder | string  | No       | 'Search'                                                                                                         | See the NavigationView `searchPlaceholder` option.                       |
| foreground        | string  | No       | ''                                                                                                               | See the NavigationView `foreground` option.                              |
| background        | string  | No       | ''                                                                                                               | See the NavigationView `background` option.                              |
| theme             | string  | No       | 'global'                                                                                                         | Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`. |
| emits             | array   | No       | [ 'update:modelValue', 'expand-change', 'setting-click', 'item-click', 'back', 'expand-click', 'update:expand' ] | See the NavigationView `emits` option.                                   |
| showNav           | boolean | No       | true                                                                                                             | See the NavigationView `showNav` option.                                 |
| disabled          | boolean | No       | false                                                                                                            | See the NavigationView `disabled` option.                                |
| lang              | string  | No       | "global"                                                                                                         | See the NavigationView `lang` option.                                    |

### Events

---

| Event         | Arguments  | Description                               |
|:-------------:|:----------:|:-----------------------------------------:|
| item-click    | object     | See the component `item-click` option.    |
| setting-click | Object     | See the component `setting-click` option. |
| update:expand | boolean    | See the component `update:expand` option. |
| expand-change | boolean    | See the component `expand-change` option. |
| expand-click  |            |                                           |
| back          | MouseEvent | See the component `back` option.          |

### Slots

---

1. ListItem





```vue
<template v-slot:listItem="x">
    <i v-show="x.valueTrigger(x.item.icon) !== undefined" class="ms-Icon icon" :class="[`ms-Icon--${x.valueTrigger(x.item.icon)}`]"></i>
    <p class="name" :style="{ color: x.valueTrigger(x.item.type) == 'header' ? foreground : ''}">{{x.valueTrigger(x.item.name)}}</p>
</template>
```



2. NavIcon



```vue
<template v-slot:navIcon>
    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
</template>
```

3. BackIcon



```vue
<template v-slot:backIcon>
    <i class="ms-Icon ms-Icon--Back icon"></i>
</template>
```

4. Title



```vue
<template v-slot:title="{ show }">
    <p v-show="show" class="name title">{{ title }}</p>
</template>
```

5. Banner



```vue
<template v-slot:banner>
    <div class="banner">
        <img src="https://picsum.photos/200/300" alt="logo" />
    </div>
</template>
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
            Loading...
        </div>
    </template>
</fv-NavigationView>
```


### Data

---

1. options




```javascript
options = [{ key: "", name: "", type: "", icon: "", disabled: "" }];

//e.g.//

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
