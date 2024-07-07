export function generateNav(container, categoryList) {
  const nav = document.createElement("nav");
  nav.classList.add("content_navigator");

  const li = document.createElement("li");
  li.classList.add("contentList");

  categoryList.forEach((category) => {
    const ul = document.createElement("ul");
    li.appendChild(ul);

    const textContent = document.createElement("span");
    textContent.textContent = category;
    ul.appendChild(textContent);
    const progress = document.createElement("span");
    progress.classList.add("progress");
    ul.appendChild(progress);
  });

  nav.appendChild(li);
  container.appendChild(nav);
}
