## 事件

| 事件名 | 参数 | 说明 |
|:--|:--|:--|
| `update:modelValue` | `value: string`, `info?: { hex, rgba, hsla }` | 更新 `v-model` 字符串，同时可通过第二个参数拿到结构化颜色对象。 |
| `color-info` | `info: { hex, rgba, hsla }` | 仅返回结构化颜色对象。 |
