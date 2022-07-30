<script lang="ts" setup>
import { ClassBuilder } from "@/utils/common";
import { useTheme } from "@/utils/common/theme"
import { checkboxProps, checkboxEmits, useCheckbox } from "."

const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)

defineOptions({
    name: "FvCheckbox"
})

const { theme } = useTheme(props);

const { computedChecked, onClick } = useCheckbox(props, emits)

const { cls: computedCheckboxClass } = new ClassBuilder()
    .add("fv-checkbox")
    .add(() => theme.value)
    .computed()

const { cls: computeIconClass } = new ClassBuilder()
    .add("ms-Icon")
    .add("ms-Icon--CheckMark", true, () => computedChecked.value === true)
    .add("ms-Icon--CheckboxIndeterminate", true, () => computedChecked.value === undefined)
    .computed()

</script>

<template>
    <div :class="computedCheckboxClass">
        <label class="label" @click="onClick">
            <input type="checkbox" class="checkbox" v-model="computedChecked" />
            <span class="icon">
                <i :class="computeIconClass"></i>
            </span>
            <slot>
                Checkbox
            </slot>
        </label>
    </div>
</template>