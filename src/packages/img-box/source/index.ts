import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const imgBoxProps = {
    ...commonProps,
}

export type ImgBoxProps = ExtractPropTypes<typeof imgBoxProps>;

export const imgBoxEmits = {
}

export type ImgBoxEmits = typeof imgBoxEmits

export const useImgBox = (props: ImgBoxProps, emits: EmitFn<ImgBoxEmits>) => {
    return {
    }
}
