export class ImageUtil {
    static imageElementToBase64(img: HTMLImageElement) {
        let result = '';
        if (document !== undefined) {
            const canvas = document.createElement('canvas');
            canvas.height = img.height;
            canvas.width = img.width;
            const ctx = canvas.getContext('2d');

            if (ctx !== null) {
                ctx.drawImage(img, 0, 0);
                result = canvas.toDataURL();
            }
            canvas.remove();
        }
        return result;
    }
}
