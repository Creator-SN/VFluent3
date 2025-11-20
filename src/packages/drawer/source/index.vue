<template>
    <div
        v-show="thisValue"
        ref="drawer"
        class="fv-Drawer"
        :class="[$theme]"
        :style="[
            style.drawer,
            {
                background: background,
                'backdrop-filter': isAcrylic ? 'blur(10px)' : 'none'
            }
        ]"
    >
        <div
            v-show="showTitleBar"
            class="fv-drawer-control-block"
            :style="{ padding: controlPadding }"
        >
            <slot name="header">
                <p
                    class="drawer-title"
                    :style="{
                        'font-size': `${titleSize}px`,
                        'font-weight': titleWeight,
                        color: titleColor
                    }"
                >
                    {{ title }}
                </p>
                <i
                    class="control-btn ms-Icon ms-Icon--Cancel"
                    @click="close"
                ></i>
            </slot>
        </div>
        <div
            class="fv-drawer-main-container"
            :style="{ padding: contentPadding }"
        >
            <slot>Content Here</slot>
        </div>
        <div
            v-show="isFooter"
            class="fv-drawer-footer"
            :style="{ padding: controlPadding }"
        >
            <slot name="footer">
                <fv-button theme="dark" background="rgba(0, 90, 158, 1)"
                    >OK</fv-button
                >
                <fv-button>Cancel</fv-button>
            </slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    ...commonProps,
    position: {
        type: String,
        default: 'bottom'
    },
    modelValue: {
        default: undefined
    },
    length: {
        default: 800
    },
    title: {
        default: 'Drawer'
    },
    titleSize: {
        default: 20
    },
    titleWeight: {
        default: 'bold'
    },
    titleColor: {
        default: ''
    },
    background: {
        default: ''
    },
    borderRadius: {
        default: ''
    },
    controlPadding: {
        default: '12px 24px'
    },
    contentPadding: {
        default: '24px'
    },
    showTitleBar: {
        default: true
    },
    isFooter: {
        default: false
    },
    zIndex: {
        type: Number,
        default: 30
    },
    isLightDismiss: {
        default: true
    },
    isAcrylic: {
        default: true
    },
    appendBody: {
        default: true
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvDrawer',
    data() {
        return {
            lock: false,
            style: {
                drawer: {
                    zIndex: this.zIndex
                }
            },
            thisValue: this.modelValue,
            window: {
                click: (evt) => {
                    if (!this.thisValue || this.lock) return;
                    if (!this.isLightDismiss) return;
                    if (!evt.composedPath().includes(this.$el))
                        this.thisValue = false;
                }
            }
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        thisBorderRadius() {
            if (typeof this.borderRadius == 'number') {
                return this.borderRadius + 'px';
            }
            return this.borderRadius;
        }
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.lock = true;
            this.$emit('update:modelValue', val);
            // Avoid Dumplite Touch
            setTimeout(() => {
                this.setStyle();
            }, 50);
        }
    },
    mounted() {
        this.init();
        this.setStyle();
    },
    beforeUnmount() {
        for (let key in this.window) {
            window.removeEventListener(key, this.window);
        }
    },
    methods: {
        init() {
            for (let key in this.window) {
                window.addEventListener(key, this.window[key]);
            }

            this.$el.addEventListener('transitionend', () => {
                this.lock = false;
            });

            // For compatibility with IOS
            if (this.appendBody) {
                this.globalAppendInit();
            }
        },
        globalAppendInit() {
            this.$nextTick(() => {
                const body = document.querySelector('body');
                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }
            });
        },
        setStyle() {
            let length = this.length;
            // e.g. 100vw 100% 100 and so on.
            if (typeof this.length == 'number') {
                length += 'px';
            }
            if (this.position == 'bottom') {
                this.style.drawer = {
                    left: '0',
                    bottom: '0',
                    height: length,
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderTop: '1px solid rgba(120, 120, 120, 0.1)',
                    borderTopLeftRadius: this.thisBorderRadius,
                    borderTopRightRadius: this.thisBorderRadius,
                    zIndex: this.zIndex,
                    transform: ` ${
                        this.thisValue ? 'translateY(0%)' : 'translateY(110%)'
                    }`
                };
            } else if (this.position == 'top') {
                this.style.drawer = {
                    left: '0',
                    top: '0',
                    height: length,
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderBottom: '1px solid rgba(120, 120, 120, 0.1)',
                    borderBottomLeftRadius: this.thisBorderRadius,
                    borderBottomRightRadius: this.thisBorderRadius,
                    zIndex: this.zIndex,
                    transform: `${
                        this.thisValue ? 'translateY(0%)' : 'translateY(-110%)'
                    }`
                };
            } else if (this.position == 'left') {
                this.style.drawer = {
                    left: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRight: '1px solid rgba(120, 120, 120, 0.1)',
                    borderTopRightRadius: this.thisBorderRadius,
                    borderBottomRightRadius: this.thisBorderRadius,
                    zIndex: this.zIndex,
                    transform: `${
                        this.thisValue ? 'translateX(0%)' : 'translateX(-110%)'
                    }`
                };
            } else {
                this.style.drawer = {
                    right: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderLeft: '1px solid rgba(120, 120, 120, 0.1)',
                    borderTopLeftRadius: this.thisBorderRadius,
                    borderBottomLeftRadius: this.thisBorderRadius,
                    zIndex: this.zIndex,
                    transform: `${
                        this.thisValue ? 'translateX(0%)' : 'translateX(110%)'
                    }`
                };
            }
        },
        close() {
            if (!this.lock) {
                this.thisValue = false;
            }
        }
    },
    beforeUnmount() {
        for (let key in this.window) {
            window.removeEventListener(key, this.window);
        }
        try {
            const body = document.querySelector('body');
            body.removeChild(this.$el);
        } catch (e) {}
    }
};
</script>
