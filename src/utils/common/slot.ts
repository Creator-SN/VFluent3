import { Slots,defineComponent,h,ref  } from "vue";

export function createRefSlot(slots: Slots){
    return defineComponent({
        setup(props, context){
            const slotRef = ref(null);
            if (slots.default && slots.default().length > 0) {
                const [defaultSlot] = slots.default()
                context.expose({
                    slotRef,
                  });
                  return () => h(defaultSlot, { ref: slotRef });
            }else{
                return ()=>h("div", {ref:slotRef})
            }
        }
    })
}