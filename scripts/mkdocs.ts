import { isArray } from '@vue/shared';
import camelcase from 'camelcase';
import path from 'path';
import { ComponentsUtils } from './utils/components';
import fs from 'fs';
import { MarkdownTable } from './utils/mkutil';
import decamelize from 'decamelize';
import ora from 'ora';
import pc from 'picocolors';

function getParameterName(fn: Function) {
    if (typeof fn !== 'object' && typeof fn !== 'function') return;
    const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    const DEFAULT_PARAMS = /=[^,)]+/gm;
    const FAT_ARROWS = /=>.*$/gm;
    let code = fn.prototype
        ? fn.prototype.constructor.toString()
        : fn.toString();
    code = code
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '');
    let result = code
        .slice(code.indexOf('(') + 1, code.indexOf(')'))
        .match(/([^\s,]+)/g);
    return result === null ? [] : result;
}

function getTypes(types: Function[] | Function): string[] {
    const result: string[] = [];
    if (!isArray(types)) {
        types = [types];
    }
    for (const type of types) {
        switch (type) {
            case Function:
                result.push('function');
                break;
            case String:
                result.push('string');
                break;
            case Number:
                result.push('number');
                break;
            case Boolean:
                result.push('boolean');
                break;
            case Array:
                result.push('array');
                break;
            case Object:
                result.push('object');
                break;
            case Date:
                result.push('date');
                break;
            case Symbol:
                result.push('symbol');
                break;
        }
    }
    return result;
}

export type PropsAttributes = {
    Property: string;
    Type: string;
    Required: string;
    Default: string;
    Statement: string;
};

export type EmitsAttributes = {
    EmitName: string;
    Arguments: string;
    Statement: string;
};

export type Tables = Record<
    string,
    {
        props: PropsAttributes[];
        emits: EmitsAttributes[];
    }
>;

export class MarkdownTableBuilder {
    private _path = {
        package: './src/packages/',
        docs: './docs/guide/components/',
        style: './src/styles',
    };

    constructor() {}

    async scanTablesAsync() {
        const components = ComponentsUtils.getAllComponents(this._path.package);
        const result: Tables = {};
        for (const name of components) {
            let propsObjs: PropsAttributes[] = [];
            let emitsObjs: EmitsAttributes[] = [];
            if (
                fs.existsSync(path.join(this._path.docs, name, 'properties.md'))
            ) {
                let content = fs.readFileSync(
                    path.join(this._path.docs, name, 'properties.md'),
                    {
                        encoding: 'utf-8',
                    }
                );
                let tables = MarkdownTable.getTables(content);
                if (tables.length > 0) {
                    propsObjs = MarkdownTable.decode(
                        tables[0]
                    ) as PropsAttributes[];
                }
            }
            if (fs.existsSync(path.join(this._path.docs, name, 'emits.md'))) {
                let content = fs.readFileSync(
                    path.join(this._path.docs, name, 'emits.md'),
                    {
                        encoding: 'utf-8',
                    }
                );
                let tables = MarkdownTable.getTables(content);
                if (tables.length > 0) {
                    emitsObjs = MarkdownTable.decode(
                        tables[0]
                    ) as EmitsAttributes[];
                }
            }
            result[name] = {
                props: propsObjs,
                emits: emitsObjs,
            };
        }
        return result;
    }

    async mergeTableAsync(oldVal: Tables, newVal: Tables) {
        const table: Tables = {};
        for (const name in newVal) {
            if (oldVal[name] === undefined) {
                table[name] = newVal[name];
            } else {
                const objs: Tables[keyof Tables] = {
                    props: [],
                    emits: [],
                };
                for (const prop of newVal[name].props) {
                    let oldProp = oldVal[name].props.find(
                        (e) => e.Property == prop.Property
                    );
                    let obj: PropsAttributes = {
                        Property: '',
                        Type: '',
                        Required: '',
                        Default: '',
                        Statement: '',
                    };
                    if (oldProp !== undefined) {
                        for (const key in obj) {
                            const propKey = key as keyof PropsAttributes;
                            if (oldProp[propKey] !== '') {
                                obj[propKey] = oldProp[propKey];
                            } else {
                                obj[propKey] = prop[propKey];
                            }
                        }
                    } else {
                        obj = prop;
                    }
                    objs.props.push(obj);
                }
                for (const emit of newVal[name].emits) {
                    let oldEmit = oldVal[name].emits.find(
                        (e) => e.EmitName == emit.EmitName
                    );
                    let obj: EmitsAttributes = {
                        EmitName: '',
                        Arguments: '',
                        Statement: '',
                    };
                    if (oldEmit !== undefined) {
                        for (const key in obj) {
                            const emitKey = key as keyof EmitsAttributes;
                            if (oldEmit[emitKey] !== '') {
                                obj[emitKey] = oldEmit[emitKey];
                            } else {
                                obj[emitKey] = emit[emitKey];
                            }
                        }
                    } else {
                        obj = emit;
                    }
                    objs.emits.push(obj);
                }
                objs.emits = objs.emits.sort((a, b) =>
                    a.EmitName.localeCompare(b.EmitName)
                );
                objs.props = objs.props.sort((a, b) =>
                    a.Property.localeCompare(b.Property)
                );
                table[name] = objs;
            }
        }
        return table;
    }

    async getTablesAsync() {
        const components = ComponentsUtils.getAllComponents(this._path.package);
        const tables: Tables = {};
        for (const name of components) {
            const pkg = await import(
                path
                    .join('..', this._path.package, name, 'source', 'index.js')
                    .replaceAll(path.sep, '/')
            );
            const propsObjs = [];
            for (const propName in pkg[`${camelcase(name)}Props`]) {
                let obj: PropsAttributes = {
                    Property: '',
                    Type: '',
                    Required: '',
                    Default: '',
                    Statement: '',
                };
                const types = getTypes(
                    pkg[`${camelcase(name)}Props`][propName].type
                );
                // https://vuejs.org/guide/components/props.html#prop-validation
                const defaultsMap: Record<string, any> = {
                    boolean: false,
                };
                let def = pkg[`${camelcase(name)}Props`][propName].default;
                if (def === undefined && types.length > 0) {
                    def = defaultsMap[types[0]];
                }
                if (typeof def === 'string') {
                    def = `'${def}'`;
                } else {
                    def = String(def);
                }
                obj.Property = decamelize(propName, {
                    separator: '-',
                });
                obj.Type = `[${types.join(',')}]`;
                obj.Default = def;
                obj.Required = pkg[`${camelcase(name)}Props`][propName].required
                    ? 'Yes'
                    : 'No';
                propsObjs.push(obj);
            }
            const emitsObjs = [];
            for (const evtName in pkg[`${camelcase(name)}Emits`]) {
                let obj: EmitsAttributes = {
                    EmitName: '',
                    Arguments: '',
                    Statement: '',
                };
                obj.EmitName = decamelize(evtName, {
                    separator: '-',
                });
                obj.Arguments = getParameterName(
                    pkg[`${camelcase(name)}Emits`][evtName]
                ).join(',');
                emitsObjs.push(obj);
            }
            tables[name] = {
                props: propsObjs,
                emits: emitsObjs,
            };
        }
        return tables;
    }

    async buildTableAsync(tables: Tables) {
        for (const name in tables) {
            fs.writeFileSync(
                path.join(this._path.docs, name, 'properties.md'),
                `## Properties

---         
${MarkdownTable.encode(tables[name].props)}`,
                {
                    encoding: 'utf-8',
                }
            );
            fs.writeFileSync(
                path.join(this._path.docs, name, 'emits.md'),
                `## Emits

---         
${MarkdownTable.encode(tables[name].emits)}`,
                {
                    encoding: 'utf-8',
                }
            );
        }
    }
}

async function main() {
    const success = pc.green('√');
    const fail = pc.red('×');
    const spinner = ora();
    spinner.start('build properties and emits table from ts source...');
    const builder = new MarkdownTableBuilder();
    const newTable = await builder.getTablesAsync();
    const oldTable = await builder.scanTablesAsync();
    const tables = await builder.mergeTableAsync(oldTable, newTable);
    await builder.buildTableAsync(tables);
    spinner.stopAndPersist({
        symbol: success,
        text: 'builded properties and emits table from ts source.',
    });
}

main();
