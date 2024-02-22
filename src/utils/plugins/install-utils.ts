import type { App, Plugin } from "vue";

import { SDate } from '@/utils/common/usual';
import { SUtility } from '@/utils/common/usual';
import { useFvConfig } from "@/store/common";

export const UtilsPlugin: Plugin = {
    install(app: App) {
        app.config.globalProperties.$SDate = SDate;
        app.config.globalProperties.$SUtility = SUtility;
        app.config.globalProperties.$FvConfig = useFvConfig();
    }
};