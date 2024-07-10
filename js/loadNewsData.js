document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.navItem');
    const articleTop = document.querySelector('.articleTop');
    const articleBottom = document.querySelector('.articleBottom');

    fetch('./asset/data/newsData.json')
        .then(response => response.json())
        .then(data => {
            // 모든 nav item에 클릭 이벤트 리스너 추가
            navItems.forEach((navItem, index) => {
                navItem.addEventListener('click', () => {
                    displayNews(data.newsList[index]);
                });
            });
        })
        .catch(error => console.error('데이터 가져오기 실패:', error));

        function displayNews(newsData) {
            // 기존에 있던 내용 삭제
            articleTop.innerHTML = '';
            articleBottom.innerHTML = '';
        
            // <div class="articleTop"> 업데이트
            const pressImage = document.createElement('img');
            pressImage.src = newsData.press[0].pressLogo;
            pressImage.alt = 'pressImage';
            const editDate = document.createElement('span');
            editDate.id = 'editDate';
            editDate.textContent = newsData.press[0].editDate;
            const subscribeBtn = document.createElement('button');
            subscribeBtn.classList.add('subscribeBtn');
            subscribeBtn.textContent = '+구독하기';
            
            articleTop.appendChild(pressImage);
            articleTop.appendChild(editDate);
            articleTop.appendChild(subscribeBtn);
        
            // <div class="articleBottom"> 업데이트
            const articleImageDiv = document.createElement('div');
            articleImageDiv.classList.add('articleImage');
            const mainNewsImage = document.createElement('img');
            mainNewsImage.id = 'mainNewsImage'; 
            mainNewsImage.src = newsData.press[0].mainNews.mainNewsImage;
            mainNewsImage.alt = 'mainNewsImage';
            const mainNewsTitle = document.createElement('strong');
            mainNewsTitle.id = 'mainNewsTitle';
            mainNewsTitle.textContent = newsData.press[0].mainNews.mainNewsTitle;
        
            articleImageDiv.appendChild(mainNewsImage);
            articleImageDiv.appendChild(mainNewsTitle);
        
            const articleOtherDiv = document.createElement('div');
            articleOtherDiv.classList.add('articleOther');
            const verticalList = document.createElement('ul');
            verticalList.classList.add('vertical-list');
            
            newsData.press[0].subNews.forEach(subNews => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = subNews.subNewsTitle;
                span.appendChild(a);
                li.appendChild(span);
                verticalList.appendChild(li);
            });
        
            articleOtherDiv.appendChild(verticalList);
            articleBottom.appendChild(articleImageDiv);
            articleBottom.appendChild(articleOtherDiv);
        }
});
