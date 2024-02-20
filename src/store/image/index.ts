import { defineStore } from 'pinia';

type ImageNode = {
    data: string;
    key: string;
    state: 'none' | 'loading' | 'done';
};

export const useFvImageCache = defineStore('FvImageCache', {
    state: () => ({
        imgUriList: [] as ImageNode[]
    }),
    getters: {
        imgUri: (state) => (key: string) => {
            const img = state.imgUriList.find((i) => i.key === key);
            return img;
        }
    },
    actions: {
        setImgUri(imgUri: ImageNode) {
            let status = imgUri.state;
            if (imgUri.key == undefined) return 0;
            if (status != 'none' && status != 'loading' && status != 'done')
                imgUri.state = 'none';
            let item = this.imgUriList.find((item) => item.key === imgUri.key);
            if (item == undefined)
                this.imgUriList.push({
                    data: imgUri.data,
                    key: imgUri.key,
                    state: imgUri.state
                });
            else
                this.imgUriList.splice(this.imgUriList.indexOf(item), 1, {
                    data: imgUri.data,
                    key: imgUri.key,
                    state: imgUri.state
                });
        },
        clearImgUri(key: string) {
            let item = this.imgUriList.find((item) => key === item.key);
            if (item == undefined) return 0;
            else this.imgUriList.splice(this.imgUriList.indexOf(item), 1);
        }
    }
});
