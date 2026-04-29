const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const componentsDir = path.join(root, 'docs/guide/components');
const packagesDir = path.join(root, 'src/packages');
const commonPropsPath = path.join(root, 'src/packages/common/props/index.ts');

const typeMap = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Array: 'array',
    Object: 'object',
    Function: 'function',
    Date: 'Date',
    Symbol: 'symbol'
};

const componentNameMap = {
    'affix': 'Affix',
    'animated-icon': 'AnimatedIcon',
    'badge': 'Badge',
    'breadcrumb': 'Breadcrumb',
    'button': 'Button',
    'calendar-date-picker': 'CalendarDatePicker',
    'calendar-view': 'CalendarView',
    'callout': 'Callout',
    'check-box': 'CheckBox',
    'collapse': 'Collapse',
    'color-picker': 'ColorPicker',
    'combobox': 'Combobox',
    'command-bar': 'CommandBar',
    'date-picker': 'DatePicker',
    'details-list': 'DetailsList',
    'drawer': 'Drawer',
    'drop-down': 'DropDown',
    'expander': 'Expander',
    'flip-view': 'FlipView',
    'icon-element': 'IconElement',
    'image': 'Image',
    'img': 'Img',
    'img-box': 'ImgBox',
    'infinite-scroll-view': 'InfiniteScrollView',
    'info-box': 'InfoBox',
    'list-view': 'ListView',
    'menu-flyout': 'MenuFlyout',
    'message-bar': 'MessageBar',
    'navigation-panel': 'NavigationPanel',
    'navigation-view': 'NavigationView',
    'pagination': 'Pagination',
    'panel': 'Panel',
    'persona': 'Persona',
    'pivot': 'Pivot',
    'progress-bar': 'ProgressBar',
    'progress-ring': 'ProgressRing',
    'radio': 'Radio',
    'rating-control': 'RatingControl',
    'resize-watcher': 'ResizeWatcher',
    'reveal-container': 'RevealContainer',
    'right-menu': 'RightMenu',
    'scroll-story': 'ScrollStory',
    'search-box': 'SearchBox',
    'shimmer': 'Shimmer',
    'slider': 'Slider',
    'swipe-control': 'SwipeControl',
    'table-view': 'TableView',
    'table-view-cell-base': 'TableViewCellBase',
    'table-view-head-base': 'TableViewHeadBase',
    'tag': 'Tag',
    'text-box': 'TextBox',
    'text-field': 'TextField',
    'time-picker': 'TimePicker',
    'toggle-switch': 'ToggleSwitch',
    'tree-view': 'TreeView',
    'verify-box': 'VerifyBox',
    'web-window': 'WebWindow'
};

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
    fs.writeFileSync(file, content.replace(/\r?\n/g, '\n'), 'utf8');
}

function splitTopLevel(input, delimiter = ',') {
    const result = [];
    let start = 0;
    let depth = 0;
    let quote = '';
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        const prev = input[i - 1];
        if (quote) {
            if (ch === quote && prev !== '\\') quote = '';
            continue;
        }
        if (ch === '\'' || ch === '"' || ch === '`') {
            quote = ch;
            continue;
        }
        if (ch === '(' || ch === '[' || ch === '{') depth++;
        if (ch === ')' || ch === ']' || ch === '}') depth--;
        if (ch === delimiter && depth === 0) {
            result.push(input.slice(start, i).trim());
            start = i + 1;
        }
    }
    const tail = input.slice(start).trim();
    if (tail) result.push(tail);
    return result;
}

function extractBalanced(source, startIndex, open = '{', close = '}') {
    let depth = 0;
    let quote = '';
    let start = -1;
    for (let i = startIndex; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];
        if (quote) {
            if (ch === quote && prev !== '\\') quote = '';
            continue;
        }
        if (ch === '\'' || ch === '"' || ch === '`') {
            quote = ch;
            continue;
        }
        if (ch === open) {
            if (depth === 0) start = i;
            depth++;
        } else if (ch === close) {
            depth--;
            if (depth === 0) return source.slice(start + 1, i);
        }
    }
    return '';
}

function getDefinePropsBody(source) {
    const match = /defineProps\s*\(/.exec(source);
    if (!match) return '';
    const idx = match.index;
    const paren = source.indexOf('(', idx);
    const body = extractBalanced(source, paren, '(', ')').trim();
    if (!body.startsWith('{')) return '';
    return extractBalanced(body, 0, '{', '}');
}

function getPropsObjectBody(source) {
    const bodies = [];
    const definePropsBody = getDefinePropsBody(source);
    if (definePropsBody) bodies.push(definePropsBody);

    const propsIdx = source.search(/props\s*:/);
    if (propsIdx !== -1) {
        const brace = source.indexOf('{', propsIdx);
        const body = extractBalanced(source, brace, '{', '}');
        if (body) bodies.push(body);
    }
    return bodies.join(',\n');
}

function parsePropEntries(body) {
    const props = new Map();
    for (const entry of splitTopLevel(body)) {
        if (!entry || entry.startsWith('...')) continue;
        const match = entry.match(/^['"]?([A-Za-z_$][\w$:-]*)['"]?\s*:/);
        if (!match) continue;
        const name = match[1];
        const value = entry.slice(match[0].length).trim();
        props.set(name, parsePropDefinition(name, value));
    }
    return props;
}

function parsePropDefinition(name, value) {
    const prop = {
        name,
        type: 'any',
        required: 'No',
        default: 'undefined'
    };

    if (/^\[\s*['"`]/.test(value)) {
        prop.type = 'array';
        prop.default = formatDefault(value);
        return prop;
    }
    if (/^\[/.test(value)) {
        prop.type = parseTypeExpression(value);
        return prop;
    }
    if (/^[A-Z][A-Za-z]+$/.test(value)) {
        prop.type = parseTypeExpression(value);
        return prop;
    }
    if (!value.startsWith('{')) {
        prop.type = inferLiteralType(value);
        prop.default = formatDefault(value);
        return prop;
    }

    const obj = extractBalanced(value, 0, '{', '}');
    const typeMatch = obj.match(/(?:^|,)\s*type\s*:\s*([^,\n]+)/);
    const requiredMatch = obj.match(/(?:^|,)\s*required\s*:\s*(true|false)/);
    const defaultIndex = obj.search(/(?:^|,)\s*default\s*:/);
    if (typeMatch) prop.type = parseTypeExpression(typeMatch[1].trim());
    if (requiredMatch) prop.required = requiredMatch[1] === 'true' ? 'Yes' : 'No';
    if (defaultIndex !== -1) {
        const defaultSource = obj.slice(defaultIndex).replace(/^\s*,?\s*default\s*:\s*/, '');
        const defaultExpr = splitTopLevel(defaultSource)[0] || '';
        prop.default = formatDefault(defaultExpr);
        if (!typeMatch) prop.type = inferLiteralType(defaultExpr);
    } else if (prop.type === 'boolean') {
        prop.default = 'false';
    }
    return prop;
}

function parseTypeExpression(expr) {
    const cleaned = expr.replace(/as\s+PropType<[^>]+>/g, '').trim();
    if (cleaned.startsWith('[')) {
        const inner = extractBalanced(cleaned, 0, '[', ']');
        return splitTopLevel(inner).map(parseTypeExpression).join(' | ');
    }
    const name = cleaned.match(/[A-Z][A-Za-z]+/);
    return name ? (typeMap[name[0]] || name[0]) : 'any';
}

function inferLiteralType(expr) {
    const value = expr.trim();
    if (/^['"`]/.test(value)) return 'string';
    if (/^(true|false)$/.test(value)) return 'boolean';
    if (/^-?\d+(\.\d+)?$/.test(value)) return 'number';
    if (/^\(\s*\)\s*=>\s*\[/.test(value)) return 'array';
    if (/^\(\s*\)\s*=>\s*\{/.test(value) || /^\(\s*\)\s*=>\s*\(\s*\{/.test(value)) return 'object';
    if (/^\(\s*\)\s*=>/.test(value)) return 'function';
    if (/^new Date/.test(value)) return 'Date';
    if (value === 'null' || value === 'undefined') return 'any';
    return 'any';
}

function formatDefault(expr) {
    const value = expr.trim().replace(/,$/, '');
    const compact = value.replace(/\s+/g, ' ');
    if (!value) return 'undefined';
    if (/^\(\s*\)\s*=>\s*\[\s*\]$/.test(compact)) return '[]';
    if (/^\(\s*\)\s*=>\s*\[[\s\S]*\]$/.test(value)) return compact.replace(/^\(\s*\)\s*=>\s*/, '');
    if (/^\(\s*\)\s*=>\s*\(\s*\{\s*\}\s*\)$/.test(compact)) return '{}';
    if (/^\(\s*\)\s*=>\s*\{\s*return\s+\{\s*\}\s*;?\s*\}$/.test(compact)) return '{}';
    if (/^\(\s*\)\s*=>/.test(value)) return compact;
    if (/^['"`].*['"`]$/.test(value)) return value;
    return compact;
}

function collectComponentProps(component) {
    const props = new Map();

    const sourceDir = path.join(packagesDir, component, 'source');
    if (fs.existsSync(sourceDir)) {
        for (const file of ['index.vue', 'index.ts', 'index.js']) {
            const fullPath = path.join(sourceDir, file);
            if (!fs.existsSync(fullPath)) continue;
            const source = read(fullPath);
            const body = getPropsObjectBody(source);
            for (const [key, value] of parsePropEntries(body)) props.set(key, value);
        }
    }
    for (const [key, value] of collectCommonProps()) {
        if (!props.has(key)) props.set(key, value);
    }
    return props;
}

let commonPropsCache = null;
function collectCommonProps() {
    if (commonPropsCache) return commonPropsCache;
    const source = read(commonPropsPath);
    const idx = source.indexOf('commonProps');
    const brace = source.indexOf('{', idx);
    commonPropsCache = parsePropEntries(extractBalanced(source, brace, '{', '}'));
    return commonPropsCache;
}

function normalizePropName(name, props) {
    const cleaned = name.replace(/`/g, '').trim();
    if (props.has(cleaned)) return cleaned;
    if (props.has('modelValue') && /^(value|v-model|value\/v-model|model-value)$/i.test(cleaned)) {
        return 'modelValue';
    }
    const camel = cleaned.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
    if (props.has(camel)) return camel;
    return cleaned;
}

function splitRow(row) {
    return row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function encodeTable(rows) {
    rows = rows.map((row) => row.map((cell) => String(cell).replace(/\|/g, '\\|')));
    const widths = [];
    rows.forEach((row) => row.forEach((cell, idx) => {
        widths[idx] = Math.max(widths[idx] || 0, stripAnsi(cell).length);
    }));
    return rows.map((row, rowIndex) => {
        if (rowIndex === 1 && row.every((cell) => /^:?-+:?$/.test(cell))) {
            return `|${row.map((_, idx) => ':' + '-'.repeat(Math.max(widths[idx], 3)) + ':').join('|')}|`;
        }
        return `| ${row.map((cell, idx) => cell + ' '.repeat(Math.max(widths[idx] - stripAnsi(cell).length, 0))).join(' | ')} |`;
    }).join('\n');
}

function stripAnsi(value) {
    return value.replace(/[^\x00-\x7F]/g, 'xx');
}

function isPropertyHeader(cells) {
    return cells.some((cell) => /属性|attr|property/i.test(cell)) &&
        cells.some((cell) => /类型|type/i.test(cell));
}

function isEventHeader(cells) {
    return cells.some((cell) => /事件|emit|event/i.test(cell)) &&
        cells.some((cell) => /参数|args|argument/i.test(cell));
}

function updatePropertyRows(rows, component, props, lang) {
    const header = lang === 'zh'
        ? ['属性', '类型', '必填', '默认值', '说明']
        : ['Property', 'Type', 'Required', 'Default', 'Description'];
    const used = new Set();
    const body = rows.slice(2).map((row) => {
        const cells = splitRow(row);
        while (cells.length < 5) cells.push('');
        const propName = normalizePropName(cells[0], props);
        const source = props.get(propName);
        if (source) {
            cells[0] = propName;
            cells[1] = source.type;
            cells[2] = lang === 'zh'
                ? (source.required === 'Yes' ? '是' : '否')
                : source.required;
            cells[3] = source.default;
            used.add(propName);
        }
        cells[4] = lang === 'zh'
            ? polishChineseDescription(cells[4], cells[0], component)
            : translateDescription(cells[4], cells[0], component);
        return cells.slice(0, 5);
    });

    if (props.has('modelValue') && !used.has('modelValue')) {
        const source = props.get('modelValue');
        body.unshift([
            'modelValue',
            source.type,
            lang === 'zh' ? (source.required === 'Yes' ? '是' : '否') : source.required,
            source.default,
            lang === 'zh' ? '组件的双向绑定值。' : 'The component value used by v-model.'
        ]);
        used.add('modelValue');
    }

    for (const [name, source] of props) {
        if (used.has(name)) continue;
        body.push([
            name,
            source.type,
            lang === 'zh' ? (source.required === 'Yes' ? '是' : '否') : source.required,
            source.default,
            lang === 'zh'
                ? `参见组件的 \`${name}\` 选项。`
                : `See the ${componentNameMap[component] || component} \`${name}\` option.`
        ]);
        used.add(name);
    }

    return encodeTable([header, header.map(() => ':---:'), ...body]);
}

function updateEventRows(rows, lang) {
    const header = lang === 'zh'
        ? ['事件名', '参数', '说明']
        : ['Event', 'Arguments', 'Description'];
    const body = rows.slice(2).map((row) => {
        const cells = splitRow(row);
        while (cells.length < 3) cells.push('');
        cells[2] = lang === 'zh'
            ? polishChineseDescription(cells[2], cells[0], '')
            : translateDescription(cells[2], cells[0], '');
        return cells.slice(0, 3);
    });
    return encodeTable([header, header.map(() => ':---:'), ...body]);
}

function processTables(content, component, props, lang) {
    const lines = content.split(/\r?\n/);
    const out = [];
    let inFence = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('```')) {
            inFence = !inFence;
            out.push(lines[i]);
            continue;
        }
        if (inFence) {
            out.push(lines[i]);
            continue;
        }
        if (!lines[i].trim().startsWith('|')) {
            out.push(lines[i]);
            continue;
        }
        const start = i;
        const table = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
            table.push(lines[i]);
            i++;
        }
        i--;
        const header = splitRow(table[0]);
        if (isPropertyHeader(header)) {
            out.push(updatePropertyRows(table, component, props, lang));
        } else if (isEventHeader(header)) {
            out.push(updateEventRows(table, lang));
        } else {
            out.push(...table);
        }
    }
    return out.join('\n');
}

function translateDescription(text, prop, component) {
    let value = text.trim();
    const componentName = componentNameMap[component] || component || 'component';
    if (!value || value === 'N/A') return value;
    if (!/[\u4e00-\u9fff]/.test(value)) return value;

    value = value.replace(/。+$/g, '').replace(/\.+$/g, '.');

    const exact = new Map([
        ['是否显示', 'Whether the component is visible.'],
        ['是否禁用', 'Whether the component is disabled.'],
        ['是否只读', 'Whether the component is read-only.'],
        ['主题色', 'Theme color.'],
        ['标题', 'Title.'],
        ['副标题信息', 'Subtitle content.'],
        ['背景色', 'Background color.'],
        ['前景色', 'Foreground color.'],
        ['字体大小', 'Font size.'],
        ['圆角大小', 'Border radius.'],
        ['边框颜色', 'Border color.'],
        ['边框大小', 'Border width.'],
        ['根图标', 'Root icon.'],
        ['显示根图标', 'Whether to show the root icon.'],
        ['字符串路径', 'String path.'],
        ['验证码长度', 'Verification code length.'],
        ['等同HTML[input]', 'Same as the native HTML input attribute.'],
        ['左图标', 'Left icon.'],
        ['右图标', 'Right icon.'],
        ['前缀', 'Prefix.'],
        ['后缀', 'Suffix.'],
        ['扩展', 'Extensions.'],
        ['位置', 'Position.'],
        ['间距(px)', 'Spacing in pixels.'],
        ['悬浮窗的样式', 'Floating panel style.'],
        ['悬浮窗的 css', 'Floating panel CSS classes.'],
        ['显示触发方式', 'Display trigger mode.'],
        ['角标大小(px)', 'Beak size in pixels.'],
        ['是否锁定滚动', 'Whether page scrolling is locked.'],
        ['是否聚焦', 'Whether focus trapping is enabled.'],
        ['数据，详见data', 'Data. See the data section for details.']
    ]);
    if (exact.has(value)) return exact.get(value);

    value = value
        .replace(/主题样式, 包含`light`, `dark`, `system`, `custom`几种样式/g, 'Theme style. Supports `global`, `light`, `dark`, `system`, and `custom`.')
        .replace(/`([^`]+)`属性值, 参照`HTML`属性/g, 'Value of the `$1` HTML attribute.')
        .replace(/`([^`]+)`的目标元素, 为一个函数/g, 'Target element for `$1`; pass it as a function.')
        .replace(/`([^`]+)`的模式, `fixed`, `relative`或`auto`/g, '`$1` mode: `fixed`, `relative`, or `auto`.')
        .replace(/`([^`]+)`容器的`z-index`值/g, '`z-index` value of the `$1` container.')
        .replace(/`([^`]+)`的在父元素滚动吸附位置, 可以为`left`, `top`, `right` 和 `bottom`/g, 'Sticky positions inside the parent: `left`, `top`, `right`, and `bottom`.')
        .replace(/Button 前景色/g, 'Button foreground color.')
        .replace(/Button 背景色/g, 'Button background color.')
        .replace(/Button 圆角大小/g, 'Button border radius.')
        .replace(/Button 边框颜色/g, 'Button border color.')
        .replace(/Button 字体大小/g, 'Button font size.')
        .replace(/Button 字体粗细度/g, 'Button font weight.')
        .replace(/Button Reveal 边框颜色/g, 'Reveal border color for the button.')
        .replace(/Button Reveal 背景颜色/g, 'Reveal background color for the button.')
        .replace(/开启`Button`阴影/g, 'Enable the button shadow.')
        .replace(/Button 边框大小/g, 'Button border width.')
        .replace(/动画预设名称/g, 'Animation preset name.')
        .replace(/自定义动画/g, 'Custom animation.')
        .replace(/隐藏文本内容/g, 'Hide the text content.')
        .replace(/分隔符显示, 可以是字符或图标/g, 'Separator display, either text or an icon.')
        .replace(/以什么字符分割路径/g, 'Character used to split the path.')
        .replace(/多选模式, 有单选、多选和范围日期选择/g, 'Selection mode: single date, multiple dates, or date range.')
        .replace(/初始选中日期/g, 'Initial selected date.')
        .replace(/今日颜色/g, 'Color for today.')
        .replace(/返回\[Date\]类型的数组/g, 'Returns an array of `Date` values.')
        .replace(/返回\[\{year, month, no\}\]类型的数组/g, 'Returns an array in the shape `{ year, month, no }`.')
        .replace(/当固定状态发生改变时触发, 返回是否固定/g, 'Emitted when the fixed state changes; returns whether it is fixed.')
        .replace(/输入模式, 可选值为/g, 'Input mode. Options:')
        .replace(/是否开启Underline风格的/g, 'Whether to use the underline style for ')
        .replace(/开启`([^`]+)`阴影/g, 'Enable `$1` shadow.')
        .replace(/启用revealBorder时将失效/g, 'ignored when `revealBorder` is enabled')
        .replace(/状态边框预设, 默认有警告和正确两种/g, 'Preset status border. Built-in values are warning and correct.')
        .replace(/搜索节流延迟时间/g, 'Debounced input delay.')
        .replace(/搜索节流内容反馈/g, 'Emitted with debounced input content.')
        .replace(/完成输入并返回结果/g, 'Emitted when input is complete and returns the result.')
        .replace(/标签数组/g, 'Tag list.')
        .replace(/是否启用NewTag/g, 'Whether to enable NewTag.')
        .replace(/是否启用删除按钮/g, 'Whether to enable the delete button.')
        .replace(/标签点击时触发并返回点击项/g, 'Emitted when a tag is clicked; returns the clicked item.')
        .replace(/添加标签时触发并返回添加项/g, 'Emitted when a tag is added; returns the added item.')
        .replace(/删除标签时触发并返回删除项/g, 'Emitted when a tag is deleted; returns the deleted item.')
        .replace(/是否可拖动/g, 'Whether items are draggable.')
        .replace(/是否可选/g, 'Whether items are checkable.')
        .replace(/子项高度/g, 'Item height.')
        .replace(/加载时是否显示进度条/g, 'Whether to show a progress indicator while loading.')
        .replace(/扩展箭头位置/g, 'Expand arrow position.')
        .replace(/点击展开的方式/g, 'Expand trigger mode.')
        .replace(/当前项被放置进入/g, 'Emitted when the dragged item enters the current item.')
        .replace(/当前项被放置离开/g, 'Emitted when the dragged item leaves the current item.')
        .replace(/当前项被放置/g, 'Emitted when an item is dropped on the current item.')
        .replace(/当点击时触发，第一个参数为点击的item/g, 'Emitted when an item is clicked. The first argument is the clicked item.');

    value = value
        .replace(/\.。+/g, '.')
        .replace(/。/g, '.')
        .replace(/、/g, ', ');

    if (/[\u4e00-\u9fff]/.test(value)) {
        return `See the ${componentName} \`${prop}\` option.`;
    }
    return value;
}

function polishChineseDescription(text, prop, component) {
    let value = text.trim();
    if (!value || value === 'N/A') return value;
    value = value
        .replace(/主题样式, 包含`light`, `dark`, `system`, `custom`几种样式/g, '主题样式。支持 `global`、`light`、`dark`、`system` 和 `custom`。')
        .replace(/(\w+) 前景色/g, '$1 前景色。')
        .replace(/(\w+) 背景色/g, '$1 背景色。')
        .replace(/(\w+) 圆角大小/g, '$1 圆角大小。')
        .replace(/(\w+) 边框颜色/g, '$1 边框颜色。')
        .replace(/(\w+) 字体大小/g, '$1 字体大小。')
        .replace(/(\w+) 字体粗细度/g, '$1 字体粗细。')
        .replace(/(\w+) 边框大小/g, '$1 边框宽度。')
        .replace(/等同HTML\[input\]/g, '等同于原生 HTML input 属性。')
        .replace(/, /g, '，')
        .replace(/， /g, '，');
    value = value.replace(/。。+/g, '。').replace(/\.。/g, '。');
    if (/[\u4e00-\u9fff]$/.test(value) && !/[。！）]$/.test(value)) value += '。';
    return value;
}

function translateHeadings(content, component, lang, mdName) {
    const name = componentNameMap[component] || component;
    let value = content;
    value = value.replace(/title:\s*.*/g, `title: ${name}`);
    if (lang === 'en') {
        value = value
            .replace(/###\s*Propoties/g, '### Properties')
            .replace(/###\s*属性/g, '### Properties')
            .replace(/##\s*属性/g, '## Properties')
            .replace(/###\s*事件/g, '### Events')
            .replace(/##\s*事件/g, '## Events')
            .replace(/###\s*插槽/g, '### Slots')
            .replace(/###\s*Slot/g, '### Slots')
            .replace(/##\s*插槽/g, '## Slots')
            .replace(/###\s*Button-DEMO/g, '### Basic Button')
            .replace(/###\s*Button With Icon/g, '### Button With Icon')
            .replace(/###\s*Button Customize/g, '### Custom Button')
            .replace(/###\s*Button Disabled/g, '### Disabled Button')
            .replace(/Customize Reveal Border/g, 'Custom Reveal Border')
            .replace(/###\s*基础按钮/g, '### Basic Button')
            .replace(/###\s*带图标的按钮/g, '### Button With Icon')
            .replace(/###\s*自定义按钮/g, '### Custom Button')
            .replace(/###\s*禁用按钮/g, '### Disabled Button')
            .replace(/自定义 Reveal 边框/g, 'Custom Reveal Border');
    } else {
        value = value
            .replace(/##\s*Quick Start/g, '## 快速开始')
            .replace(/###\s*Propoties/g, '### 属性')
            .replace(/###\s*Properties/g, '### 属性')
            .replace(/##\s*Properties/g, '## 属性')
            .replace(/###\s*Events/g, '### 事件')
            .replace(/##\s*Emits/g, '## 事件')
            .replace(/##\s*Events/g, '## 事件')
            .replace(/###\s*Slot/g, '### 插槽')
            .replace(/###\s*Slots/g, '### 插槽')
            .replace(/###\s*Button-DEMO/g, '### 基础按钮')
            .replace(/###\s*Button With Icon/g, '### 带图标的按钮')
            .replace(/###\s*Button Customize/g, '### 自定义按钮')
            .replace(/###\s*Button Disabled/g, '### 禁用按钮')
            .replace(/Customize Reveal Border/g, '自定义 Reveal 边框');
    }
    return value;
}

function addLanguageSwitch(content, lang, mdName) {
    content = content.replace(/<!-- lang-switch -->\n(?:\[English\]\([^)]+\) \| \[简体中文\]\([^)]+\)\n+)?/g, '');
    const enTarget = mdName === 'index.md' ? './' : `./${mdName}`;
    const zhTarget = `./${mdName.replace(/\.md$/, '.zh-CN.md')}`;
    const switcher = lang === 'en'
        ? `<!-- lang-switch -->\n[English](${enTarget}) | [简体中文](${zhTarget})\n`
        : `<!-- lang-switch -->\n[English](${enTarget}) | [简体中文](./${path.basename(mdName).replace(/\.md$/, '.zh-CN.md')})\n`;
    const frontmatter = content.match(/^---[\s\S]*?---\s*/);
    if (frontmatter) {
        return frontmatter[0] + '\n' + switcher + content.slice(frontmatter[0].length);
    }
    return switcher + '\n' + content;
}

function translateProse(content, lang) {
    const lines = content.split(/\r?\n/);
    let inFence = false;
    return lines.map((line) => {
        if (line.trim().startsWith('```')) {
            inFence = !inFence;
            return line;
        }
        if (inFence) return line;
        if (lang === 'en') {
            let translated = line
                .replace(/默认模板是图标自定义模板/g, 'The default slot customizes the icon content.')
                .replace(/客制化修改文字内容/g, 'Customize the text content.')
                .replace(/若需要进行性能优化, 可以考虑在元素被隐藏时, 将`mode`设置为`relative`./g, 'For better performance, consider setting `mode` to `relative` while the element is hidden.')
                .replace(/\*\*特别注意\*\*/g, '**Note**');
            if (/^#+\s+.*[\u4e00-\u9fff]/.test(translated)) {
                translated = translated.replace(/^(#+)\s+.*/, '$1 Example');
            } else if (/[\u4e00-\u9fff]/.test(translated) && !translated.trim().startsWith('|')) {
                translated = '';
            }
            return translated;
        }
        return line
            .replace(/The default slot customizes the icon content\./g, '默认插槽用于自定义图标内容。')
            .replace(/Customize the text content\./g, '自定义文本内容。')
            .replace(/For better performance, consider setting `mode` to `relative` while the element is hidden\./g, '如需优化性能，可在元素隐藏时将 `mode` 设置为 `relative`。')
            .replace(/\*\*Note\*\*/g, '**注意**');
    }).join('\n');
}

function processMarkdown(source, component, props, lang, mdName) {
    let content = source;
    content = translateHeadings(content, component, lang, mdName);
    content = translateProse(content, lang);
    content = processTables(content, component, props, lang);
    if (mdName === 'index.md') content = addLanguageSwitch(content, lang, mdName);
    return content.trimEnd() + '\n';
}

function componentDirs() {
    return fs.readdirSync(componentsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== 'common')
        .map((entry) => entry.name)
        .sort();
}

for (const component of componentDirs()) {
    const props = collectComponentProps(component);
    const componentDir = path.join(componentsDir, component);
    for (const mdName of ['index.md', 'properties.md', 'emits.md']) {
        const mdPath = path.join(componentDir, mdName);
        if (!fs.existsSync(mdPath)) continue;
        const zhPath = path.join(componentDir, mdName.replace(/\.md$/, '.zh-CN.md'));
        const original = read(mdPath);
        write(zhPath, processMarkdown(original, component, props, 'zh', mdName));
        write(mdPath, processMarkdown(original, component, props, 'en', mdName));
    }
}

console.log('Component docs split into English and Chinese files, and property tables were synchronized.');
