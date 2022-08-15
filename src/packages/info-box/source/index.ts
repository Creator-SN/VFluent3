import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const infoBoxProps = {
    ...commonProps,
    icon: {
        type: [String],
    },
    status: {
        type: [String],
        default: 'info',
    },
    title: {
        type: [String],
        default: 'Tip',
    },
    confirmTitle: {
        type: [String],
        default: 'Confirm',
    },
    cancelTitle: {
        type: [String],
        default: 'Cancel',
    },
};

export type InfoBoxProps = ExtractPropTypes<typeof infoBoxProps>;

export const infoBoxEmits = {
    confirm: () => {
        return true;
    },
    cancel: () => {
        return true;
    },
};

export type InfoBoxEmits = typeof infoBoxEmits;

export const useInfoBox = (
    props: InfoBoxProps,
    emits: EmitFn<InfoBoxEmits>
) => {
    const statusIconMapper: Record<string, string> = {
        info: 'Error',
        warning: 'Warning',
        correct: 'Completed',
        blocked: 'Blocked12',
        error: 'ErrorBadge',
    };
    const statusBackgroundMapper:Record<string,string> = {
        info: 'rgb(var(--fv-primary-color))',
        warning: 'rgb(var(--fv-warning-color))',
        correct: 'rgb(var(--fv-success-color))',
        blocked: 'rgb(var(--fv-error-color))',
        error: 'rgb(var(--fv-error-color))',
    }
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
    const computedButtonBackground = computed(()=>{
        if (statusBackgroundMapper[props.status]!==undefined){
            return statusBackgroundMapper[props.status];
        }
        return statusBackgroundMapper["info"];
    })
    const onCancel = () => {
        emits('cancel');
    };
    const onConfirm = () => {
        emits('confirm');
    };
    return {
        onCancel,
        onConfirm,
        computedButtonBackground,
        computedIcon,
    };
};
