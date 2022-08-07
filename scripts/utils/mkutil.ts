export class MarkdownTable {
    static getTables(mdtext: string) {
        const result =
            /\|.*\|.*\r?\n\|[\|:\- ]*\|.*\r?\n(\|.*\|\r?\n?)*/gm.exec(mdtext);
        if (result === undefined || result === null) return [];
        return result.map((e) => e);
    }

    static decode(text: string) {
        const tables: string[][] = [];
        const lines = text.split('\n');
        for (let l = 0; l < lines.length; ++l) {
            const cells = lines[l].split('|');
            if (cells.length <= 2) {
                continue;
            }
            // remove head and tail
            cells.pop();
            cells.shift();
            // merge cells
            let cur = -1;
            for (let i = 0; i < cells.length; ++i) {
                if (
                    cur >= 0 &&
                    cells[cur].length > 0 &&
                    cells[cur][cells[cur].length - 1] === '\\'
                ) {
                    cells[cur] = cells[cur].concat(cells[i]);
                } else {
                    cur += 1;
                    if (cur !== i) cells[cur] = cells[i];
                }
            }
            cells.length = cur + 1;
            tables.push(cells.map((cell) => cell.trim()));
        }
        // get headers
        const properties: string[] = [];
        for (const name of tables[0]) {
            properties.push(name);
        }
        const objs: Record<string, string>[] = [];
        for (let l = 2; l < tables.length; ++l) {
            const obj: Record<string, string> = {};
            for (let i = 0; i < properties.length; ++i) {
                obj[properties[i]] = tables[l][i];
            }
            objs.push(obj);
        }
        return objs;
    }

    static encode(objs: Record<string, string>[]) {
        const propertiesMaps: Record<string, number> = {};
        let propertiesLength: number = 0;
        for (const obj of objs) {
            for (const name in obj) {
                if (propertiesMaps[name] === undefined) {
                    propertiesMaps[name] = propertiesLength;
                    propertiesLength++;
                }
            }
        }
        // build head
        const tables: string[] = [];
        let line: string[] = new Array(propertiesLength);
        for (let name in propertiesMaps) {
            line[propertiesMaps[name]] = name;
        }
        tables.push(`| ${line.join(' | ')} |`);
        tables.push(`${`|:---:`.repeat(propertiesLength)}|`);
        for (let obj of objs) {
            line = new Array(propertiesLength);
            line.fill('');
            for (const name in obj) {
                line[propertiesMaps[name]] = obj[name];
            }
            tables.push(`| ${line.join(' | ')} |`);
        }
        return `${tables.join('\n')}\n`;
    }
}
