import db from "../rawData.js";
import html from "../domParser.js";
//import subscribeState from "./subscribeState.js";

function getDateFormat(dateMillis)
{
	let pad = (num)=>num.toString().padStart(2, "0");
	let date = new Date(dateMillis);
	let year = date.getFullYear();
	let month = pad(date.getMonth());
	let day = pad(date.getDay());
	let hour = pad(date.getHours());
	let minute = pad(date.getMinutes());
	return `${year}-${month}-${day} ${hour}:${minute}`;
}

function ListContentComponent(pressId)
{
	const {name, logo, lastEditDate, headArticle, articleList} = db[pressId];

	const dom = html`
	<article class="listContent">
		<div class="contentHeader">
			<img src="${logo}" alt="${name}" class="logoImage" />
			<p class="lastEditDate">${getDateFormat(lastEditDate)} 편집</p>
			<button class="subscribeButton" data-force-replace="true">
				<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
					<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="inherit"/>
				</svg>
			구독하기</button>
		</div>
		<div class="contentBody">
			<div class="headlineArticle">
				<div class="headlineImgWrapper">
					<img src="${headArticle.img}" alt="${headArticle.title}">
				</div>
				<p>${headArticle.title}</p>
			</div>
			<ul class="articleList">
				${
					articleList.slice(0,6).map( (title, i)=>html`<li data-unique-key="article-slice-${i}">${title}</li>`)
				}
				<p class="articleFooter" data-unique-key="article-footer">${name} 언론사에서 직접 편집한 뉴스입니다.</p>
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