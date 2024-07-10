import { nowMediaName } from "../pages/state/newsState.js";

export const fetchData = async (src) => {
    const res = await fetch(src);
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${src}`);
    }
    return res.json();
}

export const extractMedias = (data) => {
    const mediaList = [];
    data.forEach(categoryEl => {
        categoryEl.mediaData.forEach((d) => {
            mediaList.push(d.mediaName);
        })
    });
    return mediaList;
}

export const extractDataWithMedia = (data) => {
    return data?.reduce((acc, item) => {
        item.mediaData?.forEach((obj) => {
            acc[obj.mediaName] = obj;
        });
        return acc;
    }, {});
}

export const setSubscription = () => {
    localStorage.setItem(nowMediaName, Date.now())
}

export const getSubscriptionList = () => {
    return Array.from({ length: localStorage.length }, (_, i) => [localStorage.getItem(localStorage.key(i)), localStorage.key(i)])
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(item => item[1])
}