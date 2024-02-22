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
		},
		refreshVariables() {
			if (document !== undefined) {
				const t = Array.from(document.styleSheets)
					.map((e) => {
						return Array.from(e.cssRules)
							.map((rule) => {
								// @ts-ignore
								if (rule.selectorText === ":root") {
									return rule.cssText
										.split("{")[1]
										.split("}")[0]
										.split(";")
										.filter((e) =>
											e.trim().startsWith("--fv")
										)
										.map((e) => {
											const [name, value] = e
												.split(":")
												.map((i) => i.trim());
											return {
												name,
												value,
											};
										});
								}
								return [];
							})
							.filter((e) => e.length > 0);
					})
					.filter((e) => e.length > 0)
					.flat(2);
				this.variables = {};
				for (const item of t) {
					this.variables[item.name] = item.value;
				}
			}
		},
	},
});
