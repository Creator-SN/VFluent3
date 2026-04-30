---
page: true
title: TabView
---

<script lang="ts" setup>
import { useTheme } from '../common/index.js';

const { theme } = useTheme();
</script>

# TabView

## 快速开始

### 默认

---

<fv-tab-view :theme="theme">
</fv-tab-view>

```vue-html
<fv-tab-view :theme="theme">
</fv-tab-view>
```

## 属性

---
| 属性 | 类型 | 必填 | 默认值 | 说明 |
|:----:|:----:|:----:|:------:|:----:|
| theme | string | 否 | 'global' | 主题样式，支持 `global`、`light`、`dark`、`system` 和 `custom`。 |
| lang | string | 否 | 'global' | 从组件公共属性继承的语言选项。 |

## 事件

---
暂无自定义事件。
