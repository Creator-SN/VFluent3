import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const imgProps = {
    ...commonProps,
    src: {
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

export type ImgProps = ExtractPropTypes<typeof imgProps>;

export const imgEmits = {
}

export type ImgEmits = typeof imgEmits

export const useImg = (props: ImgProps, emits: EmitFn<ImgEmits>) => {
    const status = ref("imgBox")
    return {
        status
    }
}
