export function formatFontSize(value) {
    if (value == null || value === '') return '';
    if (typeof value === 'number' || /^\s*[+-]?(?:\d+\.?\d*|\.\d+)\s*$/.test(value)) {
        return `${Number(value)}px`;
    }
    return value;
}

export const formatBorderRadiusSize = formatFontSize;
