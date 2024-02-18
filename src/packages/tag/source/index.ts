import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const tagProps = {
    ...commonProps,
}

export type TagProps = ExtractPropTypes<typeof tagProps>;

export const tagEmits = {
}

export type TagEmits = typeof tagEmits

export const useTag = (props: TagProps, emits: EmitFn<TagEmits>) => {
    return {
    }
}
