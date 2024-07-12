class SubscribedMedia {
    constructor() {
        this.data = [{
            "id": 1,
            "icon": "media-icon-1.svg",
            "name": "서울경제"
        },
        {
            "id": 2,
            "icon": "media-icon-2.svg",
            "name": "데일리안"
        },
        {
            "id": 3,
            "icon": "media-icon-3.svg",
            "name": "헤럴드경제"
        },
        {
            "id": 4,
            "icon": "media-icon-4.svg",
            "name": "SBS Biz"
        },
        {
            "id": 5,
            "icon": "media-icon-5.svg",
            "name": "세계일보"
        },
        {
            "id": 6,
            "icon": "media-icon-6.svg",
            "name": "아시아경제"
        },
        {
            "id": 7,
            "icon": "media-icon-7.svg",
            "name": "이데일리"
        },
        {
            "id": 8,
            "icon": "media-icon-8.svg",
            "name": "한국일보"
        },
        {
            "id": 9,
            "icon": "media-icon-9.svg",
            "name": "아이뉴스24"
        },
        {
            "id": 10,
            "icon": "media-icon-10.svg",
            "name": "파이낸셜뉴스"
        },
        {
            "id": 11,
            "icon": "media-icon-11.svg",
            "name": "스포츠서울"
        },
        {
            "id": 12,
            "icon": "media-icon-12.svg",
            "name": "스포츠동아"
        },
        {
            "id": 13,
            "icon": "media-icon-13.svg",
            "name": "석간문화일보"
        },
        {
            "id": 14,
            "icon": "media-icon-14.svg",
            "name": "KBS WORLD"
        },
        {
            "id": 15,
            "icon": "media-icon-15.svg",
            "name": "Korea JoongAng Daily"
        },
        {
            "id": 16,
            "icon": "media-icon-16.svg",
            "name": "Insight"
        }];
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