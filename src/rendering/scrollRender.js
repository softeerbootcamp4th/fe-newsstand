export const scrollRender = () => {
    const element = document.querySelector('.selectNews');
    const parent = document.getElementById('NewsList').querySelector('ul');
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    console.log(elementRect);
    console.log(parentRect);

    if (elementRect.left < parentRect.left) {
        // Scroll left
        parent.scrollBy({
            left: elementRect.left - parentRect.left,
            behavior: 'smooth'
        });
    } else if (elementRect.right > parentRect.right) {
        // Scroll right
        parent.scrollBy({
            left: elementRect.right - parentRect.right,
            behavior: 'smooth'
        });
    }
};