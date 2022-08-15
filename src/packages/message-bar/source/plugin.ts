import { isNumber, isObject } from '@/utils/common';
import type { VNode, ref, Plugin, App, AppContext, InjectionKey } from 'vue';
import { withDirectives, render, h, Transition, vShow, cloneVNode } from 'vue';
import MessageBar from './index.vue';

export type MessageOptions = {
    icon?: string;
    message?: string | VNode;
    control?: string | VNode;
    status?: 'info' | 'warning' | 'correct' | 'blocked' | 'error';
    autoClose?: number;
    theme?: string;
    showControl?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirm?: Function;
    cancel?: Function;
};

export interface MessageBarParams {
    close: () => void;
}

type Container = {
    value?: HTMLElement;
};

export type MessageArgs = {
    context?: AppContext;
};

export function createMessageBar(
    options: MessageOptions = {},
    args: MessageArgs = {}
): MessageBarParams {
    const defaultOptions = {
        status: 'info',
        autoClose: 3000,
    };
    if (isObject(options)) {
        options = Object.assign(defaultOptions,options);
    }
    const container = document.createElement('div');
    container.classList.add('fv-message-bar--container');
    document.body.appendChild(container);
    let timer: NodeJS.Timeout;
    let onRender: Function;
    const destory = () => {
        if (timer !== undefined) clearTimeout(timer);
        render(onRender(false, args.context), container);
    };
    onRender = (show: boolean = false, context: AppContext) => {
        const vnode = h(
            Transition,
            {
                name: 'fv-message-bar-fade-in',
                onAfterLeave: () => {
                    render(null, container);
                    container.remove();
                },
            },
            [
                show
                    ? h(
                          MessageBar,
                          {
                              icon: options.icon,
                              status: options.status,
                              theme: options.theme,
                              showControl: options.showControl,
                              cancelText: options.cancelText,
                              confirmText: options.confirmText,
                              onClose: destory,
                              onConfirm: options.confirm,
                              onCancel: options.cancel,
                          },
                          {
                              default: () => options.message,
                              control: () => options.control,
                          }
                      )
                    : undefined,
            ]
        );
        if (context !== undefined) {
            vnode.appContext = context;
        }
        return vnode;
    };
    render(onRender(false, args.context), container);
    render(onRender(true, args.context), container);
    if (isNumber(options.autoClose) && options.autoClose > 0) {
        timer = setTimeout(() => {
            destory();
        }, options.autoClose);
    }

    return {
        close: destory,
    };
}

export type MessageBarMethod = (options: MessageOptions) => MessageBarParams;

export const MessageBarKey: InjectionKey<MessageBarMethod> =
    Symbol('$barWarning');

export const messageBarPlugin: Plugin = {
    install(app: App) {
        const method = (options: MessageOptions) => {
            const instance = createMessageBar(options, {
                context: app._context,
            });
            return instance;
        };
        app.config.globalProperties.$barWarning = method;
        app.provide<MessageBarMethod>(MessageBarKey, method);
    },
};
