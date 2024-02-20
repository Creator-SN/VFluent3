import { h, render } from 'vue';
import MessageBar from './index.vue';
import type { VNode, ref, Plugin, App, AppContext, InjectionKey } from 'vue';

export type MessageOptions = {
    control?: string | VNode;
    status?: 'default' | 'warning' | 'correct' | 'blocked' | 'error';
    autoClose?: number;
    theme?: string;
    showControl?: boolean;
    once?: boolean;
};

export function createMessageBar(
    msg: string | VNode,
    options: MessageOptions,
    context: AppContext
) {
    let vnode = (container: HTMLElement) => {
        const n = h(
            MessageBar,
            {
                status: options.status,
                showControl: options.showControl,
                showClose: options.autoClose,
                mode: 'fixed',
                autoClose: options.autoClose,
                destroy: () => {
                    render(null, container);
                    if (!options.once) {
                        container.remove();
                    }
                },
                theme: options.theme
            },
            {
                msg: msg,
                control: options.control
            }
        );
        n.appContext = context;
        return n;
    };

    let div: HTMLElement | null = document.createElement('div');
    if (options.once) {
        const id = `__fv-global-message-bar__`;
        div = document.getElementById(id);
        if (!div) {
            div = document.createElement('div');
            div.id = id;
            document.body.appendChild(div);
        }
    } else document.body.appendChild(div);
    render(vnode(div), div);
}

export type SwiftWarningOptions = {
    oriContent?: null | string;
    oriClass?: null | string;
    oriStyle?: null | string;
    replaceTitle?: null | string;
    color?: string;
};

interface SwiftWarningElement extends HTMLElement {
    fvSwiftWarning: boolean;
}

export function createSwiftWarning(
    element: SwiftWarningElement,
    options: SwiftWarningOptions
) {
    if (element.fvSwiftWarning) return 0;
    let thisOptions: SwiftWarningOptions = {
        color: 'rgba(200, 50, 59, 1)',
        replaceTitle: 'SwiftWarning'
    };
    thisOptions = Object.assign(thisOptions, options);
    thisOptions.oriContent = element.innerHTML;
    thisOptions.oriClass = element.getAttribute('class');
    thisOptions.oriStyle = element.getAttribute('style');
    if (thisOptions.oriClass == undefined) thisOptions.oriClass = '';
    if (thisOptions.oriStyle == undefined) thisOptions.oriStyle = '';
    element.fvSwiftWarning = true;
    element.innerHTML = thisOptions.replaceTitle ?? 'SwiftWarning';
    element.setAttribute('class', thisOptions.oriClass + ` fv-swift-warning`);
    element.setAttribute(
        'style',
        thisOptions.oriStyle + ` color: ${thisOptions.color};`
    );
    setTimeout(() => {
        element.innerHTML = thisOptions.oriContent ?? '';
        element.setAttribute('class', thisOptions.oriClass ?? '');
        element.setAttribute('style', thisOptions.oriStyle ?? '');
        element.fvSwiftWarning = false;
    }, 3000);
}

export const messageBarPlugin: Plugin = {
    install(app: App) {
        app.config.globalProperties.$barWarning = (
            msg: string | VNode,
            options: MessageOptions
        ) => {
            createMessageBar(
                msg,
                { ...options, status: 'warning' },
                app._context
            );
        };
        app.config.globalProperties.$swiftWarning = createSwiftWarning;
    }
};
