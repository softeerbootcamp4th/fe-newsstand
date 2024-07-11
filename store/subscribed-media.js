class SubscribedMedia {
    constructor() {
        this.data = [];
        this.callback = null;
    }

    addMedia(media) {
        this.data.push(media);
        this.processCallback();
    }
    deleteMedia(media) {
        this.data = this.data.filter((_data) => _data.id !== media.id);
        this.processCallback();
    }

    isSubscribed(mediaId) {
        return !!this.data.find((_data) => _data.id === mediaId);
    }
    getSubscribedMediaLength() {
        return this.data.length;
    }

    setCallback(callback) {
        this.callback = callback;
    }
    processCallback() {
        if (this.callback) {
            this.callback();
        }
    }
}

const subscribedMediaList = new SubscribedMedia();
export { subscribedMediaList };