## 属性

---
| Property           | Type    | Required | Default  | Description |
|:------------------:|:-------:|:--------:|:--------:|:-----------:|
| modelValue         | string  | No       | ''       | 组件的 `v-model` 值。 |
| options            | array   | No       | []       | 搜索结果选项。 |
| placeholder        | string  | No       | ''       | 输入框占位文本。 |
| type               | string  | No       | 'text'   | 输入框类型。 |
| readonly           | boolean | No       | false    | 是否只读。 |
| maxlength          | string  | No       | ''       | 最大输入长度。 |
| customFilter       | boolean | No       | false    | 是否使用自定义过滤逻辑。 |
| resultPlaceholder  | boolean | No       | false    | 结果占位内容。 |
| focusShow          | boolean | No       | false    | 获取焦点时是否显示结果。 |
| leftIcon           | string  | No       | ''       | 左侧图标。 |
| icon               | string  | No       | ''       | 右侧图标。 |
| underline          | boolean | No       | false    | 是否使用下划线样式。 |
| background         | string  | No       | ''       | 搜索框背景。 |
| hoverBackground    | string  | No       | ''       | 搜索框 hover 背景。 |
| borderWidth        | number  | No       | 1        | 边框宽度。 |
| borderColor        | string  | No       | ''       | 边框颜色。 |
| focusBorderColor   | string  | No       | ''       | 聚焦时边框颜色。 |
| foreground         | string  | No       | ''       | 文本颜色。 |
| fontSize           | number  | No       | 13.3     | 字体大小。 |
| fontWeight         | string  | No       | 'normal' | 字体粗细。 |
| textAlign          | string  | No       | 'left'   | 文本对齐方式。 |
| borderRadius       | number  | No       | 3        | 搜索框圆角。 |
| resultBackground   | string  | No       | ''       | 搜索结果容器背景。 |
| resultBorderRadius | string  | No       | ''       | 搜索结果容器圆角。 |
| resultBoxShadow    | boolean | No       | false    | 是否显示 `$ms-depth-shadow-16`。 |
| isBoxShadow        | boolean | No       | false    | 搜索框本体是否显示阴影。 |
| revealBorder       | boolean | No       | false    | 是否启用 reveal 边框效果。 |
| status             | string  | No       | ''       | 状态样式。 |
| debounceDelay      | number  | No       | 300      | 防抖延迟。 |
| disabled           | boolean | No       | false    | 是否禁用。 |
| theme              | string  | No       | 'global' | 主题。 |
| lang               | string  | No       | "global" | 语言。 |
