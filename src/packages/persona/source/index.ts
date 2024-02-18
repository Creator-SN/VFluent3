import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const personaProps = {
    ...commonProps,
}

export type PersonaProps = ExtractPropTypes<typeof personaProps>;

export const personaEmits = {
}

export type PersonaEmits = typeof personaEmits

export const usePersona = (props: PersonaProps, emits: EmitFn<PersonaEmits>) => {
    return {
    }
}
