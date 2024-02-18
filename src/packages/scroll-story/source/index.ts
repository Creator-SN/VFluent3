import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const scrollStoryProps = {
    ...commonProps,
}

export type ScrollStoryProps = ExtractPropTypes<typeof scrollStoryProps>;

export const scrollStoryEmits = {
}

export type ScrollStoryEmits = typeof scrollStoryEmits

export const useScrollStory = (props: ScrollStoryProps, emits: EmitFn<ScrollStoryEmits>) => {
    return {
    }
}
