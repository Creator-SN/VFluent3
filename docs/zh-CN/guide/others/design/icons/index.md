---
page: true
title: 图标
---

<script>
import iconList from './iconList.json'

export default {
    data () {
        return {
            iconList: iconList
        }
    },
    methods: {
        copyIcon (name) {
            navigator.clipboard.writeText(name).then(() => {
                this.$barWarning('图标名称已复制到剪贴板', {
                    status: 'correct'
                });
            });
        }
    }
}
</script>

# 图标

## 图标列表

请注意，`Segoe Fluent Icons` 字体中包含的图标远多于此页面展示的数量。很多图标用于特定场景，通常不会在通用界面中使用。

<ClientOnly>
<div v-for="(group, index) in iconList" :key="index" class="icon-group">
    <h3>{{ group.name }}</h3>
    <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
        <span v-for="(iconItem, i) in group.data" :key="i" class="icon-item">
            <fv-button border-radius="8" fontSize="16" :title="`${iconItem[0]} ${iconItem[1]}`" style="width: 60px; height: 60px;" @click="copyIcon(iconItem[1])">
                <i :class="`ms-Icon ms-Icon--${iconItem[1]}`"></i>
            </fv-button>
            <span style="width: 60px; font-size: 8px; display: flex; white-space: nowrap; justify-content: center; align-items: center; overflow: hidden;">{{ iconItem[1] }}</span>
        </span>
    </div>
</div>
</ClientOnly>
