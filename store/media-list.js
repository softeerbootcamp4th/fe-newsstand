class MediaList {
    constructor() {
        this.data = [];
    }

    setData(data) {
        this.data = data;
    }
    getLength() {
        return this.data.length;
    }
    findMediaById(id) {
        return this.data.find((_data) => _data.id === id);
    }
}

const mediaList = new MediaList();
export { mediaList };