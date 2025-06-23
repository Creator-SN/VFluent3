<template>
    <div class="fv-TableView" :class="[$theme]">
        FvTableView
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits({
    
});

const props = defineProps({
    ...commonProps,

});
</script>

<script>
import { useTheme } from "@/utils/common";

export default {
    name: "FvTableView",
    data () {
        return {
            
        }
    },
    watch: {
    
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {},
    methods: {
    
    },
    beforeUnmount () {
    
    }
}
</script>
