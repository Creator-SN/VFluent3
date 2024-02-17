import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const webWindowProps = {
    ...commonProps,
}

export type WebWindowProps = ExtractPropTypes<typeof webWindowProps>;

export const webWindowEmits = {
}

export type WebWindowEmits = typeof webWindowEmits

export const useWebWindow = (props: WebWindowProps, emits: EmitFn<WebWindowEmits>) => {
    return {
    }
}
