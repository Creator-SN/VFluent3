import { convertPlugin } from "@/utils/plugins/install-component"
import "./style"
import TableViewHeadBase from "./source/index.vue"
import { tableViewHeadProps } from "./source/index"
export const FvTableViewHeadProps = tableViewHeadProps
export const FvTableViewHeadBase = convertPlugin(TableViewHeadBase)
export default FvTableViewHeadBase
