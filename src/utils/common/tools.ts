export function throttle(func: Function, ms?: number) {
    let lock = false;
    return function inner(...args: any[]): void {
        if (lock) {
            return;
        }
        lock = true;
        if (window !== undefined && ms === undefined) {
            window.requestAnimationFrame(() => {
                func.apply(inner, args);
                lock = false;
            });
        } else {
            setTimeout(
                () => {
                    func.apply(inner, args);
                    lock = false;
                },
                ms === undefined ? 1 / 60 : ms
            );
        }
    };
}
