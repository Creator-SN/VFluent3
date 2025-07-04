<template>
    <div
        class="fv-ImgBox"
        :class="[$theme]"
        :style="{
            background: onbackground ? 'url(' + imgUri.data + ') no-repeat' : ''
        }"
    >
        <div v-show="imgUri.state != 'done'" class="fv-img-box-content">
            <fv-progress-ring
                v-show="imgUri.state == 'loading'"
                :value="loadingProgress"
                :loading="loadingProgress === 0"
                :color="loadingColor"
                :r="progressSize.r"
                :borderWidth="progressSize.borderWidth"
                background="transparent"
            ></fv-progress-ring>
        </div>
        <transition name="fade-in">
            <img
                v-if="imgUri.state == 'done' && !onbackground"
                draggable="false"
                alt=""
                :src="imgUri.data"
            />
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits();

const props = defineProps({
    ...commonProps,
    url: {
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
import { useFvImageCache } from '@/store/image';
import { useTheme } from '@/utils/common';

export default {
    name: 'FvImgBox',
    data() {
        return {
            xhr: false,
            loadingProgress: 0,
            width: 0,
            height: 0,
            lazy: false,
            lazyTimer: null,
            formatTimer: null,
            imageCache: null
        };
    },
    watch: {
        url() {
            if (this.xhr != false) this.xhr.abort();
            if (this.url != '' && !this.lazy) this.LoadingImg();
        },
        onlazy(val) {
            this.lazy = val.toString() == 'true' ? true : false;
        },
        lazy(val) {
            if (val) this.lazyInit();
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        imgUri() {
            if (!this.imageCache)
                return {
                    data: '',
                    key: this.url,
                    state: 'none'
                };
            if (!this.url || !this.imageCache.imgUri(this.url)) {
                return {
                    data: '',
                    key: this.url,
                    state: 'none'
                };
            }
            return this.imageCache.imgUri(this.url);
        },
        progressSize() {
            if (this.width <= 20 || this.height <= 20)
                return {
                    r: this.width - 2 > 0 ? this.width - 2 : 2,
                    borderWidth: 2
                };
            if (this.width <= 40 || this.height <= 40)
                return {
                    r: 10,
                    borderWidth: 2
                };
            return {
                r: 20,
                borderWidth: 5
            };
        }
    },
    beforeMount() {
        this.imageCache = useFvImageCache();
    },
    mounted() {
        this.lazy = this.onlazy.toString() == 'true' ? true : false;
        if (this.url && !this.lazy) this.LoadingImg();
        this.widthHeightWatcher();
    },
    methods: {
        LoadingImg() {
            if (this.imgUri.state == 'none') {
                this.imageCache.setImgUri({
                    data: '',
                    key: this.url,
                    state: 'loading'
                });
                this.getUrlImg(this.url);
            }
            clearInterval(this.formatTimer);
            this.formatTimer = setInterval(() => {
                // if data is none and status is not loading then active loading again. //
                if (!this.imageCache) return;
                let storeImgUri = this.imageCache.imgUri(this.url);
                if (
                    !storeImgUri.data &&
                    (storeImgUri.state == 'none' || storeImgUri.state == 'done')
                ) {
                    this.imageCache.setImgUri({
                        data: '',
                        key: this.url,
                        state: 'loading'
                    });
                    this.getUrlImg(this.url);
                }
            }, 3000);
        },
        widthHeightWatcher() {
            let el = this.$el;
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { contentRect, target } = entry;
                    const { width, height } = contentRect;
                    this.width = width;
                    this.height = height;
                }
            });
            resizeObserver.observe(el);
        },
        getUrlImg(url) {
            if (url == undefined) {
                console.warn(`imgBox can't find url: ${url}.`);
                return 0;
            }
            this.loadingProgress = 0;
            let xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            // define the response type what you want to translate in the xhr.response //
            xhr.responseType = 'blob';
            xhr.onreadystatechange = (event) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let blob = xhr.response;
                    let data_type = blob.type.split('/')[0]; // text/plain or image/[any] //
                    let FR = new FileReader();
                    FR.onload = (event) => {
                        let base64 = event.target.result;
                        this.UpdateStore(base64);
                    };
                    if (data_type !== 'text') FR.readAsDataURL(blob);
                    else FR.readAsText(blob);
                } else if (xhr.readyState == 4) {
                }
            };
            xhr.addEventListener('progress', (event) => {
                const percent = (event.loaded / event.total) * 100;
                this.loadingProgress = percent.toFixed(2);
            });
            xhr.send();
            xhr.onerror = (event) => {
                this.$emit('error', event);
                this.imageCache.clearImgUri(this.url);
                console.warn("Fv-ImgBox doesn't support cross-domain url.");
            };
            this.xhr = xhr;
        },
        UpdateStore(base64) {
            this.imageCache.setImgUri({
                data: base64,
                key: this.url,
                state: 'done'
            });
        },
        lazyInit() {
            clearInterval(this.lazyTimer);
            this.lazyTimer = setInterval(() => {
                if (this.$el.getBoundingClientRect().top < window.innerHeight) {
                    this.lazy = false;
                    this.LoadingImg();
                    clearInterval(this.lazyTimer);
                }
            }, 300);
        }
    },
    beforeUnmount() {
        clearInterval(this.formatTimer);
        clearInterval(this.lazyTimer);
    }
};
</script>
