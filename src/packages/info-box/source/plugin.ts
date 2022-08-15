import { isNumber, isObject } from '@/utils/common';
import type { VNode, ref, Plugin, App, AppContext, InjectionKey } from 'vue';
import { withDirectives, render, h, Transition } from 'vue';
import InfoBox from './index.vue';

export type InfoOptions = {
    icon?: string;
    message?: string | VNode;
    control?: string | VNode;
    title?: string;
    status?: 'info' | 'warning' | 'correct' | 'blocked' | 'error';
    theme?: string;
    confirmTitle?: string;
    cancelTitle?: string;
    confirm?: Function;
    cancel?: Function;
};

export interface InfoBoxParams {
    close: () => void;
}


export type InfoArgs = {
    context?: AppContext;
};

export function createInfoBox(
    options: InfoOptions = {},
    args: InfoArgs = {}
): InfoBoxParams {
    const defaultOptions = {
        status: 'info',
        theme: 'light'
    };
    if (isObject(options)) {
        options = Object.assign(defaultOptions, options);
    }
    const container = document.createElement('div');
    container.classList.add('fv-info-box--container');
    if (options.theme!==undefined)
        container.classList.add(options.theme)
    const scrollFunc = (e:Event)=>e.preventDefault();
    container.addEventListener("touchmove",scrollFunc)
    container.addEventListener("scroll",scrollFunc)
    document.body.classList.add("fv-info-box-mask")
    document.body.appendChild(container);
    let onRender: Function;
    const destory = () => {
        render(onRender(false, args.context), container);
    };
    onRender = (show: boolean = false, context: AppContext) => {
        const vnode = h(
            Transition,
            {
                name: 'fv-info-box-fade-in',
                onAfterLeave: () => {
                    render(null, container);
                    container.removeEventListener("touchmove",scrollFunc)
                    container.removeEventListener("scroll",scrollFunc)
                    document.body.classList.remove("fv-info-box-mask")
                    container.remove();
                },
            },
            [
                show
                    ? h(
                          InfoBox,
                          {
                              title: options.title,
                              icon: options.icon,
                              status: options.status,
                              theme: options.theme,
                              cancelText: options.cancelTitle,
                              confirmText: options.confirmTitle,
                              onConfirm: () => {
                                  if (options.confirm !== undefined) {
                                      options.confirm();
                                  }
                                  destory();
                              },
                              onCancel: () => {
                                  if (options.cancel !== undefined) {
                                      options.cancel();
                                  }
                                  destory();
                              },
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
    return {
        close: destory,
    };
}

export type InfoBoxMethod = (options: InfoOptions) => InfoBoxParams;

export const InfoBoxKey: InjectionKey<InfoBoxMethod> =
    Symbol('$infoBox');

export const infoBoxPlugin: Plugin = {
    install(app: App) {
        const method = (options: InfoOptions) => {
            const instance = createInfoBox(options, {
                context: app._context,
            });     
            return instance;
        };
        app.config.globalProperties.$infoBox = method;
        app.provide<InfoBoxMethod>(InfoBoxKey, method);
    },
};
