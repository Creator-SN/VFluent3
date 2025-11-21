import { convertPlugin } from "@/utils/plugins/install-component"
import "./style"
import TableViewCellBase from "./source/index.vue"
import { tableViewCellProps } from "./source/index"
export const FvTableViewCellProps = tableViewCellProps
export const FvTableViewCellBase = convertPlugin(TableViewCellBase)
export default FvTableViewCellBase
