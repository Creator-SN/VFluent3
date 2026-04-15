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

### 属性

---
| 属性         | 类型    | 必填  | 默认值   | 说明                         |
|:------------:|:-------:|:-----:|:--------:|:----------------------------:|
| name         | string  | 否    | ''       | Vue transition css name      |
| infinite     | boolean | 否    | false    | Infinite show                |
| overCollapse | boolean | 否    | false    | Scroll over collapse         |
| trueRender   | boolean | 否    | false    | Only render when show        |
| theme        | string  | 否    | 'global' | 参见组件的 `theme` 选项。    |
| disabled     | boolean | 否    | false    | 参见组件的 `disabled` 选项。 |
| lang         | string  | 否    | "global" | 参见组件的 `lang` 选项。     |

### 事件

---
| 事件名       | 参数  | 说明  |
|:------------:|:-----:|:-----:|
| show-changed | show  |       |
