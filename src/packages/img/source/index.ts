import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const imgProps = {
    ...commonProps,
}

export type ImgProps = ExtractPropTypes<typeof imgProps>;

export const imgEmits = {
}

export type ImgEmits = typeof imgEmits

export const useImg = (props: ImgProps, emits: EmitFn<ImgEmits>) => {
    return {
    }
}
