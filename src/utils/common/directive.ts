import { Directive } from "vue";

export const vHover:Directive<HTMLElement, ((isHover:boolean, el:HTMLElement)=>void)> = {
    mounted(el: HTMLElement, {value}){
        const storeEl = el as (HTMLElement & {enterFunction: ()=>void, leaveFunction: ()=>void})
        storeEl.enterFunction = ()=>{
            value(true, el)
        }
        storeEl.leaveFunction = ()=>{
            value(false, el)
        }
        el.addEventListener("mouseover", storeEl.enterFunction)
        el.addEventListener("mouseleave", storeEl.leaveFunction)
    },
    beforeUnmount(el){
        const storeEl = el as (HTMLElement & {enterFunction: ()=>void, leaveFunction: ()=>void})
        el.removeEventListener("mouseover", storeEl.enterFunction)
        el.removeEventListener("mouseleave", storeEl.leaveFunction)
    }
}