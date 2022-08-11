import { DoublyLink, LinkNode } from '@/utils/common/data-structure/link';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFvImageCache = defineStore('FvImageCache', () => {
    const caches = ref<Record<string, string>>({});
    const location: Record<string, LinkNode<string>> = {};
    // const cache
    const size = ref<number>(0);
    const maxsize = ref<number>(10000);
    const link = new DoublyLink<string>();

    function cacheImage(src: string, base64: string): void {
        src = src.trim();
        if (caches.value[src] === undefined) {
            size.value += 1;
            if (size.value > maxsize.value) {
                const source = link.popFrond();
                if (source !== undefined) {
                    delete location[source];
                    delete caches.value[source];
                }
            }
        }
        caches.value[src] = base64;
        location[src] = link.pushEnd(src);
    }

    function getImage(src: string): string {
        src = src.trim();
        const result = caches.value[src];
        if (result !== undefined) {
            link.remove(location[src]);
            location[src] = link.pushEnd(src);
        }
        return result;
    }
    return { cacheImage, getImage };
});
