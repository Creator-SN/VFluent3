---
page: true
title: Icons
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
                this.$barWarning('Icon name copied to clipboard', {
                    status: 'correct'
                });
            });
        }
    }

}
</script>

# Icons

## Icon list

Please keep in mind that the `Segoe Fluent Icons` font includes many more icons than we can show here. Many of the icons are intended for specialized purposes and are not typically used anywhere else.

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
