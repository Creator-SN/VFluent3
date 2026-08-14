---
page: true
title: RollText
---

<script lang="ts" setup>
import { useTheme } from '../common/index.js';

const { theme } = useTheme();
</script>

# RollText

## Quick Start

RollText is used to reveal text that does not fit in the element itself. Use `forward` to control the scrolling direction, and place the text in the default slot. Set `width` / `height` directly on the component when you need a constrained viewport.

### Horizontal

<ClientOnly>
<fv-roll-text style="width: 260px;" :theme="theme" forward="right" mode="once" :duration="2500" :offset="160">
This title is too long for a narrow navigation bar
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 260px;"
    :theme="theme"
    forward="right"
    mode="once"
    :duration="2500"
    :offset="160"
>
    This title is too long for a narrow navigation bar
</fv-roll-text>
```

### Vertical

<ClientOnly>
<fv-roll-text style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;" :theme="theme" forward="down" mode="loop" :duration="2500" :interval="600">
<div style="height: 22px; line-height: 22px;">1. First announcement</div>
<div style="height: 22px; line-height: 22px;">2. Second announcement</div>
<div style="height: 22px; line-height: 22px;">3. Third announcement</div>
<div style="height: 22px; line-height: 22px;">4. Fourth announcement</div>
<div style="height: 22px; line-height: 22px;">5. Fifth announcement</div>
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;"
    :theme="theme"
    forward="down"
    mode="loop"
    :duration="2500"
    :interval="600"
>
    <div style="height: 22px; line-height: 22px;">1. First announcement</div>
    <div style="height: 22px; line-height: 22px;">2. Second announcement</div>
    <div style="height: 22px; line-height: 22px;">3. Third announcement</div>
    <div style="height: 22px; line-height: 22px;">4. Fourth announcement</div>
    <div style="height: 22px; line-height: 22px;">5. Fifth announcement</div>
</fv-roll-text>
```

### Modes

The `mode` prop supports:

- `once`: a single one-way scroll.
- `repeat`: repeat one-way scrolling, with `interval` as the pause before restarting from the beginning.
- `bounce`: one back-and-forth scroll.
- `loop`: continuous back-and-forth scrolling.
- `none`: disable auto scrolling, useful when you only want manual scrolling.

<ClientOnly>
<fv-roll-text style="width: 260px;" :theme="theme" forward="right" mode="loop" :duration="1800" :interval="400" :offset="120">
Loop back and forth
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 260px;"
    :theme="theme"
    forward="right"
    mode="loop"
    :duration="1800"
    :interval="400"
    :offset="120"
>
    Loop back and forth
</fv-roll-text>
```

### Manual Scrolling

Set `manual` to allow wheel or touch scrolling. Manual scrolling is locked while auto scrolling is active, so use `mode="none"` for a purely manual sample.

<ClientOnly>
<fv-roll-text style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;" :theme="theme" forward="down" mode="none" :manual="true">
<div style="height: 22px; line-height: 22px;">1. First announcement</div>
<div style="height: 22px; line-height: 22px;">2. Second announcement</div>
<div style="height: 22px; line-height: 22px;">3. Third announcement</div>
<div style="height: 22px; line-height: 22px;">4. Fourth announcement</div>
<div style="height: 22px; line-height: 22px;">5. Fifth announcement</div>
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 240px; height: 72px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 4px 8px;"
    :theme="theme"
    forward="down"
    mode="none"
    :manual="true"
>
    <div style="height: 22px; line-height: 22px;">1. First announcement</div>
    <div style="height: 22px; line-height: 22px;">2. Second announcement</div>
    <div style="height: 22px; line-height: 22px;">3. Third announcement</div>
    <div style="height: 22px; line-height: 22px;">4. Fourth announcement</div>
    <div style="height: 22px; line-height: 22px;">5. Fifth announcement</div>
</fv-roll-text>
```

### Hover Trigger

Use `trigger="hover"` to start the animation only while the mouse is over the component. The animation stops when the mouse leaves.

<ClientOnly>
<fv-roll-text style="width: 260px;" :theme="theme" forward="right" mode="loop" :duration="1800" :interval="400" :offset="120" trigger="hover">
This is a long title that cannot fit inside a narrow navigation bar, so it keeps scrolling while the mouse is hovering over it
</fv-roll-text>
</ClientOnly>

```vue-html
<fv-roll-text
    style="width: 260px;"
    :theme="theme"
    forward="right"
    mode="loop"
    :duration="1800"
    :interval="400"
    :offset="120"
    trigger="hover"
>
    This is a long title that cannot fit inside a narrow navigation bar, so it keeps scrolling while the mouse is hovering over it
</fv-roll-text>
```

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
