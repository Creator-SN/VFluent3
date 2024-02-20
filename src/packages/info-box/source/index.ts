import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const infoBoxProps = {
    ...commonProps,
}

export type InfoBoxProps = ExtractPropTypes<typeof infoBoxProps>;

export const infoBoxEmits = {
}

export type InfoBoxEmits = typeof infoBoxEmits

export const useInfoBox = (props: InfoBoxProps, emits: EmitFn<InfoBoxEmits>) => {
    return {
    }
}
