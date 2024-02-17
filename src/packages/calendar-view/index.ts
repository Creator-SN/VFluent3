import { convertPlugin } from "@/utils/plugins/install-component"
import "./style"
import CalendarView from "./source/index.vue"
export const FvCalendarView = convertPlugin(CalendarView)
export default FvCalendarView
