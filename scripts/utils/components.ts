import fs from 'fs';
import path from 'path';

export class ComponentsUtils {
    static getAllComponents(source = './src/packages'): string[] {
        const dirs = fs.readdirSync(path.join(source));
        const components: string[] = [];
        for (const dir of dirs) {
            const fullpath = path.join(source, dir, 'source', 'index.vue');
            if (fs.existsSync(fullpath)) {
                components.push(dir);
            }
        }
        return components;
    }
}
