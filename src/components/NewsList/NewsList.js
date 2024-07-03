import NewsViewer from "@/components/NewsViewer/NewsViewer";
import "./NewsList.css";
import leftButton from "@/assets/icons/leftButton.png";
import rightButton from "@/assets/icons/rightButton.png";

function NewsList({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.insertAdjacentElement(position, this.$element);

  this.state = {
    page: 0,
  };

  this.setState = ({ page }) => {
    this.state = { page };

    this.render();
  };

  const handleNextClick = () => {
    if (this.state.page + 1 >= 100) return;

    this.setState({ page: this.state.page + 1 });
  };

  const handlePrevClick = () => {
    if (this.state.page - 1 < 0) return;

    this.setState({ page: this.state.page - 1 });
  };

  const handleClick = (event) => {
    if (event.target.closest("button").className === "newsButton next") {
      handleNextClick();

      return;
    }

    if (event.target.closest("button").className === "newsButton prev") {
      handlePrevClick();

      return;
    }
  };

  this.render = () => {
    this.$element.innerHTML = /* html */ `
      <ul class="newsFilter">
        <li class="selected" >전체 언론사</li>
        <li>내가 구독한 언론사</li>
      </ul>
      
      <article class="newsView">
        <ul class="categoryFilter">
          <li>종합/경제</li>
          <li>방송/통신</li>
          <li>IT</li>
          <li>영자지</li>
          <li>스포츠/연예</li>
          <li>매거진/전문지</li>
          <li>지역</li>
        </ul>
        
        <button class="newsButton prev"><img src="${leftButton}"/></button>
        <button class="newsButton next"><img src="${rightButton}"/></button>
      </article>
      `;

    new NewsViewer({
      $target: this.$element.querySelector(".newsView"),
    });
  };

  this.render();

  this.$element.addEventListener("click", handleClick.bind(this));
}

export default NewsList;
