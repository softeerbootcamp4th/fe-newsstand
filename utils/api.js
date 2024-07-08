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