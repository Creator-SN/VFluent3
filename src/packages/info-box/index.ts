import {
    convertPluginWithOthers,
} from '@/utils/plugins/install-component';
import './style';
import InfoBox from './source/index.vue';
import { infoBoxPlugin } from './source/plugin';
export const FvInfoBox = convertPluginWithOthers(InfoBox, [infoBoxPlugin]);
export default FvInfoBox;
export * from './source/plugin';
