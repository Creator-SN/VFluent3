import { defineStore } from "pinia";

type RevealHandler = {
	id: string;
	moveHandler: Function;
	leaveHandler: Function;
};

export const useRevealCache = defineStore("RevealCache", {
	state: () => ({
		//[{id: String, moveHandler: Function, leaveHandler: Function}]
		revealHandlerList: new Array<RevealHandler>(),
	}),
	actions: {
		setRevealHandler(revealHandler: RevealHandler) {
			this.revealHandlerList.push(revealHandler);
		},
		removeRevealHandler(id: string) {
			let index = this.revealHandlerList.findIndex(
				(item) => id === item.id
			);
			if (index == -1) return;
			this.revealHandlerList.splice(index, 1);
		},
	},
});
