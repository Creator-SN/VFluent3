import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const breadcrumbProps = {
    ...commonProps,
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;

export const breadcrumbEmits = {
}

export type BreadcrumbEmits = typeof breadcrumbEmits

export const useBreadcrumb = (props: BreadcrumbProps, emits: EmitFn<BreadcrumbEmits>) => {
    return {
    }
}
