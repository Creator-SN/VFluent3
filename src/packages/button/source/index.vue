<template>
    <div ref="root" class="fv-Button" :class="[theme]" @click="onClick">
        <div
            class="fv-button-main-container"
            :class="[{ disabled: isDisabled }, { shadow: isBoxShadow }]"
            :style="{ borderRadius: `${borderRadius}px` }"
        >
            <fv-reveal-container
                :parent="() => root"
                class="fv-button-reveal-container"
                :backgroundColor="backgroundLightColor"
                :borderColor="borderLightColor"
                :borderGradientSize="80"
                :borderWidth="borderWidth"
                :borderRadius="borderRadius"
                :disabled="isDisabled"
            ></fv-reveal-container>
            <div
                :disabled="disabled"
                class="fv-button-container"
                :style="{
                    background: background,
                    'background-repeat': 'no-repeat',
                    'background-clip': 'content-box',
                    borderColor: borderColor,
                    borderWidth: `${borderWidth}px`,
                    borderRadius: `${borderRadius}px`
                }"
            >
                <span
                    class="fv-btn-content-block"
                    :style="{
                        color: foreground,
                        'font-size': `${fontSize}px`,
                        'font-weight': fontWeight
                    }"
                >
                    <i
                        class="ms-Icon"
                        :class="`ms-Icon--${icon}`"
                        :style="{ 'margin-right': icon != '' ? '5px' : '' }"
                    ></i>
                    <slot>Button</slot>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { commonProps } from '@/packages/common/props';
import { useTheme } from '@/utils/common';

defineOptions({
    name: 'FvButton'
});

const emits = defineEmits({
    click: (evt: Event) => {
        return true;
    }
});
export type ButtonEmits = typeof emits;

const props = defineProps({
    ...commonProps,
    icon: {
        type: [String],
        default: ''
    },
    foreground: {
        type: [String],
        default: ''
    },
    background: {
        type: [String],
        default: ''
    },
    borderRadius: {
        type: [String, Number],
        default: 3
    },
    borderColor: {
        type: [String],
        default: ''
    },
    fontSize: {
        type: [Number],
        default: 13.3
    },
    fontWeight: {
        type: [String],
        default: 'normal'
    },
    revealBorderColor: {
        type: [Boolean, String],
        default: false
    },
    revealBackgroundColor: {
        type: [Boolean, String],
        default: false
    },
    isBoxShadow: {
        type: [Boolean],
        default: false
    },
    disabled: {
        type: [Boolean, String],
        default: false
    },
    borderWidth: {
        type: [Number, String],
        default: 1
    }
});
export type ButtonProps = typeof props;

const { theme } = useTheme(props);
const isDisabled = computed(() => {
    return (
        props.disabled.toString() === 'true' ||
        props.disabled === true ||
        props.disabled === '' ||
        props.disabled === 'disabled'
    );
});
const onClick = (evt: Event) => {
    evt.preventDefault();
    if (isDisabled.value) {
        return false;
    }
    emits('click', evt);
};
const borderLightColor = computed(() => {
    if (props.revealBorderColor) return props.revealBorderColor;
    if (theme.value === 'light') {
        return 'rgba(121, 119, 117, 0.6)';
    }
    if (theme.value === 'dark') {
        return 'rgba(255,255,255,0.6)';
    }
});
const backgroundLightColor = computed(() => {
    if (props.revealBackgroundColor) return props.revealBackgroundColor;
    if (theme.value === 'light') {
        return 'rgba(121, 119, 117, 0.1)';
    }
    if (theme.value === 'dark') {
        return 'rgba(255, 255, 255, 0.1)';
    }
});

const root = ref<HTMLElement>();
</script>