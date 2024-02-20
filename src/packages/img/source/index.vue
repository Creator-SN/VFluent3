<template>
    <div
        class="fv-Img"
        :class="[$theme]"
    >
        <fv-ImgBox
            v-if="status == 'imgBox'"
            :url="src"
            :onlazy="onlazy"
            :loadingColor="loadingColor"
            :onbackground="onbackground"
            style="width: 100%; height: 100%;"
            @error="status = 'image'"
        ></fv-ImgBox>
        <fv-Image
            v-if="status == 'image'"
            :src="src"
            :onlazy="onlazy"
            style="width: 100%; height: 100%;"
        ></fv-Image>
    </div>
</template>
        
<script>
import { imgProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvImg',
    props: {
        ...imgProps,
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
    },
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

