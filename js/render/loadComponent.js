import { renderHeader } from '../../components/header.js';
import { renderNewsSection } from '../../components/newsSection.js';
import { renderMainContent } from '../../components/main.js';
import { renderToastAlert } from '../../components/toastAlert.js';
import { renderModal } from '../../components/modal.js';


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
