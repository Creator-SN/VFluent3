import { convertPlugin } from "@/utils/plugins/install-component"
import "./style"
import CalendarDatePicker from "./source/index.vue"
export const FvCalendarDatePicker = convertPlugin(CalendarDatePicker)
export default FvCalendarDatePicker
