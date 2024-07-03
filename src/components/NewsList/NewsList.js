import Button from "../common/Button/Button";
import "./NewsList.css";
import articles from "@/mocks/data/articles.json";

function NewsList({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "newsList";
  $target.appendChild(this.$element);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  }

  this.render = () => {
    this.$element.innerHTML = /* html */ `
      <ul class="newsFilter">
        <li class="selected" >전체 언론사</li>
        <li>내가 구독한 언론사</li>
      </ul>
      
      <section class="listSection">
        <ul class="categoryFilter">
          <li>종합/경제</li>
          <li>방송/통신</li>
          <li>IT</li>
          <li>영자지</li>
          <li>스포츠/연예</li>
          <li>매거진/전문지</li>
          <li>지역</li>
        </ul>

        <div class="newsInfo">
          <section class="companyInfo">
            <img src="${articles[0].companyLogo}"/>
            <p>${formatDate(new Date())} 편집</p>
          </section>

          <section class="articleInfo">
            <div class="mainNews">
              <img src="${articles[0].imgUrl}"/>
              <p>${articles[0].title}</p>
            </div>
            <div class="subNews">
              <ul>
                ${articles[0].headlines.map((str) => `<li>${str}</li>`).join("\n")}
                <p>${articles[0].company} 언론사에서 직접 편집한 뉴스입니다.</p>
              </ul>
            </div>
          </section>
        </div>
        
      </section>
      `;
  };

  this.render();

  new Button({
    $target: this.$element.querySelector(".companyInfo"),
    text: "구독하기",
    color: "gray",
    icon: "plus",
  });
}

export default NewsList;
