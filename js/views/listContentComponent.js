import db from "../rawData.js";
import html from "../domParser.js";
import SubscribeButton from "./subscribeButton.js";

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

function ListContentComponent(pressId, subscribeState)
{
	const {name, logo, lastEditDate, headArticle, articleList} = db[pressId];

	const dom = html`
	<article class="listContent">
		<div class="contentHeader">
			<img src="${logo}" alt="${name}" class="logoImage" />
			<p class="lastEditDate">${getDateFormat(lastEditDate)} 편집</p>
			${SubscribeButton(pressId, subscribeState)}
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

	return dom;
}

export default ListContentComponent;