import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { isArray, isDefined, isNumber, isString, useTheme } from '@/utils/common';
import { useRevealCache } from '@/store/reveal';
import { SDate, SUtility } from '@/utils/common/usual';

type DetailsListItem = Record<string, any>

type HeadItem = {
    content?: string
    minWidth?: string | number
    width?: string | number
    sortName?: string
    customSort?: (a:DetailsListItem, b:DetailsListItem)=>number
    visible?: boolean | (()=>boolean)
    disX?: number
    show?: boolean
}

type GroupItem = {
    key: string
    value: string
    name?: string
    expand?: boolean
    data?: Array<DetailsListItem>
}

type FilterItem = {
    key: string
    value: string
} | string

export const detailsListProps = {
    ...commonProps,
    modelValue: {
        type: Array as PropType<Array<DetailsListItem>>,
        default: ()=>[]
    },
    head: {
        type: Array as PropType<Array<HeadItem>>,
        default: ()=>[]
    },
    group: {
        type: Array as PropType<Array<GroupItem>>,
        default: ()=>[]
    },
    filter: {
        type: Object as PropType<FilterItem>,
        default: ()=>({
            key: "any",
            value: ""
        })
    },
    showGroup: {
        type: Boolean,
        default: false
    },
    autoHeight: {
        type: Boolean,
        default: false
    },
    foreground: {
        type: String,
        default: ""
    },
    headBackground: {
        type: String,
        default: ""
    },
    compact: {
        type: Boolean,
        default: false
    },
    multiSelection: {
        type: Boolean,
        default: false
    },
    allowDrag: {
        type: Boolean,
        default: false
    },
    rowCss: {
        type: String,
        default: ""
    },
    rightMenuWidth: {
        type: Number,
        default: 200
    },
}

export type DetailsListProps = ExtractPropTypes<typeof detailsListProps>;

export const detailsListEmits = {
    "update:modelValue": (val: DetailsListItem)=>{
        return true
    },
    "change-value": (val: DetailsListItem)=>{
        return true;
    },
    "choose-items": (val: Array<DetailsListItem>)=>{
        return true;
    },
    "lazyload": (val: DetailsListItem)=>{
        return true;
    },
    "rightclick": (val: DetailsListItem)=>{
        return true;
    },
    "drop-items": (val: {
        transfer: DetailsListItem[] | DetailsListItem,
        value: DetailsListItem
    })=>{
        return true;
    }
}

export type DetailsListEmits = typeof detailsListEmits

export const useDetailsList = (props: DetailsListProps, emits: EmitFn<DetailsListEmits>) => {
    const thisValue = ref<Array<DetailsListItem>>([]);
    const listWidth = ref<number>(0)
    const thisHead = ref<Array<HeadItem>>([])
    const thisGroup = ref<Array<GroupItem>>([])
    const posX = ref(0)
    const posY = ref(0)
    const rightMenuHeight = ref(0)
    const windowResize = ref({
        trigger: false,
        width: 0
    })
    const sort = ref({
        name: "",
        desc: false
    })
    const dragTransfer = ref<DetailsListItem | DetailsListItem[]>({})
    const show = ref({
        rightMenu: false
    })
    const styles = ref({
        listHead: {
            background: ""
        }
    })
    const timer = ref<{
        width?: number | NodeJS.Timeout
        resize?: number | NodeJS.Timeout
    }>({
        width: undefined,
        resize: undefined
    })
    watch(()=>props.modelValue, ()=>{
        valueInit();
        if(sort.value.name != "")
        {
            let col = thisHead.value.find(item => item.sortName === sort.value.name);
            if(isDefined(col))
                sortClick(col, false);
        }
        groupInit();
    })
    watch(()=>props.head, ()=>{
        headInit()
        widthFormat(0)
    },{deep:true})
    watch(()=>props.group, ()=>{
        groupInit()
    })
    watch(()=>props.filter, () =>{
        filterValue();
    },{deep:true})
    watch(()=>thisGroup.value, ()=> {
        getGroupDataInit();
    })
    watch(()=>props.headBackground, () =>{
        stylesInit();
    })
    watch(()=>props.multiSelection, ()=> {
        for (let i = 0; i < thisValue.value.length; i++) {
            let t = thisValue.value[i];
            t.choosen = false;
            thisValue.value[i] = t;
        }
    })
    watch(()=>listWidth.value,(val)=> {
        widthFormat(0);
    })
    const rightMenu = ref<HTMLElement>()
    watch(()=>show.value.rightMenu, ()=> {
        if(rightMenuHeight.value == 0 && isDefined(rightMenu.value))
            rightMenuHeight.value = rightMenu.value.clientHeight;
    })
    const colWidth = computed(()=>{
        let width = [];
        for(let item of thisHead.value) {
            width.push(`${item.width}px`);
        }
        return width;
    })
    const currentChoosen  = computed(()=> {
        let result = [];
        for (let i = 0; i < thisValue.value.length; i++) {
            if(thisValue.value[i].choosen && thisValue.value[i].show)
                result.push(thisValue.value[i]);
        }
        return result;
    })
    const currentChoosenAll = computed(()=> {
        for (let i = 0; i < thisValue.value.length; i++) {
            if(thisValue.value[i].choosen != true &&thisValue.value[i].show)
                return false;
        }
        return true;
    })
    const currentChoosenNum = computed(()=> {
        let count = 0;
        for (let i = 0; i < thisValue.value.length; i++) {
            if(thisValue.value[i].choosen && thisValue.value[i].show)
                count++;
        }
        return count;
    })
    const currentExpandAll = computed( ()=> {
        for (let i = 0; i < thisGroup.value.length; i++) {
            if(thisGroup.value[i].expand != true)
                return false;
        }
        return true;
    })
    const {theme} = useTheme(props)
    const borderLightColor = computed(() => {
        return () => {
            if(theme.value == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if(theme.value == 'dark' || theme.value == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        }
    })
    const backgroundLightColor = computed(()=> {
        return () => {
            if(theme.value == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if(theme.value == 'dark' || theme.value == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        }
    })
    const uR = useRevealCache();
    uR.initRevealInstances();
    const FRTableHead = ref()
    const root = ref<HTMLElement>()
    const listHead = ref<HTMLElement>()
    const FRInit = ()=>{
        FRTableHead.value = uR.revealMaskedJs.apply(root.value, {
            maskedSelector: listHead.value,
            borderGradientSize: 80,
            borderLightColor: borderLightColor.value,
            backgroundLightColor: backgroundLightColor.value,
            selector: root.value?.querySelectorAll('.list-head .col')
        });
    }
    const stylesInit = ()=> {
        styles.value.listHead.background = props.headBackground;
    }
    const headInit = ()=> {
        let model:HeadItem = {
            content: "",
            minWidth: 60,
            width: 80,
            disX: 0,
            sortName: undefined,
            customSort: undefined,
            show: true,
            visible: true
        };
        thisHead.value = [];
        for (let item of props.head) {
            let m = JSON.parse(JSON.stringify(model));
            if (typeof (item) == "string")
                m.content = item;
            else {
                for (let iter in item)
                    m[iter] = item[iter as keyof typeof item];
            }
            thisHead.value.push(m);
        }
    }
    const valueInit = ()=> {
        let val = JSON.parse(JSON.stringify(props.modelValue));
        for (let i = 0; i < val.length; i++) {
            val[i].choosen = val[i].choosen == undefined ? false : val[i].choosen;
            val[i].show = true;
        }
        thisValue.value = val;
        filterValue();
    }
    const groupInit = ()=> {
        let model = {
            name: "",
            key: 60,
            value: 80,
            data: [],
            expand: true
        };
        thisGroup.value = [];
        for (let item of props.group) {
            let m = JSON.parse(JSON.stringify(model));
            if (typeof (item) == "string")
                m.name = item;
            else {
                for (let iter in item)
                    m[iter] = item[iter as keyof typeof item];
            }
            thisGroup.value.push(m);
        }
    }
    const getGroupDataInit = ()=> {
        let group = thisGroup.value;
        for (let i = 0; i < group.length; i++) {
            group[i].data = [];
            for (let item of thisValue.value) {
                if (item[group[i].key] == group[i].value){
                    group[i].data?.push(item);
                }
            }
        }
    }
    const listWidthRefreshInit = ()=> {
        timer.value.width = setInterval(() => {
            if (isDefined(root.value)){
                let w = root.value.clientWidth;
                if (props.multiSelection)
                    w -= 50;
                if (props.showGroup)
                    w -= 36;
                listWidth.value = w;
            }
        }, 30);
    }
    const watchWindowResizeInit = () => {
        window.addEventListener("resize", () => {
            windowResize.value.trigger = true;
        });
        timer.value.resize = setInterval(() => {
            let currentWidth = document.body.clientWidth;
            if (windowResize.value.trigger) {
                if (windowResize.value.width == currentWidth) {
                    headInit();
                    widthFormat(0);
                    windowResize.value.trigger = false;
                }
            }
            windowResize.value.width = currentWidth;
        }, 350);
    }
    const l1 = ref<HTMLElement>()
    const l2 = ref<HTMLElement>()
    const lazyLoadInit = () => {
        if (isDefined(l1.value) && isDefined(l2.value)){
            SUtility.ScrollToLoadInit(l1.value, () => {
                emits('lazyload', thisValue.value);
            });
            SUtility.ScrollToLoadInit(l2.value, () => {
                emits('lazyload', thisValue.value);
            });
        }
    }
    const rightMenuClearInit = ()=> {
        window.addEventListener('click', event => {
            let x = event.target;
            if (x !== rightMenu.value)
                show.value.rightMenu = false;
        });
    }
    const filterValue = () => {
        let filter:typeof props.filter = props.filter;
        if (isString(props.filter))
            filter = {
                key: "any",
                value: props.filter
            };
        if (!isString(filter)){
            if (filter.key == undefined || filter.value == undefined) {
                console.warn(filter.value, "Invalid filter.");
                return 0;
            }
            if (filter.key == "any") {
                for (let i = 0; i < thisValue.value.length; i++) {
                    let status = false;
                    let item = thisValue.value[i];
                    for (let it in thisValue.value[i]) {
                        if (typeof (item[it]) != "string")
                            continue;
                        if (item[it].toLowerCase().indexOf(filter.value.toLowerCase()) > -1) {
                            status = true;
                            break;
                        }
                    }
                    item.show = status;
                }
            }
            else {
                for (let i = 0; i < thisValue.value.length; i++) {
                    let item = thisValue.value[i];
                    let status = (thisValue.value[i][filter.key].toLowerCase().indexOf(filter.value.toLowerCase()) > -1);
                    item.show = status;
                }
            }
            emits("change-value", thisValue.value);
        }
    }
    const resizeDown = (event:MouseEvent, index:number) =>{
        let item = thisHead.value[index];
        item.disX = event.clientX;
        thisHead.value[index] = item;
    }
    const resizeMove = (event:MouseEvent, index:number)=> {
        for (let i = thisHead.value.length - 1; i >= 0; i--) {
            if (thisHead.value[i].visible) {
                if (i === index) return;
                break;
            }
        }
        let item = thisHead.value[index];
        if (isDefined(item.disX) && isNumber(item.width) && isNumber(item.minWidth)){
                let dis = event.clientX - item.disX;
                item.disX = event.clientX;
                let t = item.width + dis;
                t = t < item.minWidth ? item.minWidth : t;
                let sum = 0;
                for (let i = 0; i < index; i++){
                    const v = thisHead.value[i]
                    if (isNumber(v.width))
                        sum += v.width;
                }
                t = t > (listWidth.value - sum) ? (listWidth.value - sum) : t;
                item.width = t;
                thisHead.value[index] = item;
                widthFormat(index);
        }
    }
    const widthFormat = (index:number)=> {
        if (index < thisHead.value.length - 1) {
            let sum = 0;
            for (let i = 0; i <= index; i++) {
                if (!thisHead.value[i].visible)
                    continue;
                const v = thisHead.value[i]
                if (isNumber(v.width))
                    sum += v.width;
            }
            let remain = listWidth.value - sum;
            let r = remain;
            let need = 0;
            for (let i = index + 1; i < thisHead.value.length; i++) {
                if (!thisHead.value[i].visible)
                    continue;
                const v = thisHead.value[i]
                if (isNumber(v.width)){
                    need += v.width;
                }
            }
            for (let i = thisHead.value.length - 1; i > index; i--) {
                if (!thisHead.value[i].visible)
                    continue;
                const v = thisHead.value[i]
                if (isNumber(v.width) && isNumber(v.minWidth)){
                    let n = need - v.width;
                    if (n + v.minWidth <= remain) {
                        let item = v;
                        item.width = remain - n;
                        item.show = true;
                        break;
                    }
                    else {
                        let item = v;
                        item.show = false;
                    }
                    need -= v.width;
                }
            }
        }
    }
    const itemChooseClick = (item: DetailsListItem)=> {
        let index = thisValue.value.indexOf(item);
        let t = item;
        t.choosen = !t.choosen;
        emits("change-value", thisValue.value);
        emits("choose-items", currentChoosen.value);
    }
    const chooseCurrent = (item:DetailsListItem)=> {
        for (let i = 0; i < thisValue.value.length; i++) {
            let t = thisValue.value[i];
            t.choosen = false;
        }
        item.choosen = true;
        emits("change-value", thisValue.value);
        emits("choose-items", currentChoosen.value);
    }
    const chooseAll = () => {
        let status = !currentChoosenAll.value;
        for (let i = 0; i < thisValue.value.length; i++) {
            let t = thisValue.value[i];
            t.choosen = status;
        }
        emits("change-value", thisValue.value);
        emits("choose-items", currentChoosen.value);
    }
    const isGroupChooseAll = (group:GroupItem)=> {
        if (isDefined(group.data)){
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                if (!t.choosen)
                    return false;
            }
        }
        return true;
    }
    const chooseGroup = (group: GroupItem)=> {
        let status = !isGroupChooseAll(group);
        if (isDefined(group.data)){
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                t.choosen = status;
            }
            emits("change-value", thisValue.value);
            emits("choose-items", currentChoosen.value);
        }
    }
    const expandGroup = (group: GroupItem)=> {
        let index = thisGroup.value.indexOf(group);
        let g = group;
        g.expand = !g.expand;
        thisGroup.value[index] = g;
    }
    const expandAll = () =>{
        let status = !currentExpandAll.value;
        for (let i = 0; i < thisGroup.value.length; i++) {
            let g = thisGroup.value[i];
            g.expand = status;
        }
    }
    const rightClick = (event:MouseEvent, item: DetailsListItem)=> {
        event.preventDefault();
        show.value.rightMenu = true;
        if (isDefined(root.value)){
            let bounding = root.value.getBoundingClientRect();
            let targetPos = {
                x:event.x,
                y:event.y
            };
            if (targetPos.x < bounding.left)
                targetPos.x = bounding.left;
            if (targetPos.x + props.rightMenuWidth > bounding.right)
                targetPos.x = bounding.right - props.rightMenuWidth;
            if (targetPos.y < bounding.top)
                targetPos.y = bounding.top;
            if (targetPos.y + rightMenuHeight.value > bounding.bottom)
                targetPos.y = bounding.bottom - rightMenuHeight.value;
            posX.value = targetPos.x;
            posY.value = targetPos.y;

            emits('rightclick', item);
        }
    }
    const sortClick=(item:HeadItem, reverse = true)=> {
        /* 当要取消升降切换时将reverse设为false */
        let desc: boolean | number = sort.value.desc;
        if (!isDefined(item.sortName))
            return 0;
        if (sort.value.name != item.sortName)
            desc = false;
        else
            desc = reverse ? !sort.value.desc : sort.value.desc;
        sort.value.name = item.sortName;
        sort.value.desc = desc;
        const desc_forward = desc ? -1 : 1;
        if (isDefined(item.customSort))
            thisValue.value.sort((a, b) => { 
                if (isDefined(item.customSort))
                    return desc_forward * item.customSort(a, b)
                return desc_forward
            });
        else
            inteliSort(item.sortName, desc);
    }
    const inteliSort = (key: string = "", desc:number | boolean = false) => {
        let sortFunc = sortName;
        let timeReg = [/^\d{4}[-/]\d{1,2}[-/]\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/, /^\d{1,2}[-/]\d{1,2}[-/]\d{4} \d{1,2}:\d{1,2}:\d{1,2}$/, /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/, /^\d{1,2}[-/]\d{1,2}[-/]\d{4}/];
        let ex = thisValue.value[0][key];
        if (!isNaN(ex))
            sortFunc = sortNum;
        else {
            for (let reg of timeReg) {
                if (!ex.toString().match(reg) == false)
                    sortFunc = sortTime;
            }
        }
        thisValue.value.sort((a, b) => (desc as number)* sortFunc(a[key], b[key]));
    }
    const sortNum = (item1: string , item2:string)=> {
        return parseFloat(item1) < parseFloat(item2) ? 1 : -1;
    }
    const sortName = (item1: string, item2:string)=> {
        return item1.localeCompare(item2);
    }
    const sortTime = (item1: string, item2: string) => {
        return SDate.Compare(
            SDate.Parse(item1),
            SDate.Parse(item2)
        );
    }
    const drag = (event:DragEvent, item:DetailsListItem)=> {
        if (currentChoosenNum.value == 0)
            dragTransfer.value = item;
        else if (!item.choosen) {
            chooseCurrent(item);
            dragTransfer.value = item;
        }
        else
            dragTransfer.value = currentChoosen.value;
    }
    const drop = (item:DetailsListItem) =>{
        let target = dragTransfer.value;
        let current = item;
        let c_index = thisValue.value.indexOf(current);
        if (isArray(target) &&  currentChoosenNum.value > 0 && target[0].choosen) {
            for (let i = target.length - 1; i >= 0; i--)
                thisValue.value.splice(thisValue.value.indexOf(target[i]), 1);
            if (current.choosen)
                thisValue.value.splice(0, 0, ...target);
            else {
                c_index = thisValue.value.indexOf(current);
                thisValue.value.splice(c_index, 0, ...target);
            }
        }
        else {
            let tIndex = thisValue.value.indexOf(target);
            thisValue.value.splice(tIndex, 1);
            thisValue.value.splice(c_index, 0, target);
        }
        emits('drop-items', {
            transfer: target,
            value: thisValue.value
        });
    }
    return {
        thisValue,
        listWidth,
        thisHead,
        thisGroup,
        posX,
        posY,
        rightMenuHeight,
        windowResize,
        sort,
        dragTransfer,
        show,
        styles,
        timer,
        rightMenu,
        colWidth,
        currentChoosen,
        currentChoosenAll,
        currentChoosenNum,
        currentExpandAll,
        theme,
        borderLightColor,
        backgroundLightColor,
        uR,
        FRTableHead,
        root,
        listHead,
        FRInit,
        stylesInit,
        headInit,
        valueInit,
        groupInit,
        getGroupDataInit,
        listWidthRefreshInit,
        watchWindowResizeInit,
        l1,
        l2,
        lazyLoadInit,
        rightMenuClearInit,
        filterValue,
        resizeDown,
        resizeMove,
        widthFormat,
        itemChooseClick,
        chooseCurrent,
        chooseAll,
        isGroupChooseAll,
        chooseGroup,
        expandGroup,
        expandAll,
        rightClick,
        sortClick,
        inteliSort,
        sortNum,
        sortName,
        sortTime,
        drag,
        drop
    }
}
