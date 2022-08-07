import fs from 'fs';
import path, { dirname } from 'path';
import camelCase from 'camelcase';
import ora from 'ora';
import prompts from 'prompts';
import decamelize from 'decamelize';
import pc from 'picocolors';
import { exec } from 'child_process';
import { ComponentsUtils } from './utils/components';

function template(strings: TemplateStringsArray, ...keys: any[]) {
    return function (...values: any[]) {
        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function (key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    };
}

export class ComponentBuilder {
    private _prefix: string;
    private _name: string;
    private _path = {
        package: './src/packages/',
        docs: './docs/guide/components/',
        style: './src/styles',
    };
    private _template: Record<string, Record<string, Function>> = {
        // package/{component-name}
        'packages/component': {
            // index.ts
            'index.ts': template`import { convertPlugin } from "@/utils/plugins/install-component"
import "./style"
import ${'Name'} from "./source/index.vue"
export const ${'Prefix'}${'Name'} = convertPlugin(${'Name'})
export default ${'Prefix'}${'Name'}
`,
            // style/index.ts
            'style/index.ts': template`import "@/styles/theme/base/${'-name'}/index.scss"
import "@/styles/theme/light/${'-name'}/index.scss"
import "@/styles/theme/dark/${'-name'}/index.scss"
`,
            // source/index.ts
            'source/index.ts': template`import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const ${'name'}Props = {
    ...commonProps,
}

export type ${'Name'}Props = ExtractPropTypes<typeof ${'name'}Props>;

export const ${'name'}Emits = {
}

export type ${'Name'}Emits = typeof ${'name'}Emits

export const use${'Name'} = (props: ${'Name'}Props, emits: EmitFn<${'Name'}Emits>) => {
    return {
    }
}
`,
            // source/index.vue
            'source/index.vue': template`<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { ${'name'}Props, ${'name'}Emits, use${'Name'} } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "${'Prefix'}${'Name'}"
})

const emits = defineEmits(${'name'}Emits)

const props = defineProps(${'name'}Props)

const { theme } = useTheme(props)

const {  } = use${'Name'}(props, emits)
</script>
<template>
    <div>
        ${'Prefix'}${'Name'}
    </div>
</template>
`,
        },
        // packages
        packages: {
            // index.ts
            'index.ts': template`import '@/libs/office-ui-fabric-core/css/fabric.min.css';

${'exports'}

import '@/styles/theme/index.scss';

import type { App, Plugin } from 'vue';
import { createPinia } from 'pinia';

${'imports'}

const components = [
    ${'Names'}
];

export const ${'Prefix'}ComponentPlugins: Plugin = {
    install(app: App, options: any) {
        const pinia = createPinia();
        app.use(pinia);
        for (const component of components) {
            app.use(component);
        }
    },
};
`,
        },
        styles: {
            // theme/base/{name}/index.scss
            'theme/base': template`.${'-prefix'}-${'-name'}{
}
`,
            // theme/light/{name}/index.scss
            'theme/light': template`.${'-prefix'}-${'-name'}{
    &.light{
    }
}`,
            // theme/dark/{name}/index.scss
            'theme/dark': template`.${'-prefix'}-${'-name'}{
    &.dark{   
    }
}`,
        },
        docs: {
            'index.md': template`---
page: true
title: ${'Name'}
--- 

<script lang="ts" setup>
import { ref } from 'vue'; 
import { useTheme } from '../common/index.js'; 

const {theme} = useTheme()


</script>

# ${'Name'}

## Quick Start

### Default

---

<${'-prefix'}-${'-name'} :theme="theme">
</${'-prefix'}-${'-name'}>

\`\`\`vue-html
    <${'-prefix'}-${'-name'} :theme="theme">
    </${'-prefix'}-${'-name'}>
\`\`\`

<!--@include: ./properties.md-->

<!--@include: ./emits.md-->
`,
            'properties.md': template`## Properties

---
|  Property  |             Type             | Required | Default |    Statement    |
|:------------:|:----------------------------------:|:--------------:|:---------------:|:---------------------:|

`,
            'emits.md': template`## Emits

---
| EmitName | Arguments | Statement |
|:------------:|:--------------:|:---------------:|
`,
        },
    };

    constructor({ prefix, name }: { prefix: string; name: string }) {
        this._prefix = decamelize(prefix, {
            separator: '-',
        });
        this._name = decamelize(name, {
            separator: '-',
        });
    }

    async buildComponentAsync(): Promise<void> {
        // create folders
        fs.mkdirSync(path.join(this._path.package, this._name, 'source'), {
            recursive: true,
        });
        fs.mkdirSync(path.join(this._path.package, this._name, 'style'), {
            recursive: true,
        });
        // create component sources
        for (const p in this._template['packages/component']) {
            const fullpath = path.join(this._path.package, this._name, p);
            // if exists, continue
            if (fs.existsSync(fullpath)) {
                throw new Error(`${fullpath} exists`);
            }
            fs.writeFileSync(
                fullpath,
                this._template['packages/component'][p]({
                    name: camelCase(this._name),
                    prefix: camelCase(this._prefix),
                    Name: camelCase(this._name, {
                        pascalCase: true,
                    }),
                    Prefix: camelCase(this._prefix, {
                        pascalCase: true,
                    }),
                    '-name': this._name,
                    '-prefix': this._prefix,
                }),
                {
                    encoding: 'utf-8',
                }
            );
        }
        await this.buildStylesAsync();
        await this.buildDocsAsync();
        await this.buildComponentEntryAsync();
    }

    async buildStylesAsync(): Promise<void> {
        for (const p in this._template.styles) {
            const dirname = path.join(this._path.style, p, this._name);
            fs.mkdirSync(dirname, {
                recursive: true,
            });
            // create scss
            fs.writeFileSync(
                path.join(dirname, 'index.scss'),
                this._template.styles[p]({
                    name: camelCase(this._name),
                    prefix: camelCase(this._prefix),
                    Name: camelCase(this._name, {
                        pascalCase: true,
                    }),
                    Prefix: camelCase(this._prefix, {
                        pascalCase: true,
                    }),
                    '-name': this._name,
                    '-prefix': this._prefix,
                }),
                {
                    encoding: 'utf-8',
                }
            );
        }
    }

    async buildDocsAsync(): Promise<void> {
        for (const p in this._template.docs) {
            const fullpath = path.join(this._path.docs, this._name, p);
            fs.mkdirSync(dirname(fullpath), {
                recursive: true,
            });
            fs.writeFileSync(
                fullpath,
                this._template.docs[p]({
                    name: camelCase(this._name),
                    prefix: camelCase(this._prefix),
                    Name: camelCase(this._name, {
                        pascalCase: true,
                    }),
                    Prefix: camelCase(this._prefix, {
                        pascalCase: true,
                    }),
                    '-name': this._name,
                    '-prefix': this._prefix,
                }),
                {
                    encoding: 'utf-8',
                }
            );
        }
    }

    async getAllComponentsAsync(): Promise<string[]> {
        return ComponentsUtils.getAllComponents(this._path.package);
    }

    async buildComponentEntryAsync(): Promise<void> {
        const components = await this.getAllComponentsAsync();
        let exports: string[] = [];
        let imports: string[] = [];
        for (const component of components) {
            exports.push(`export * from "./${component}"`);
            imports.push(
                `import ${camelCase(component, {
                    pascalCase: true,
                })} from "./${component}"`
            );
        }
        fs.writeFileSync(
            path.join(this._path.package, 'index.ts'),
            this._template.packages['index.ts']({
                Names: components
                    .map((e) =>
                        camelCase(e, {
                            pascalCase: true,
                        })
                    )
                    .join(',\n    '),
                exports: exports.join('\n'),
                imports: imports.join('\n'),
                Prefix: camelCase(this._prefix, {
                    pascalCase: true,
                }),
            }),
            {
                encoding: 'utf-8',
            }
        );
    }

    async removeAsync(): Promise<void> {
        // remove components
        fs.rmSync(path.join(this._path.package, this._name), {
            recursive: true,
            force: true,
        });
        // remove styles
        for (const p in this._template.styles) {
            fs.rmSync(path.join(this._path.style, p, this._name), {
                recursive: true,
                force: true,
            });
        }
        // remove docs
        fs.rmSync(path.join(this._path.docs, this._name), {
            recursive: true,
            force: true,
        });
        await this.buildComponentEntryAsync();
    }

    async openAsync(): Promise<void> {
        // async runner
        const runAsync = async (cmd: string): Promise<void> => {
            return await new Promise((resolve, reject) => {
                exec(cmd, (error, stdout, stderr) => {
                    if (error !== undefined && error !== null) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        };
        const runners: Promise<void>[] = [];
        // open components
        for (const p in this._template['packages/component']) {
            const fullpath = path.join(
                this._path.package,
                decamelize(this._name, {
                    separator: '-',
                }),
                p
            );
            runners.push(runAsync(`code ${fullpath}`));
        }
        // open styles
        for (const p in this._template.styles) {
            const fullpath = path.join(
                this._path.style,
                p,
                decamelize(this._name, {
                    separator: '-',
                }),
                'index.scss'
            );
            runners.push(runAsync(`code ${fullpath}`));
        }
        await Promise.all(runners);
    }
}

async function sleep(ms: number) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, ms);
    });
}

async function main() {
    const success = pc.green('√');
    const fail = pc.red('×');
    let res: Record<string, any> = await prompts(
        [
            {
                type: 'select',
                name: 'action',
                message: 'add or remove component',
                choices: [
                    {
                        title: 'Add',
                        description: 'add component',
                        value: 'add',
                    },
                    {
                        title: 'Remove',
                        description: 'remove component',
                        value: 'remove',
                    },
                ],
                initial: 0,
            },
            {
                type: 'text',
                name: 'prefix',
                message: 'component prefix name?',
                initial: 'fv',
                validate: (val: string) => {
                    return val.length !== 0;
                },
            },
            {
                type: 'text',
                name: 'name',
                message: 'component name?',
                validate: (val: string) => {
                    return val.length !== 0;
                },
                format: (val: string) => {
                    return decamelize(val, { separator: '-' });
                },
            },
        ],
        {
            onCancel() {
                process.exit(1);
            },
        }
    );
    const builder = new ComponentBuilder({
        prefix: res.prefix,
        name: res.name,
    });
    // commands
    const spinner = ora();
    if (res.action === 'add') {
        spinner.start(pc.blue(`create ${res.prefix}-${res.name} component...`));
        await builder.buildComponentAsync();
        await sleep(3000);
        spinner.stopAndPersist({
            symbol: success,
            text: pc.green(`created ${res.prefix}-${res.name} component.`),
        });
        // vscode
        res = await prompts([
            {
                type: 'confirm',
                message: 'Open in VSCode?',
                initial: true,
                name: 'code',
            },
        ]);
        if (res.code) {
            spinner.start(`vscode opening...`);
            await builder.openAsync();
            spinner.stopAndPersist({
                symbol: success,
                text: pc.green('vscode opend.'),
            });
        }
    } else if (res.action === 'remove') {
        spinner.start(pc.red(`remove ${res.prefix}-${res.name} component...`));
        await sleep(3000);
        await builder.removeAsync();
        spinner.stopAndPersist({
            symbol: success,
            text: pc.red(`removed ${res.prefix}-${res.name} component.`),
        });
    }
}

main();
