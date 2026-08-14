## 属性

---
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:----:|:----:|:----:|:------:|:-----|
| forward | string | 否 | 'right' | 滚动方向。支持 `right`、`left`、`horizontal`、`down`、`up` 和 `vertical`。 |
| mode | string | 否 | 'once' | 播放模式。支持 `once`、`repeat`、`bounce`、`loop` 和 `none`。 |
| duration | number | 否 | 3000 | 单次滚动的持续时间，单位为毫秒。 |
| delay | number | 否 | 0 | 动画开始前的延迟时间，单位为毫秒。 |
| interval | number | 否 | 1000 | 重复滚动或来回滚动之间的暂停时间，单位为毫秒。 |
| offset | number / string | 否 | null | 滚动位移距离，单位为像素。为 `null` 时自动使用完整溢出距离；设为 `0` 可关闭滚动。 |
| ease | string | 否 | 'power1.inOut' | 滚动动画使用的 GSAP 缓动函数。 |
| manual | boolean | 否 | false | 是否允许鼠标 / 触摸手动滚动。自动滚动过程中始终禁止手动滚动。 |
| theme | string | 否 | 'global' | 主题样式。支持 `global`、`light`、`dark` 和 `custom`。 |
| disabled | boolean | 否 | false | 是否禁用组件。 |
| lang | string | 否 | "global" | 语言选项。 |
