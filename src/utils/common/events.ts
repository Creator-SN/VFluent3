export class MouseMoveEvent {
    eventFunc: (evt?: MouseEvent) => void;
    constructor(func: (evt?: MouseEvent) => void) {
        this.eventFunc = func;
    }
    listen() {
        if (window !== undefined) {
            const destory = this.destory();
            window.addEventListener('mousemove', this.eventFunc);
            window.addEventListener('mouseup', destory);
            window.addEventListener('mouseleave', destory);
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
                window.removeEventListener('mousemove', func);
                window.removeEventListener('mouseup', inner);
                window.removeEventListener('mouseleave', inner);
            }
        };
    }
}
