export default class MainView {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "main-container";
      this.contentContainer = document.createElement("div");
      this.contentContainer.className = "main-content-container";
    }
  
    render(pressMenuElement, newsListElement) {
      this.element.innerHTML = "";
      this.element.appendChild(pressMenuElement);
      this.element.appendChild(this.contentContainer);
      this.contentContainer.innerHTML = "";
      this.contentContainer.appendChild(newsListElement);
    }
  
    getElement() {
      return this.element;
    }
  }
  