<template>
    <Layout>

    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import { useFvConfig } from '@/store/common';
import { useData } from 'vitepress'
import { watch } from 'vue';

const { Layout } = DefaultTheme;
const fvConfig = useFvConfig();
const viteData = useData();

watch(viteData.isDark, (val) => {
    if (val) {
        fvConfig.changeTheme('dark');
    } else {
        fvConfig.changeTheme('light');
    }
});
</script>