<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { dropDownEmits, dropDownProps, useDropDown } from '.';
import { onBeforeUnmount, onMounted } from 'vue';
import listContainer from './list/listContainer.vue';
import dropDownInput from "./input/input.vue"

defineOptions({
    name:"FvDropDown"
})

const props = defineProps(dropDownProps)
const emits = defineEmits(dropDownEmits)
const {theme} = useTheme(props)
const {styles,show,choosenValue,dropDownListShowStatus,init,destroy,root,input,onChange} = useDropDown(props,emits) 

onMounted(()=>{
    init()
})

onBeforeUnmount(()=>{
    destroy()
})

</script>

<template>
    <div
        ref="root"
        class="fv-DropDown"
        :class="[theme, disabled ? 'disabled' : '']"
        :style="styles.dropDown"
    >
        <div
            class="fv-drop-down-input-container"
            ref="input"
            @click="show.listContainer = !disabled ? !show.listContainer : false"
        >
            <slot
                name="drop-carrier"
                :value="choosenValue"
                :placeholoder="placeholder"
                :theme="theme"
            >
                <drop-down-input
                    v-model="choosenValue"
                    :placeholder="placeholder"
                    :theme="theme"
                    :disabled="disabled"
                    :borderWidth="borderWidth"
                    :borderRadius="borderRadius"
                    :inputForeground="inputForeground"
                    :inputBackground="inputBackground"
                    :inputBorderColor="inputBorderColor"
                    :dropDownIcon="dropDownIcon"
                    :dropDownIconForeground="dropDownIconForeground"
                    :class="{error: showError}"
                >
                    <template v-slot:input="x">
                        <slot
                            name="input"
                            :placeholder="x.placeholder"
                            :value="x.value"
                        ></slot>
                    </template>
                </drop-down-input>
            </slot>
        </div>
        <p
            v-show="showError"
            class="err-msg"
        >{{errorMessage}}</p>
        <transition :name="`fv-drop-down-${dropDownListShowStatus.position}`">
            <list-container
                v-show="show.listContainer"
                v-model="choosenValue"
                :options="options"
                :multiple="multiple"
                :borderRadius="borderRadius"
                :checkBoxBackground="checkBoxBackground"
                :dropDownListForeground="dropDownListForeground"
                :dropDownListBackground="dropDownListBackground"
                :showStatus="dropDownListShowStatus"
                :theme="theme"
                @chooseItem="onChange"
            >
                <template v-slot:options="item">
                    <slot
                        name="options"
                        :option="item.option"
                        :index="item.index"
                    ></slot>
                </template>
            </list-container>
        </transition>
    </div>
</template>
        

