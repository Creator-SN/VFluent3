<template>
    <div class="text-box-container internal">
        <input
            :inputmode="inputmode"
            :type="type"
            class="fv-text-box-input"
            :readonly="isReadOnly"
            :disabled="isDisabled"
            ref="input"
            :style="{'font-size': `${fontSize}px`, 'font-weight': fontWeight, color: foreground, 'text-align': textAlign}"
            @input="input"
            @keydown="keyDown"
            @keyup="$emit('keyup', $event)"
            @change="$emit('change', $event)"
            @paste="$emit('paste', $event)"
            @focus="$emit('focus', true)"
            @blur="$emit('blur', false)"
        />
    </div>
</template>

<script>
import { useTheme } from '@/utils/common';

export default {
    emits: [
        'update:modelValue',
        'keydown',
        'keyup',
        'change',
        'paste',
        'focus',
        'blur'
    ],
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        inputmode: {
            default: 'text'
        },
        type: {
            default: 'text'
        },
        mask: {
            type: String,
            default: 'mask:___'
        },
        flag: {
            type: String,
            default: '_'
        },
        pattern: {
            type: String,
            default: '[Ss]*'
        },
        readonly: {
            default: false
        },
        disabled: {
            default: false
        },
        fontSize: {
            default: 13.3
        },
        fontWeight: {
            default: 'normal'
        },
        foreground: {
            default: ''
        },
        textAlign: {
            default: 'left'
        },
        theme: {
            type: String,
            default: "global"
        }
    },
    data() {
        return {
            thisValue: [],
            currentPos: 0,
            thisPattern: new RegExp(this.pattern)
        };
    },
    watch: {
        modelValue(val) {
            this.syncValue(val);
        },
        mask(val) {
            this.thisValueInit();
        },
        flag(val) {
            this.thisValueInit();
        },
        pattern(val) {
            this.thisPattern = new RegExp(val);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        maxLength() {
            let len = 0;
            for (let i = 0; i < this.mask.length; i++) {
                if (this.mask[i] == this.flag) len++;
            }
            return len;
        },
        renderText() {
            let a = this.mask;
            let count = 0;
            let result = '';
            for (let i = 0; i < this.mask.length; i++) {
                if (this.mask[i] == this.flag) {
                    if (count >= this.thisValue.length) break;
                    if (this.thisValue[count].content !== '')
                        result += this.thisValue[count].content;
                    else result += this.mask[i];
                    count++;
                } else result += this.mask[i];
            }
            return result;
        },
        isReadOnly() {
            return (
                this.readonly.toString() == 'true' ||
                this.readonly == 'readonly' ||
                this.readonly === ''
            );
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        }
    },
    mounted() {
        this.thisValueInit();
        this.syncValue(this.modelValue);
        this.thisPattern = new RegExp(this.pattern);
        this.$refs.input.addEventListener('paste', (event) => {
            let data = event.clipboardData.getData('text/plain');
            let count = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].match(this.thisPattern)) {
                    if (count < this.thisValue.length) {
                        this.thisValue[count].content = data[i];
                        count++;
                        this.currentPos = this.thisValue[count].index + 1;
                    }
                }
            }
        });
    },
    methods: {
        thisValueInit() {
            this.thisValue = [];
            for (let i = 0; i < this.mask.length; i++) {
                if (this.mask[i] == this.flag)
                    this.thisValue.push({
                        index: i,
                        content: ''
                    });
            }
            if (this.flag.length != 1)
                console.warn("TextBox's flag should only contain 1 char.");
            this.$refs.input.value = this.renderText;
        },
        syncValue(val) {
            for (let i = 0; i < this.thisValue.length; i++) {
                if (i < val.length)
                    this.thisValue[i] = {
                        index: this.thisValue[i].index,
                        content: val[i]
                    };
                else
                    this.thisValue[i] = {
                        index: this.thisValue[i].index,
                        content: ''
                    };
            }
            this.$refs.input.value = this.renderText;
        },
        keyDown(event) {
            this.$emit('keydown', event);
            let k = event.keyCode;

            let index = -1;
            let selectionPosition = this.$refs.input.selectionStart;
            let selectionEnd = this.$refs.input.selectionEnd;
            let status = this.clearRange(selectionPosition, selectionEnd);
            for (let i = selectionPosition - 1; i >= 0; i--) {
                if (this.mask[i] == this.flag) index++;
            }

            if (this.isInputCode(k) && !event.crtlKey) {
                if (!this.thisPattern.test(event.key)) return 0;
                if (index < this.thisValue.length - 1) {
                    this.thisValue[index + 1] = {
                        index: this.thisValue[index + 1].index,
                        content: event.key
                    };
                    this.currentPos = this.thisValue[index + 1].index + 1;
                }
            } else if (k == 8) {
                if (status) return 0;
                if (index > -1) {
                    this.thisValue[index] = {
                        index: this.thisValue[index].index,
                        content: ''
                    };
                    this.currentPos = this.thisValue[index].index;
                }
            }
        },
        isInputCode(keyCode) {
            let range = [
                [48, 57],
                [65, 90],
                [96, 107],
                [109, 111],
                [186, 222]
            ];
            for (let item of range) {
                if (keyCode >= item[0] && keyCode <= item[1]) return true;
            }
            return false;
        },
        clearRange(start, end) {
            if (end - start == 0) return 0;
            let index = 0;
            for (let i = this.thisValue.length - 1; i >= 0; i--) {
                if (
                    this.thisValue[i].index + 1 > start &&
                    this.thisValue[i].index + 1 <= end
                ) {
                    this.thisValue[i] = {
                        index: this.thisValue[i].index,
                        content: ''
                    };
                    index = i;
                }
            }
            this.currentPos = this.thisValue[index].index;
            return true;
        },
        input(event) {
            event.target.value = this.renderText;
            this.$refs.input.setSelectionRange(
                this.currentPos,
                this.currentPos
            );
            let result = [];
            for (let i = 0; i < this.thisValue.length; i++) {
                result.push(this.thisValue[i].content);
            }
            this.$emit('update:modelValue', result);
        },
        focusInspect() {
            this.$refs.input.focus();
        }
    }
};
</script>