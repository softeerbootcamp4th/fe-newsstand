import { shownewstab } from "../displaynews/displaysubscribe.js";
import { updateNewsDisplay } from "../displaynews/displayNews.js";
import { resetProgress, transformToProgress } from "../progressbar/progressbutton.js";

export const mytabs = () => {
    const datas1 = localStorage.getItem("mysubscribe");
    if (!datas1) {
        const button = document.querySelector(`.news-list-header`);
        button.innerHTML = '';
        console.log('No data found in localStorage');
        return;
    }

    //필수
    else{
        const parsedData = JSON.parse(datas1);
        shownewstab(parsedData);
    }
}

export const newstype = ["economy", "broadcast", "internet", "englishnews", "sportsentertain", "magazine", "region"];

export const originaltabs = () => {
    const defaultn = document.querySelector(".news-list-header");
    defaultn.innerHTML = 
    "<article class=\"text-button\" id=\"economy\ data-index=\"0\">종합/경제 <span></span></article>"+
    "<article class=\"text-button\" id=\"broadcast\" data-index=\"1\">방송/통신 <span></span></article>"+
    "<article class=\"text-button\" id=\"internet\" data-index=\"2\">IT <span></span></article>"+
    "<article class=\"text-button\" id=\"englishnews\" data-index=\"3\">영자지 <span></span></article>"+
    "<article class=\"text-button\" id=\"sportsentertain\" data-index=\"4\">스포츠/연예 <span></span></article>"+
    "<article class=\"text-button\" id=\"magazine\" data-index=\"5\">매거진/전문지 <span></span></article>"+
    "<article class=\"text-button\" id=\"region\" data-index=\"6\">지역 <span></span></article>";
}

export const tabgenerator = () => {
    let tempidx = 0;
    const buttons = document.querySelectorAll('.text-button');
    buttons.forEach(bt => {
        //console.log(bt.id);
        bt.addEventListener('click', (event) => { 
            const a = event.target;
            tempidx = 0;
            updateNewsDisplay(a.id, tempidx);
            resetProgress();
            transformToProgress(bt);     
        });
    });
    updateNewsDisplay("economy", tempidx);
    const ts = document.querySelector(".text-button");
    transformToProgress(ts);
}
