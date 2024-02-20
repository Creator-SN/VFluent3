import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const imageProps = {
    ...commonProps,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>;

export const imageEmits = {
}

export type ImageEmits = typeof imageEmits

export const useImage = (props: ImageProps, emits: EmitFn<ImageEmits>) => {
    return {
    }
}
