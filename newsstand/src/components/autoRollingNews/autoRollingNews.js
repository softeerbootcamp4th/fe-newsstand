export const AutoRollingNews = ({ news, handleHoverAction }) => {
  let element = document.createElement("div");
  element.className = "autoRollingNews-container";

  let titleElement;
  const render = () => {
    const html = `
            <p class="autoRollingNews-company">${news.press}</p>
            <a id="autoRollingNews-title" class="autoRollingNews-item animate-out" href="${news.link}">${news.title}</a>
        `;
    element.innerHTML = html;

    titleElement = element.querySelector("#autoRollingNews-title");

    titleElement.addEventListener("mouseover", () => { handleHoverAction(true); });
    titleElement.addEventListener("mouseout", () => { handleHoverAction(false); });

    setTimeout(() => {
        titleElement.classList.remove('animate-out');
        titleElement.classList.add('animate-in');
    }, 100);
  }

  render();

  function updateProps(updateNews) {
    news = updateNews;
    render();
}

return {
    element,
    updateProps
};
};

export default AutoRollingNews;
