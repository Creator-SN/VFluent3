---
page: true
title: Radio
---

<!-- lang-switch -->
<script>
export default {
    data() {
        return {
            basicValue: 'Option',
            groupValue: 'Windows',
            darkGroupValue: 'Email',
            iconValue: 'NUIIris',
            imageValue: 'Chart',
            customValue: 'Mint'
        };
    }
}
</script>

[[toc]]

`fv-radio` already supports grouped selection when multiple radios share the same `v-model` and use different `label` values. You can use that pattern directly without `radio-group`.

### Basic

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio v-model="basicValue" label="Option">Option</fv-radio>
    <fv-radio v-model="basicValue" label="Option2">Option2</fv-radio>
    <fv-radio label="Option3" disabled>Disabled</fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio v-model="basicValue" label="Option">Option</fv-radio>
  <fv-radio v-model="basicValue" label="Option2">Option2</fv-radio>
  <fv-radio label="Option3" disabled>Disabled</fv-radio>
</div>
```

### Grouped Radios

---

<ClientOnly>
<div class="radio-docs-card">
    <div class="radio-docs-card__title">Choose a platform</div>
    <div class="radio-docs-row">
        <fv-radio v-model="groupValue" label="Windows">Windows</fv-radio>
        <fv-radio v-model="groupValue" label="macOS">macOS</fv-radio>
        <fv-radio v-model="groupValue" label="Linux">Linux</fv-radio>
    </div>
</div>
</ClientOnly>

```vue
<div class="radio-docs-card">
  <div class="radio-docs-card__title">Choose a platform</div>
  <div class="radio-docs-row">
    <fv-radio v-model="groupValue" label="Windows">Windows</fv-radio>
    <fv-radio v-model="groupValue" label="macOS">macOS</fv-radio>
    <fv-radio v-model="groupValue" label="Linux">Linux</fv-radio>
  </div>
</div>
```

### Inline Group On Dark Surface

---

<ClientOnly>
<div class="radio-docs-card radio-docs-card--dark">
    <div class="radio-docs-card__title">Notification channel</div>
    <div class="radio-docs-row">
        <fv-radio v-model="darkGroupValue" label="Email" theme="dark">Email</fv-radio>
        <fv-radio v-model="darkGroupValue" label="Teams" theme="dark">Teams</fv-radio>
        <fv-radio v-model="darkGroupValue" label="SMS" theme="dark" disabled>SMS</fv-radio>
    </div>
</div>
</ClientOnly>

```vue
<div class="radio-docs-card radio-docs-card--dark">
  <div class="radio-docs-card__title">Notification channel</div>
  <div class="radio-docs-row">
    <fv-radio v-model="darkGroupValue" label="Email" theme="dark">Email</fv-radio>
    <fv-radio v-model="darkGroupValue" label="Teams" theme="dark">Teams</fv-radio>
    <fv-radio v-model="darkGroupValue" label="SMS" theme="dark" disabled>SMS</fv-radio>
  </div>
</div>
```

### With Icon

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio v-model="iconValue" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
    <fv-radio v-model="iconValue" label="MSN" icon="NUIFace">MSN</fv-radio>
    <fv-radio v-model="iconValue" label="DisabledIcon" icon="NUIFace" disabled>Disabled</fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio v-model="iconValue" label="NUIIris" icon="NUIIris">NUIIris</fv-radio>
  <fv-radio v-model="iconValue" label="MSN" icon="NUIFace">MSN</fv-radio>
  <fv-radio v-model="iconValue" label="DisabledIcon" icon="NUIFace" disabled>Disabled</fv-radio>
</div>
```

### With Image

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio
        v-model="imageValue"
        label="Chart"
        image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png"
        activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png"
    >
        Chart
    </fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio
    v-model="imageValue"
    label="Chart"
    image="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-unselected.png"
    activeImage="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/choicegroup-bar-selected.png"
  >
    Chart
  </fv-radio>
</div>
```

### Custom Color

---

<ClientOnly>
<div class="radio-docs-row">
    <fv-radio
        icon="NUIIris"
        v-model="customValue"
        label="Mint"
        style="background:#00cc99;"
        theme="dark"
    >
        Mint
    </fv-radio>
    <fv-radio
        icon="NUIIris"
        v-model="customValue"
        label="MintDisabled"
        style="background:#00cc99;"
        theme="dark"
        disabled
    >
        Disabled
    </fv-radio>
</div>
</ClientOnly>

```vue
<div class="radio-docs-row">
  <fv-radio
    icon="NUIIris"
    v-model="customValue"
    label="Mint"
    style="background:#00cc99;"
    theme="dark"
  >
    Mint
  </fv-radio>
  <fv-radio
    icon="NUIIris"
    v-model="customValue"
    label="MintDisabled"
    style="background:#00cc99;"
    theme="dark"
    disabled
  >
    Disabled
  </fv-radio>
</div>
```

### Properties

---

| Property              | Type                        | Required | Default                 | Description                                                                  |
|:---------------------:|:---------------------------:|:--------:|:-----------------------:|:----------------------------------------------------------------------------:|
| modelValue            | string \| number \| boolean | No       | ''                      | Bound value used by `v-model`. Radios with the same `v-model` act as a group. |
| label                 | string \| number            | Yes      | undefined               | Value assigned when the radio is selected.                                   |
| theme                 | string                      | No       | 'global'                | Theme color.                                                                 |
| icon                  | string                      | No       | null                    | Fluent icon name.                                                            |
| color                 | string                      | No       | ''                      | Text color.                                                                  |
| foreground            | string                      | No       | 'rgba(0, 90, 158, 0.8)' | Active foreground color.                                                     |
| iconBlockBorderRadius | number                      | No       | 6                       | Border radius when using icon or image mode.                                 |
| iconBlockBorderWidth  | number                      | No       | 2                       | Border width when using icon or image mode.                                  |
| image                 | string                      | No       | null                    | Preview image URL.                                                           |
| activeImage           | string                      | No       | null                    | Preview image URL used in the selected state.                                |
| disabled              | boolean                     | No       | false                   | Whether the component is disabled.                                           |
| lang                  | string                      | No       | "global"                | Language option inherited from the library.                                  |

### Events

---

| Event   | Arguments | Description                               |
|:-------:|:---------:|:-----------------------------------------:|
| click   | event     | Emitted when the radio is clicked.        |
| actived | event     | Emitted when the current radio is selected. |

<style>
.radio-docs-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 18px;
}

.radio-docs-card {
    padding: 18px 20px;
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(244, 247, 251, 0.96));
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.radio-docs-card--dark {
    border-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(18, 24, 33, 0.98), rgba(36, 44, 58, 0.95));
    color: #fff;
}

.radio-docs-card__title {
    margin-bottom: 14px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.7;
}
</style>
