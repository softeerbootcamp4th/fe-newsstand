import { renderHeader } from '../../components/Header.js';
import { renderNewsSection } from '../../components/NewsSection.js';
import { renderMainContent } from '../../components/main/Main.js';
import { renderToastAlert } from '../../components/ToastAlert.js';
import { renderModal } from '../../components/Modal.js';


function loadComponent(selector, renderFunction) {
    document.querySelector(selector).innerHTML = renderFunction();
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('#header', renderHeader);
    loadComponent('#news-section', renderNewsSection);
    loadComponent('#main-content', renderMainContent);
    document.querySelector('#main-content').insertAdjacentHTML('beforeend', renderToastAlert());
    document.querySelector('#main-content').insertAdjacentHTML('beforeend', renderModal());

});
