function backColorAnimate() {
    const selectedMedia = document.querySelector(".news-list__navbar__category[data-selected='yes']");

    const index = selectedMedia.dataset.newsIndex;
    const count = selectedMedia.dataset.newsCount;
    let gradientPosition = (index / count) * 100;

    selectedMedia.style.background = `linear-gradient(to right, #4362D0 50%, #7890E7 50%, #7890E7)`
    selectedMedia.style.backgroundSize = '200%';
    selectedMedia.style.backgroundRepeat = 'no-repeat';
    selectedMedia.style.backgroundPosition = `${100 - gradientPosition}%`
    selectedMedia.style.transition = "background 0.5s"
}

export { backColorAnimate }