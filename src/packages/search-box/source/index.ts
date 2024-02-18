import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const searchBoxProps = {
    ...commonProps,
}

export type SearchBoxProps = ExtractPropTypes<typeof searchBoxProps>;

export const searchBoxEmits = {
}

export type SearchBoxEmits = typeof searchBoxEmits

export const useSearchBox = (props: SearchBoxProps, emits: EmitFn<SearchBoxEmits>) => {
    return {
    }
}
