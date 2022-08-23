import { isMobile } from './browser';

export class MouseMoveEvent {
    eventFunc: (evt?: MouseEvent | TouchEvent) => void;
    constructor(func: (evt?: MouseEvent | TouchEvent) => void) {
        this.eventFunc = (evt?: MouseEvent | TouchEvent) => {
            evt?.preventDefault();
            func(evt);
        };
    }
    listen() {
        if (window !== undefined) {
            const destory = this.destory();
            if (!isMobile()) {
                window.addEventListener('mousemove', this.eventFunc);
                window.addEventListener('mouseup', destory);
                window.addEventListener('mouseleave', destory);
            } else {
                window.addEventListener('touchmove', this.eventFunc, {
                    passive: false,
                });
                window.addEventListener('touchend', destory);
            }
            return {
                destory,
            };
        }
        return {
            destory: () => {},
        };
    }
    destory() {
        const func = this.eventFunc;
        return function inner() {
            if (window !== undefined) {
                if (!isMobile()) {
                    window.removeEventListener('mousemove', func);
                    window.removeEventListener('mouseup', inner);
                    window.removeEventListener('mouseleave', inner);
                } else {
                    window.removeEventListener('touchmove', func);
                    window.removeEventListener('touchend', inner);
                }
            }
        };
    }
}
