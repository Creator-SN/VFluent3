import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const iconElementProps = {
    ...commonProps,
}

export type IconElementProps = ExtractPropTypes<typeof iconElementProps>;

export const iconElementEmits = {
}

export type IconElementEmits = typeof iconElementEmits

export const useIconElement = (props: IconElementProps, emits: EmitFn<IconElementEmits>) => {
    return {
    }
}
