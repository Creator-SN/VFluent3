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
        revealDirectJs: new RevealDirect(),
        revealMaskedJs: new RevealMasked(),
    }),
    actions: {
        initRevealInstances() {
            this.revealDirectJs.init();
            this.revealMaskedJs.init();
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
