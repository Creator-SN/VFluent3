import { commonProps } from '@/packages/common/props';
import {
    computed,
    ExtractPropTypes,
    onMounted,
    onUnmounted,
    ref,
    watch,
    watchEffect,
} from 'vue';
import { EmitFn } from '@/types/components';
import { useFvImageCache } from '@/store/image';
import { ImageUtil } from '@/utils/common/image/base64';

export const imgProps = {
    ...commonProps,
    src: {
        type: [String],
    },
    fit: {
        type: [String],
    },
    lazy: {
        type: [Boolean],
    },
    cache: {
        type: [Boolean],
    },
    crossorigin: {
        type: [String],
    },
    alt: {
        type: [String],
        default: '',
    },
};

export type ImgProps = ExtractPropTypes<typeof imgProps>;

export const imgEmits = {
    loaded(evt: Event) {
        return true;
    },
    error(evt: string | Event) {
        return true;
    },
};

export type ImgEmits = typeof imgEmits;

export const useImg = (props: ImgProps, emits: EmitFn<ImgEmits>) => {
    const loading = ref<boolean>(true);
    const container = ref<HTMLDivElement>();
    const img = ref<HTMLImageElement>();
    const { getImage, cacheImage } = useFvImageCache();
    const fromCache = ref<boolean>(false);
    const imgContainer = ref<HTMLDivElement>();
    const lazyHandler = ref<Function>();
    let observer: IntersectionObserver | undefined = undefined;
    function createImageInstance() {
        if (props.src !== undefined) {
            loading.value = true;
            // remove old image
            if (img.value !== undefined) {
                img.value.remove();
            }
            const loadFunction = () => {
                if (props.src === undefined) return;
                fromCache.value = false;
                img.value = new Image();
                img.value.alt = props.alt;
                if (props.crossorigin !== undefined) {
                    img.value.crossOrigin = props.crossorigin;
                }
                if (
                    props.cache === true &&
                    !props.src.trimStart().startsWith('data:')
                ) {
                    // get if cache
                    const imageCache = getImage(props.src);
                    if (imageCache !== undefined) {
                        img.value.src = imageCache;
                        fromCache.value = true;
                    } else {
                        img.value.src = props.src;
                    }
                } else {
                    img.value.src = props.src;
                }
                img.value.onload = (evt) => {
                    if (
                        props.cache &&
                        props.src !== undefined &&
                        img.value !== undefined &&
                        fromCache.value === false &&
                        !props.src.trimStart().startsWith('data:')
                    ) {
                        // cached fail if cross origin without crossOrigin property
                        try {
                            cacheImage(
                                props.src,
                                ImageUtil.imageElementToBase64(img.value)
                            );
                            const imageCache = getImage(props.src);
                            fromCache.value = true;
                            if (imageCache !== undefined) {
                                img.value.src = imageCache;
                                fromCache.value = true;
                            }
                        } catch {
                            console.error(
                                'Caching failed. Please add the crossorigin property and set the Access-Control-Allow-Origin header to allow requests to cross origin. see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin',
                                img.value
                            );
                        }
                    }
                    if (loading.value === true) {
                        loading.value = false;
                        if (
                            container.value !== undefined &&
                            container.value !== null &&
                            img.value !== undefined
                        ) {
                            img.value.classList.add('image');
                            container.value.appendChild(img.value);
                        }
                        emits('loaded', evt);
                    }
                };
                img.value.onerror = (evt: string | Event) => {
                    console.error(evt);
                    emits('error', evt);
                };
            };
            if (props.lazy === true) {
                lazyHandler.value = () => {
                    if (loading.value === true) {
                        loadFunction();
                    }
                };
            } else {
                if (loading.value === true) {
                    loadFunction();
                }
            }
        }
    }
    function onSRCChange() {
        if (props.src !== undefined) {
            createImageInstance();
        }
    }
    function onLazyChange() {
        if (props.lazy === true) {
            if (observer === undefined) {
                observer = new IntersectionObserver(
                    (entrys) => {
                        if (entrys[0].intersectionRatio > 0) {
                            if (lazyHandler.value !== undefined) {
                                lazyHandler.value(entrys);
                            }
                        }
                    },
                    {
                        threshold: 0.05,
                    }
                );
            }
            if (imgContainer.value !== undefined) {
                observer.observe(imgContainer.value);
            }
        } else {
            if (imgContainer.value !== undefined) {
                observer?.unobserve(imgContainer.value);
            }
        }
    }
    // warning: don't use watchEffect
    watch(
        () => props.src,
        () => {
            onSRCChange();
        }
    );
    watch(
        () => props.lazy,
        () => {
            onLazyChange();
        }
    );
    onMounted(() => {
        onSRCChange();
        onLazyChange();
    });
    onUnmounted(() => {
        img.value?.remove();
        observer?.disconnect();
    });
    return {
        container,
        loading,
        imgContainer,
    };
};
