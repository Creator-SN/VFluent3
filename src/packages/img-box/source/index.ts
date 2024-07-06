import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { useFvImageCache } from '@/store/image';
import { isBoolean, isDefined, isNotNull } from '@/utils/common';

export const imgBoxProps = {
    ...commonProps,
    url: {
        type: String,
        default: ''
    },
    onlazy: {
        type: Boolean,
        default: false
    },
    loadingColor: {
        type: String,
        default: 'rgba(36, 36, 36, 1)'
    },
    onbackground: {
        type: Boolean,
        default: false
    }
}

export type ImgBoxProps = ExtractPropTypes<typeof imgBoxProps>;

export const imgBoxEmits = {
    error(val:ProgressEvent<EventTarget>){
        return true;
    }
}

export type ImgBoxEmits = typeof imgBoxEmits

export const useImgBox = (props: ImgBoxProps, emits: EmitFn<ImgBoxEmits>) => {
    const imageCache = useFvImageCache();
    const xhr = ref<boolean|XMLHttpRequest>(false)
    const loadingProgress = ref(0)
    const width = ref(0)
    const height = ref(0)
    const lazy = ref(false)
    const lazyTimer = ref<number | NodeJS.Timeout>()
    const formatTimer = ref<number | NodeJS.Timeout>()
    watch(()=>props.url, (newVal, oldVal)=>{
        if (!isBoolean(xhr.value)) xhr.value.abort();
        if (props.url != '' && !lazy.value) loadingImg();
    })
    watch(()=>props.onlazy, (newVal, oldVal)=>{
        lazy.value = newVal;
    })
    watch(()=>lazy.value, (newVal, oldVal)=>{
        if (newVal) lazyInit()
    })
    const imgUri = computed(()=> {
        if (!props.url || !imageCache.imgUri(props.url)) {
            return {
                data: '',
                key: props.url,
                state: 'none'
            };
        }
        return imageCache.imgUri(props.url);
    })
    const progressSize = computed(()=> {
        if (width.value <= 20 || height.value <= 20)
            return {
                r: width.value - 2 > 0 ? width.value - 2 : 2,
                borderWidth: 2
            };
        if (width.value <= 40 || height.value <= 40)
            return {
                r: 10,
                borderWidth: 2
            };
        return {
            r: 20,
            borderWidth: 5
        };
    })
    const loadingImg = () => {
        if (isDefined(imgUri.value)){
            if (imgUri.value.state == 'none') {
                imageCache.setImgUri({
                    data: '',
                    key: props.url,
                    state: 'loading'
                });
                getUrlImg(props.url);
            }
            clearInterval(formatTimer.value);
            formatTimer.value = setInterval(() => {
                // if data is none and status is not loading then active loading again. //
                let storeImgUri = imageCache.imgUri(props.url);
                if (
                    isDefined(storeImgUri) &&
                    !storeImgUri.data &&
                    (storeImgUri.state == 'none' || storeImgUri.state == 'done')
                ) {
                    imageCache.setImgUri({
                        data: '',
                        key: props.url,
                        state: 'loading'
                    });
                    getUrlImg(props.url);
                }
            }, 3000);
        }
    }
    const root = ref<HTMLElement>()
    const widthHeightWatcher = ()=> {
        let el = root.value as Element;
        if (isDefined(el)){
            const resizeObserver = new ResizeObserver((entries) => {
                const refWidth = width
                const refHeight = height
                for (const entry of entries) {
                    const { contentRect, target } = entry;
                    const { width, height } = contentRect;
                    refWidth.value = width;
                    refHeight.value = height;
                }
            });
            resizeObserver.observe(el);
        }
    }
    const getUrlImg = (url:string)=> {
        if (url == undefined) {
            console.warn(`imgBox can't find url: ${url}.`);
            return 0;
        }
        loadingProgress.value = 0;
        let refXhr = xhr.value;
        let localXhr = new XMLHttpRequest();
        localXhr.open('get', url, true);
        // define the response type what you want to translate in the xhr.response //
        localXhr.responseType = 'blob';
        localXhr.onreadystatechange = (event) => {
            if (localXhr.readyState == 4 && localXhr.status == 200) {
                let blob = localXhr.response;
                let data_type = blob.type.split('/')[0]; // text/plain or image/[any] //
                let FR = new FileReader();
                FR.onload = (event:ProgressEvent<FileReader>) => {
                    const target = event.target
                    if (isNotNull(target)){
                        let base64 = target.result;
                        updateStore(base64 as string);
                    }
                };
                if (data_type !== 'text') FR.readAsDataURL(blob);
                else FR.readAsText(blob);
            } else if (localXhr.readyState == 4) {
            }
        };
        localXhr.addEventListener('progress', (event) => {
            const percent = (event.loaded / event.total) * 100;
            loadingProgress.value = parseFloat(percent.toFixed(2));
        });
        localXhr.send();
        localXhr.onerror = (event) => {
            emits('error', event);
            imageCache.clearImgUri(props.url);
            console.warn("Fv-ImgBox doesn't support cross-domain url.");
        };
        xhr.value = localXhr;
    }
    const updateStore = (base64:string)=> {
        imageCache.setImgUri({
            data: base64,
            key: props.url,
            state: 'done'
        });
    }
    const lazyInit = () => {
        clearInterval(lazyTimer.value);
        lazyTimer.value = setInterval(() => {
            if (isDefined(root.value) && root.value.getBoundingClientRect().top < window.innerHeight) {
                lazy.value = false;
                loadingImg();
                clearInterval(lazyTimer.value);
            }
        }, 300);
    }
    return {
        imageCache,
        xhr,
        loadingProgress,
        width,
        height,
        lazy,
        lazyTimer,
        formatTimer,
        imgUri,
        progressSize,
        loadingImg,
        root,
        widthHeightWatcher,
        getUrlImg,
        updateStore,
        lazyInit
    }
}
