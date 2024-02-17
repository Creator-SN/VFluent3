import { defineStore } from 'pinia';
import { RevealDirect, RevealMasked } from '@/utils/common/revealEffect';

type RevealHandler = {
    id: string;
    moveHandler: Function;
    leaveHandler: Function;
};

export const useRevealCache = defineStore('RevealCache', {
    state: () => ({
        //[{id: String, moveHandler: Function, leaveHandler: Function}]
        revealHandlerList: new Array<RevealHandler>(),
        revealDirectJs: new RevealDirect(),
        revealMaskedJs: new RevealMasked()
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
        }
    }
});