import { data } from './news.js';

document.addEventListener("DOMContentLoaded", () => {
    const NewsListUl = document.getElementById('NewsList').querySelector('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.type;
        li.classList.add('notselectNews');
        NewsListUl.appendChild(li);
    });
});


document.addEventListener('DOMContentLoaded', async () => {
    while (true) {
        for (const item of data) {
            await processCategory(item, 0);
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const newsListUl = document.getElementById('NewsList').querySelector('ul');
    const liList = newsListUl.querySelectorAll('li');

    liList.forEach((li, index) => {
        li.addEventListener('click', () => {
            console.log(`Clicked li index: ${index}`);
        });
    });
});



const processCategory = async (item, index) => {
    const { id: newsId, type: newsType } = item;
    const NewsListCategory = document.getElementById('NewsList').querySelector(`li:nth-child(${newsId})`);
    NewsListCategory.classList.remove('notselectNews');
    NewsListCategory.classList.add('selectNews');

    const totalCompanies = item.company.length;

    if (totalCompanies === 1) {
        const text = `<div class="selected-bold14">${newsType}</div>
                      <div>
                        <span class="selected-bold14">1</span>
                        <span class="display-bold12">/${totalCompanies}</span>
                      </div>`;
        NewsListCategory.innerHTML = text;

        await new Promise(resolve => setTimeout(resolve, 2000));

        NewsListCategory.classList.remove('selectNews');
        NewsListCategory.classList.add('notselectNews');
        NewsListCategory.textContent = item.type;
    } else {
        // Multiple companies, use interval
        let i = 1;

        const updateNewsCategory = () => {
            const text = `<div class="selected-bold14">${newsType}</div>
                          <div>
                            <span class="selected-bold14">${i}</span>
                            <span class="display-bold12">/${totalCompanies}</span>
                          </div>`;
            NewsListCategory.innerHTML = text;

            i++;

            if (i > totalCompanies) {
                clearInterval(intervalId);
                setTimeout(() => {
                    NewsListCategory.classList.remove('selectNews');
                    NewsListCategory.classList.add('notselectNews');
                    NewsListCategory.textContent = item.type;
                }, 2000);
            }
        };

        updateNewsCategory();

        const intervalId = setInterval(updateNewsCategory, 2000);

        await new Promise(resolve => setTimeout(resolve, (totalCompanies) * 2000));
    }
};



