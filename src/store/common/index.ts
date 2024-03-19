import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * global config for components
 */
export const useFvConfig = defineStore("FvConfig", {
	state: () => ({
		theme: "light",
		variables: {},
	}),
	actions: {
		changeTheme(val: null | string) {
            if(!val) this.theme = this.theme === "light" ? "dark" : "light";
			else this.theme = val;
		}
	},
});
