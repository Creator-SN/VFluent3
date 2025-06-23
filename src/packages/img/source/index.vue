<template>
    <div class="fv-Img" :class="[$theme]">
        <fv-ImgBox
            v-if="status == 'imgBox'"
            :url="src"
            :onlazy="onlazy"
            :loadingColor="loadingColor"
            :onbackground="onbackground"
            style="width: 100%; height: 100%"
            @error="status = 'image'"
        ></fv-ImgBox>
        <fv-Image
            v-if="status == 'image'"
            :src="src"
            :onlazy="onlazy"
            style="width: 100%; height: 100%"
        ></fv-Image>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits();

const props = defineProps({
    ...commonProps,
    src: {
        default: ''
    },
    onlazy: {
        default: false
    },
    loadingColor: {
        default: 'rgba(36, 36, 36, 1)'
    },
    onbackground: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvImg',
    data() {
        return {
            status: 'imgBox'
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    }
};
</script>
