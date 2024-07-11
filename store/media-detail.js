class MediaDetail {
    constructor() {
        this.data = [];
    }

    setData(data) {
        this.data = data;
    }
    findMediaById(id) {
        return this.data.find((_data) => _data.id === id);
    }
}

const mediaDetail = new MediaDetail();
export { mediaDetail };