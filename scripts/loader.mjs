import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';
import { pathToFileURL, fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig('./scripts');
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, ctx, defaultResolve) {
    const mappedSpecifier = matchPath(specifier);
    if (mappedSpecifier) {
        // check index.ts
        if (!mappedSpecifier.endsWith('.ts')) {
            if (mappedSpecifier.endsWith('index')) {
                specifier = pathToFileURL(mappedSpecifier) + '.ts';
            } else {
                if (fs.existsSync(mappedSpecifier + '.ts')) {
                    specifier = pathToFileURL(mappedSpecifier) + '.ts';
                } else {
                    specifier =
                        pathToFileURL(path.join(mappedSpecifier, 'index')) +
                        '.ts';
                }
            }
        }
    } else {
        if (specifier.startsWith('./') || specifier.startsWith('../')) {
            if (!(specifier.endsWith('.js') || specifier.endsWith('.ts'))) {
                if (
                    fs.existsSync(
                        path.join(
                            path.dirname(fileURLToPath(ctx.parentURL)),
                            specifier + '.ts'
                        )
                    )
                ) {
                    specifier = specifier + '.ts';
                } else {
                    specifier = specifier + '/index.ts';
                }
            }
        }
    }
    return resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm';
