import { isArray } from './types';

export function clickOutside(
    target?: HTMLElement | null,
    root?: HTMLElement | null | Array<HTMLElement>
) {
    if (
        root === null ||
        root === undefined ||
        target === undefined ||
        target === null
    )
        return true;
    if (
        target === root ||
        (isArray(root) && root.findIndex((e) => e == target) !== -1)
    ) {
        return false;
    }
    while (target !== null && target !== document.body) {
        target = target.parentElement;
        if (
            target === root ||
            (isArray(root) && root.findIndex((e) => e == target) !== -1)
        ) {
            return false;
        }
    }
    return true;
}

function visibleElement(el: HTMLElement) {
    const { display, visibility, transition, animation } = el.style;
    el.style.display = 'initial';
    el.style.visibility = 'hidden';
    el.style.transition = 'none';
    el.style.animation = 'none';
    return { display, visibility, transition, animation };
}

function recoverElement(
    el: HTMLElement,
    {
        display,
        visibility,
        transition,
        animation,
    }: {
        display: string;
        visibility: string;
        transition: string;
        animation: string;
    }
) {
    el.style.display = display;
    el.style.visibility = visibility;
    el.style.transition = transition;
    el.style.animation = animation;
}

export function getBoundingClientRect(el?: HTMLElement): DOMRect {
    if (el === undefined) {
        return new DOMRect(0, 0, 0, 0);
    }
    let { display } = getComputedStyle(el);
    if (display !== 'none') {
        let rect = el.getBoundingClientRect();
        if (rect.height === 0 && rect.width === 0) {
            const collections: Array<{
                el: HTMLElement;
                style: {
                    display: string;
                    visibility: string;
                    transition: string;
                    animation: string;
                };
            }> = [];
            let p = el.parentElement;
            while (p !== null && p !== document.body) {
                display = getComputedStyle(p).display;
                if (display === 'none') {
                    const style = visibleElement(p);
                    collections.push({
                        el: p,
                        style,
                    });
                }
                p = p.parentElement;
            }
            rect = el.getBoundingClientRect();
            for (const item of collections) {
                recoverElement(item.el, item.style);
            }
        }
        return rect;
    }
    const olds = visibleElement(el);
    let rect = el.getBoundingClientRect();
    if (rect.height === 0 && rect.width === 0) {
        const collections: Array<{
            el: HTMLElement;
            style: {
                display: string;
                visibility: string;
                transition: string;
                animation: string;
            };
        }> = [];
        let p = el.parentElement;
        while (p !== null && p !== document.body) {
            display = getComputedStyle(p).display;
            if (display === 'none') {
                const style = visibleElement(p);
                collections.push({
                    el: p,
                    style,
                });
            }
            p = p.parentElement;
        }
        rect = el.getBoundingClientRect();
        for (const item of collections) {
            recoverElement(item.el, item.style);
        }
    }
    recoverElement(el, olds);
    return rect;
}

export type positionDiff = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export function outsideClientPosition(domRect: DOMRect): positionDiff {
    const diff: positionDiff = {
        left: domRect.left,
        top: domRect.top,
        bottom: 0,
        right: 0,
    };
    const w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    diff.right = w - domRect.left - domRect.width;
    diff.bottom = h - domRect.top - domRect.height;
    return diff;
}
