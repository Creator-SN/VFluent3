import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const ratingControlProps = {
    ...commonProps,
}

export type RatingControlProps = ExtractPropTypes<typeof ratingControlProps>;

export const ratingControlEmits = {
}

export type RatingControlEmits = typeof ratingControlEmits

export const useRatingControl = (props: RatingControlProps, emits: EmitFn<RatingControlEmits>) => {
    return {
    }
}
