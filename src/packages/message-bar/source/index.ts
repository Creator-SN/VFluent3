import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const messageBarProps = {
    ...commonProps,
}

export type MessageBarProps = ExtractPropTypes<typeof messageBarProps>;

export const messageBarEmits = {
}

export type MessageBarEmits = typeof messageBarEmits

export const useMessageBar = (props: MessageBarProps, emits: EmitFn<MessageBarEmits>) => {
    return {
    }
}
