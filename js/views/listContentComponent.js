import db from "../rawData.js";
import html from "../domParser.js";
//import subscribeState from "./subscribeState.js";

function ListContentComponent(pressId)
{
	const {name, logo, lastEditDate, headArticle, articleList} = db[pressId];

	const dom = html`
	<article class="listContent">
		<div class="contentHeader">
			<img src="${logo}" alt="${name}" class="logoImage" />
			<p class="lastEditDate">${lastEditDate} 편집</p>
			<button class="subscribeButton" data-force-replace="true">+ 구독하기</button>
		</div>
		<div class="contentBody">
			<div class="headlineArticle">
				<img src="${headArticle.img}" alt="${headArticle.title}">
				<p>${headArticle.title}</p>
			</div>
			<ul class="articleList">
				${
					articleList.map( (title)=>html`<li>${title}</li>`)
				}
				<p class="articleFooter" data-unique-key="article-footer">${name} 언론사에서 직접 편집한 그거임</p>
			</ul>
		</div>
	</article>`;

	const subscButton = dom.querySelector(".subscribeButton");
	subscButton.addEventListener( "click", ()=>{
		console.log(pressId);
		//subscribePopup(pressId);
	} );

	return dom;
}

export default ListContentComponent;