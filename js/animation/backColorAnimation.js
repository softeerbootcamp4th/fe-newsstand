function backColorAnimate() {
    const selectedMedia = document.querySelector(".news-list__navbar__category[data-selected='yes']");

    const index = selectedMedia.dataset.newsIndex;
    const count = selectedMedia.dataset.newsCount;
    let gradientPosition = (index / count) * 100;

    selectedMedia.style.backgroundImage = `linear-gradient(to right, #4362D0 ${gradientPosition}%, #7890E7 ${gradientPosition}%, #7890E7)`
}

export { backColorAnimate }