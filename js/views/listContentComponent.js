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

function ListContentComponent(state, reducer)
{
	const pressId = state.cursor.value;
	const {name, logo, lastEditDate, headArticle, articleList} = db[pressId];

	const dom = html`
	<article class="listContent">
		<div class="contentHeader">
			<div class="logo logoImage">
				<img class="light" src="${db[pressId].logo.light}" alt="${db[pressId].name}" loading="lazy" >
				<img class="dark" src="${db[pressId].logo.dark}" alt="${db[pressId].name}" loading="lazy" >
			</div>
			<p class="lastEditDate">${getDateFormat(lastEditDate)} 편집</p>
			${SubscribeButton(state, reducer)}
		</div>
		<div class="contentBody">
			<div class="headlineArticle">
				<div class="headlineImgWrapper">
					<img src="${headArticle.img}" alt="${headArticle.title}" loading="lazy">
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