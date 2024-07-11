import { handleThemeChange } from "./displaygridViewnews.js";

const handleToggle = () => {
    const themeToggleBtn = document.querySelector('#theme-toggle');
    const curTheme = getTheme();

    if(curTheme) {
        document.documentElement.setAttribute("data-theme", curTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute("data-theme");
        theme = theme === "light" ? "dark" : "light";
        setTheme(theme);
        handleThemeChange();

    })
}


export const getTheme = () => localStorage.getItem("theme") || "light";


export function onThemeChange(callback) {
    document.addEventListener('themeChange', callback);
}

export function setTheme (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document.dispatchEvent(new Event('themeChange'));
}

document.addEventListener("DOMContentLoaded", handleToggle);
