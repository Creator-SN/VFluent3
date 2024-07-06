<script setup lang="ts">
import { callFunction } from '@/utils/common';
import { listContainerEmits, listContainerProps, useListContainer } from './listContainer';


const props = defineProps(listContainerProps)
const emits = defineEmits(listContainerEmits)

const {styles,onClick} = useListContainer(props, emits)
</script>

<template>
    <div class="list-container" :style="styles.listContainer">
        <div
            v-for="(item, index) in options"
            :key="`item: ${index}`"
            @click="onClick(item)"
        >
            <div
                class="list-item"
                :class="{hr:callFunction(item.type) == 'divider', normal:callFunction(item.type) == 'default' || callFunction(item.type) == undefined, disabled: callFunction(item.disabled), choose: item.choosen}"
            >
                <p
                    v-show="callFunction(item.type) == 'header'"
                    class="title"
                    :style="styles.title"
                >{{callFunction(item.text)}}</p>
                <slot
                    name="options"
                    :option="item"
                    :index="index"
                    :valueTrigger="callFunction"
                >
                    <fv-check-box
                        v-model="item.choosen"
                        v-show="callFunction(item.type) == 'default' || callFunction(item.type) == undefined && multiple"
                        :disabled="callFunction(item.disabled)"
                        :foreground="dropDownListForeground"
                        :background="checkBoxBackground"
                        :theme="theme"
                    >{{callFunction(item.text)}}</fv-check-box>
                    <p v-show="callFunction(item.type) == 'default' || callFunction(item.type) == undefined && !multiple">{{callFunction(item.text)}}</p>
                </slot>
            </div>
        </div>
    </div>
</template>

