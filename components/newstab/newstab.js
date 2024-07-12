import { shownewstab } from "../displaynews/displaySubscribe.js";
import { clickArt } from "../mainscript.js";
import { animationTimer } from "../progressbar/progressbutton.js";
import { subProgressTimer } from "../displaynews/displaySubscribe.js";
import subscribeManager from "../statemanager/subscribeManager.js";

export const mytabs = () => {
    const subscribedDatas = localStorage.getItem("mysubscribe");
    clickArt('my-article');
    clearInterval(animationTimer);
    clearInterval(subProgressTimer);
    if (subscribedDatas.length === 0) {
        console.log('No data found in localStorage');
        const button = document.querySelector(`.news-list-header`);
        button.innerHTML = '';
        const lists = document.querySelector(".news-main-container");
        lists.innerHTML = '';
        const lists1 = document.querySelector(".news-list-header");
        lists1.innerHTML = '';
        const lists2 = document.querySelector(".news-press-container");
        lists2.innerHTML = ''; 
        return;
    }
    //필수
    else{
        const parsedData = JSON.parse(subscribedDatas);
        subscribeManager.setSubscribedData(parsedData);
        shownewstab(subscribeManager.getSubscribedData());
    }
}

export const newstype = ["economy", "broadcast", "internet", "englishnews", "sportsentertain", "magazine", "region"];

export const originaltabs = () => {
    clearInterval(subProgressTimer);
    clearInterval(animationTimer);
    const defaultn = document.querySelector(".news-list-header");
    defaultn.innerHTML = 
    "<article class=\"text-button\" id=\"economy\" data-index=\"0\">종합/경제 <span></span></article>"+
    "<article class=\"text-button\" id=\"broadcast\" data-index=\"1\">방송/통신 <span></span></article>"+
    "<article class=\"text-button\" id=\"internet\" data-index=\"2\">IT <span></span></article>"+
    "<article class=\"text-button\" id=\"englishnews\" data-index=\"3\">영자지 <span></span></article>"+
    "<article class=\"text-button\" id=\"sportsentertain\" data-index=\"4\">스포츠/연예 <span></span></article>"+
    "<article class=\"text-button\" id=\"magazine\" data-index=\"5\">매거진/전문지 <span></span></article>"+
    "<article class=\"text-button\" id=\"region\" data-index=\"6\">지역 <span></span></article>";
}
