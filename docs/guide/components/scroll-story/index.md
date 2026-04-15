---
page: true
title: ScrollStory
---


<!-- lang-switch -->
[English](./) | [简体中文](./index.zh-CN.md)
### ScrollStory-DEMO
---

<div style="height: 500px; "></div>

<ClientOnly>
<fv-ScrollStory name="scale-up-to-up"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>

```vue
<fv-ScrollStory name="scale-up-to-up">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Infinite Show

---

<ClientOnly>
<fv-ScrollStory name="scale-down-to-down" :infinite="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>

```vue
<fv-ScrollStory name="scale-down-to-down" :infinite="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### ScrollStory-Over Collapse

---

<ClientOnly>
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true"><fv-colorPicker></fv-colorPicker></fv-ScrollStory>
</ClientOnly>
<div style="height: 500px; "></div>

```vue
<fv-ScrollStory name="scale-down-to-down" :overCollapse="true">
    <fv-colorPicker></fv-colorPicker>
</fv-ScrollStory>
```

### Properties

---
| Property     | Type    | Required | Default  | Description                            |
|:------------:|:-------:|:--------:|:--------:|:--------------------------------------:|
| name         | string  | No       | ''       | Vue transition css name                |
| infinite     | boolean | No       | false    | Infinite show                          |
| overCollapse | boolean | No       | false    | Scroll over collapse                   |
| trueRender   | boolean | No       | false    | Only render when show                  |
| theme        | string  | No       | 'global' | See the ScrollStory `theme` option.    |
| disabled     | boolean | No       | false    | See the ScrollStory `disabled` option. |
| lang         | string  | No       | "global" | See the ScrollStory `lang` option.     |

### Events

---
| Event        | Arguments | Description |
|:------------:|:---------:|:-----------:|
| show-changed | show      |             |
