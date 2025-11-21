<template>
    <fv-table-view-cell-base
        v-bind="props"
        @drop-item="$emit('drop-item', $event)"
        @set-select="$emit('set-select', $event)"
    >
        <template v-slot:default>
            <p
                v-show="head.showAs === 'number'"
                class="fv-tableview-default-content"
                style="width: 100%; text-align: right"
            >
                {{ computedContent }}
            </p>
            <div
                v-show="head.showAs === 'bar'"
                style="
                    width: 100%;
                    padding-right: 5px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                "
            >
                <p class="fv-tableview-default-content">
                    {{ computedContent }}
                </p>
                <fv-progress-bar
                    :model-value="computedPercent"
                    :foreground="head.showColor"
                    style="width: 10px; flex: 1; margin-left: 5px"
                ></fv-progress-bar>
            </div>
            <div
                v-show="head.showAs === 'ring'"
                style="
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                "
            >
                <p class="fv-tableview-default-content">
                    {{ computedContent }}
                </p>
                <fv-progress-ring
                    :model-value="computedPercent"
                    :color="head.showColor"
                    r="12"
                    borderWidth="3"
                ></fv-progress-ring>
            </div>
        </template>
    </fv-table-view-cell-base>
</template>

<script setup>
import { FvTableViewCellProps } from '@/packages/table-view-cell-base';

const props = defineProps(FvTableViewCellProps);
</script>

<script>
export default {
    name: 'numberCell',
    data() {
        return {
            numberFormatList: [
                {
                    key: 'Number',
                    text: 'Number',
                    func: (value) => parseFloat(value).toFixed(2)
                },
                {
                    key: 'Number with commas',
                    text: 'Number with commas',
                    func: (value) => {
                        let v = parseFloat(value).toFixed(2);
                        return v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }
                },
                {
                    key: 'Percent',
                    text: 'Percent',
                    func: (value) => (parseFloat(value) * 100).toFixed(2) + '%'
                },
                {
                    key: 'US Dollar',
                    text: 'US Dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Australian dollar',
                    text: 'Australian dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'AU$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Canadian dollar',
                    text: 'Canadian dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'CA$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Singapore dollar',
                    text: 'Singapore dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'SG$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Euro',
                    text: 'Euro',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '€' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Pound',
                    text: 'Pound',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '£' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Yen',
                    text: 'Yen',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '¥' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Ruble',
                    text: 'Ruble',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₽' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Rupee',
                    text: 'Rupee',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₹' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Won',
                    text: 'Won',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₩' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Yuan',
                    text: 'Yuan',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '¥' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Real',
                    text: 'Real',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'R$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Lira',
                    text: 'Lira',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₺' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Rupiah',
                    text: 'Rupiah',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'Rp' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Franc',
                    text: 'Franc',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'Fr' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Hong Kong dollar',
                    text: 'Hong Kong dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'HK$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'New Zealand dollar',
                    text: 'New Zealand dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'NZ$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Krona',
                    text: 'Krona',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'kr' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Norwegian krone',
                    text: 'Norwegian krone',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'kr' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Mexican peso',
                    text: 'Mexican peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'Mex$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Rand',
                    text: 'Rand',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'R' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'New Taiwan dollar',
                    text: 'New Taiwan dollar',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'NT$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Danish krone',
                    text: 'Danish krone',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'kr' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Złoty',
                    text: 'Złoty',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'zł' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Baht',
                    text: 'Baht',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '฿' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Forint',
                    text: 'Forint',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'Ft' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Koruna',
                    text: 'Koruna',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'Kč' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Shekel',
                    text: 'Shekel',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₪' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Chilean peso',
                    text: 'Chilean peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'CLP$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Philippine peso',
                    text: 'Philippine peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '₱' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Dirham',
                    text: 'Dirham',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'AED$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Colombian peso',
                    text: 'Colombian peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'COL$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Riyal',
                    text: 'Riyal',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + '﷼' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Ringgit',
                    text: 'Ringgit',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'RM' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Leu',
                    text: 'Leu',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'L' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Argentine peso',
                    text: 'Argentine peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'AR$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Uruguayan peso',
                    text: 'Uruguayan peso',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'UYU$' + Math.abs(v).toFixed(2);
                    }
                },
                {
                    key: 'Peruvian sol',
                    text: 'Peruvian sol',
                    func: (value) => {
                        let v = parseFloat(value);
                        let s = '';
                        if (v < 0) s = '-';
                        return s + 'S/' + Math.abs(v).toFixed(2);
                    }
                }
            ]
        };
    },
    computed: {
        computedPercent() {
            let val = parseFloat(this.modelValue[this.head.key]);
            if (val.toString() !== 'NaN') {
                if (!this.head.divideBy) return 0;
                let percent = (val / this.head.divideBy) * 100;
                if (percent > 100) percent = 100;
                return percent;
            }
        },
        computedFormatItem() {
            return this.numberFormatList.find(
                (item) => item.key === this.head.numberFormat
            );
        },
        computedContent() {
            if (this.computedFormatItem)
                return this.computedFormatItem.func(this.modelValue[this.head.key]);
            return this.modelValue[this.head.key];
        }
    }
};
</script>
