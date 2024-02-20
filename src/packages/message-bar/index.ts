import { convertPluginWithOthers } from "@/utils/plugins/install-component"
import "./style"
import MessageBar from "./source/index.vue"
import { messageBarPlugin } from './source/plugin';
export const FvMessageBar = convertPluginWithOthers(MessageBar, [
    messageBarPlugin,
]);
export default FvMessageBar;
export * from "./source/plugin"
