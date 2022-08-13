import { commonProps } from '@/packages/common/props';
import { App, computed, ExtractPropTypes, ref, VNode } from 'vue';
import type { Plugin } from 'vue';
import { EmitFn } from '@/types/components';

export const messageBarProps = {
    ...commonProps,
    icon: {
        type: [String],
    },
    showClose: {
        type: [Boolean],
        default: true
    },
    status: {
        type: [String],
        default: 'info',
    },
};

export type MessageBarProps = ExtractPropTypes<typeof messageBarProps>;

export const messageBarEmits = {
    close: () => {
        return true;
    },
};

export type MessageBarEmits = typeof messageBarEmits;

export const useMessageBar = (
    props: MessageBarProps,
    emits: EmitFn<MessageBarEmits>
) => {
    const statusIconMapper: Record<string, string> = {
        info: 'Error',
        warning: 'Warning',
        correct: 'Completed',
        blocked: 'Blocked12',
        error: 'ErrorBadge',
    };
    const computedIcon = computed(() => {
        if (props.icon === undefined) {
            if (statusIconMapper[props.status] !== undefined) {
                return statusIconMapper[props.status];
            } else {
                console.warn(
                    "Status must be one of 'info','warning','correct','blocked','error'"
                );
            }
        }
        return props.icon;
    });
    const onClose = () => {
        emits('close');
    };
    return {
        onClose,
        computedIcon,
    };
};


