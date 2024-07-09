import { h, render } from 'vue';
import InfoBox from './index.vue';
import type { VNode, ref, Plugin, App, AppContext, InjectionKey } from 'vue';

export type InfoBoxOptions = {
    title: string;
    status: 'default' | 'warning' | 'error' | 'correct' | 'blocked';
    mode: 'fixed' | 'relative';
    confirmTitle: string;
    cancelTitle: string;
    acrylic: boolean;
    control_panel?: VNode;
    confirm: (() => void) | (()=>Promise<void>);   
    cancel: (() => void) | (()=>Promise<void>);
    theme: 'global' | 'light' | 'dark';
    once?: boolean;
    destroy?: ()=>void
};

export function createInfoBox(
    msg: string | VNode,
    options: InfoBoxOptions,
    context: AppContext
) {
    let vnode = (container: HTMLElement) => {
        let thisOptions:InfoBoxOptions = {
            title: 'Tip',
            status: 'default',
            mode: 'fixed',
            confirmTitle: '确定',
            cancelTitle: '取消',
            acrylic: false,
            control_panel: undefined,
            confirm: async () => {},
            cancel: async () => {},
            theme: 'global'
        };
        thisOptions = Object.assign(thisOptions, options);
        const n = h(
            InfoBox,
            {
                title: thisOptions.title,
                status: thisOptions.status,
                mode: thisOptions.mode,
                confirmTitle: thisOptions.confirmTitle,
                cancelTitle: thisOptions.cancelTitle,
                acrylic: thisOptions.acrylic,
                onConfirm: async () => {
                    await thisOptions.confirm();
                    render(null, container);
                    container.remove();
                },
                onClose: async () => {
                    await thisOptions.cancel();
                    render(null, container);
                    container.remove();
                },
                destroy: () => {
                    render(null, container);
                    container.remove();
                },
                theme: thisOptions.theme
            },
            {
                msg: ()=>msg,
                'control-panel': thisOptions.control_panel
            }
        );
        n.appContext = context;
        return n;
    };

    const id = `__fv-global-info-box__`;
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
        div.id = id;
        document.body.appendChild(div);
    }
    render(vnode(div), div);
}

export const infoBoxPlugin: Plugin = {
    install(app: App) {
        app.config.globalProperties.$infoBox = (
            msg: string | VNode,
            options: InfoBoxOptions
        ) => {
            createInfoBox(msg, options, app._context);
        };
    }
};
