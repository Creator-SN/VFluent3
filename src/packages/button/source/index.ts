import { commonProps } from "@/packages/common/props";
import { computed, ExtractPropTypes, ref } from "vue";
import { EmitFn } from "@/types/components";

export const buttonProps = {
	...commonProps,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {};

export type ButtonEmits = typeof buttonEmits;

export const useButton = (props: ButtonProps, emits: EmitFn<ButtonEmits>) => {
	return {};
};
