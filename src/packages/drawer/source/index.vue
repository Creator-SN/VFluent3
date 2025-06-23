<template>
    <div
        v-show="initShow"
        ref="drawer"
        class="fv-Drawer"
        :class="[$theme]"
        :style="[style.drawer, { background: background }]"
    >
        <slot></slot>
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
    length: {
        default: 300
    },
    background: {
        default: undefined
    },
    modelValue: {
        default: undefined
    },
    zIndex: {
        type: Number,
        default: 10
    },
    focusTrap: {
        type: Boolean,
        default: false
    },
    appendBody: {
        type: Boolean,
        default: false
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
            show: {
                drawer: this.modelValue == undefined ? false : this.modelValue
            },
            initShow: this.computeVisible,
            window: {
                click: (evt) => {
                    if (!this.computeVisible || this.lock) return;
                    if (this.focusTrap) return;
                    let el = evt.target;
                    let _self = false;
                    while (el) {
                        if (el == this.$el) {
                            _self = true;
                        }
                        if (el.parentNode) el = el.parentNode;
                        else break;
                    }
                    if (!_self) this.computeVisible = false;
                }
            }
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        computeVisible: {
            get() {
                return this.modelValue == undefined
                    ? this.show.drawer
                    : this.modelValue;
            },
            set(val) {
                this.show.drawer = val;
                this.$emit('update:modelValue', val);
            }
        }
    },
    watch: {
        computeVisible() {
            this.lock = true;
            this.setStyle();
            // Avoid Dumplite Touch
            setTimeout(() => {
                this.lock = false;
            }, 50);
        }
    },
    mounted() {
        this.init();
        this.setStyle();
        this.initShow = true;
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
                    zIndex: this.zIndex,
                    transform: ` ${
                        this.computeVisible
                            ? 'translateY(0%)'
                            : 'translateY(110%)'
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
                    zIndex: this.zIndex,
                    transform: `${
                        this.computeVisible
                            ? 'translateY(0%)'
                            : 'translateY(-110%)'
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
                    zIndex: this.zIndex,
                    transform: `${
                        this.computeVisible
                            ? 'translateX(0%)'
                            : 'translateX(-110%)'
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
                    zIndex: this.zIndex,
                    transform: `${
                        this.computeVisible
                            ? 'translateX(0%)'
                            : 'translateX(110%)'
                    }`
                };
            }
        },
        close() {
            this.computeVisible = false;
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
