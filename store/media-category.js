class MediaCategory {
    constructor() {
        this.data = [];
    }

    setData(data) {
        this.data = data;
    }
    getLength() {
        return this.data.length;
    }
}

const mediaCategory = new MediaCategory();
export { mediaCategory };