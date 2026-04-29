## Emits

| Event | Arguments | Description |
|:--|:--|:--|
| `update:modelValue` | `value: string`, `info?: { hex, rgba, hsla }` | Updates the `v-model` string and optionally exposes structured color data as the second argument. |
| `color-info` | `info: { hex, rgba, hsla }` | Emits only the structured color object. |
