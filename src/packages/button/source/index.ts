import { commonProps } from "@/packages/common/props";
import { computed, ExtractPropTypes, ref } from "vue";
import { EmitFn } from "@/types/components";
import { useTheme } from "@/utils/common";

export const buttonProps = {
	...commonProps,
	icon: {
		type: [String],
		default: "",
	},
	foreground: {
		type: [String],
		default: "",
	},
	background: {
		type: [String],
		default: "",
	},
	borderRadius: {
		type: [String, Number],
		default: 3,
	},
	borderColor: {
		type: [String],
		default: "",
	},
	fontSize: {
		type: [Number],
		default: 13.3,
	},
	fontWeight: {
		type: [String],
		default: "normal",
	},
	revealBorderColor: {
		type: [Boolean],
		default: false,
	},
	revealBackgroundColor: {
		type: [Boolean],
		default: false,
	},
	isBoxShadow: {
		type: [Boolean],
		default: false,
	},
	disabled: {
		type: [Boolean, String],
		default: false,
	},
	borderWidth: {
		type: [Number],
		default: 1,
	},
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
	click: (evt: Event)=>{
		return true;
	}
};

export type ButtonEmits = typeof buttonEmits;

export const useButton = (props: ButtonProps, emits: EmitFn<ButtonEmits>) => {
	const { theme } = useTheme(props)
	const isDisabled = computed(()=>{
		return props.disabled.toString()==="true" || props.disabled===true || props.disabled==="" || props.disabled==="disabled"
	})
	const onClick = (evt:Event)=>{
		evt.preventDefault()
		if (isDisabled.value){
			return false;
		}
		emits("click",evt);
	}
	const borderLightColor = computed(()=>{
		if (props.revealBorderColor) return props.revealBorderColor;
		if (theme.value==="light"){
			return "rgba(121, 119, 117, 0.6)";
		}
		if (theme.value === "dark"){
			return "rgba(255,255,255,0.6)";
		}
	})
	const backgroundLightColor = computed(()=>{
		if (props.revealBackgroundColor) return props.revealBackgroundColor
		if (theme.value === "light") {
			return "rgba(121, 119, 117, 0.1)";
		}
		if (theme.value ==="dark") {
			return "rgba(255, 255, 255, 0.1)";
		}
	})
	return {
		theme,
		isDisabled,
		onClick,
		borderLightColor,
		backgroundLightColor
	};
};
