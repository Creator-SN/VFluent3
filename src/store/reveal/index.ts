import { defineStore } from 'pinia';
import { RevealDirect, RevealMasked } from '@/utils/common/revealEffect';

type RevealHandler = {
    id: string;
    moveHandler: Function;
    leaveHandler: Function;
};

export const useRevealCache = defineStore('RevealCache', {
    state: () => ({
        //[{id: String, moveHandler: Function, leaveHandler: Function}], for revealContainer
        revealHandlerList: new Array<RevealHandler>(),
        // for globalReveal
        revealDirectJs: undefined,
        revealMaskedJs: undefined
    }),
    actions: {
        initRevealInstances() {
            if (!this.revealDirectJs)
                this.revealDirectJs = new RevealDirect()
            if (!this.revealMaskedJs)
                this.revealMaskedJs = new RevealMasked()
        },
        setRevealHandler(revealHandler: RevealHandler) {
            this.revealHandlerList.push(revealHandler);
        },
        removeRevealHandler(id: string) {
            let index = this.revealHandlerList.findIndex(
                (item) => id === item.id
            );
            if (index == -1) return;
            this.revealHandlerList.splice(index, 1);
        }
    }
});
