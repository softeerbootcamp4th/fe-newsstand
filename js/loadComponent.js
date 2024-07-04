import { renderHeader } from '../components/header.js';
import { renderNewsSection } from '../components/newsSection.js';
import { renderMainContent } from '../components/main.js';
function loadComponent(selector, renderFunction) {
    document.querySelector(selector).innerHTML = renderFunction();
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('#header', renderHeader);
    loadComponent('#news-section', renderNewsSection);
    loadComponent('#main-content', renderMainContent);
});
