const AutoRollingNews = (props) => {
    const newsItems = [
        '노바백스 백신 2월중순부터 접종',
        '얼어붙은 투심에…현대엔지니어링 상장 철회',
        '"일본 정부, 사도광산 세계유산 추천 방침 굳혀, 일본과 갈등 첨예화 예상"',
        '"공법변경 구조검토 요구, 현산 측이 묵살했다"',
        '12월 주담대 금리 연 3.63%…7년7개월 만에 최고',
    ]

    let interval = ''

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            interval = window.setInterval(rollingCallback, 5000)
        }, props.wait)

        document.querySelector(`#auto-rolling-news-container${props.id}`).addEventListener('mouseover', function () {
            window.clearInterval(interval)
        })
        document.querySelector(`#auto-rolling-news-container${props.id}`).addEventListener('mouseout', function () {
            interval = window.setInterval(rollingCallback, 5000)
        })
    })

    function rollingCallback() {
        const container = document.querySelector(`#auto-rolling-news-container${props.id}`)

        container.querySelector('.prev').classList.remove('prev')

        let current = container.querySelector('.current')
        current.classList.remove('current')
        current.classList.add('prev')

        let next = container.querySelector('.next')

        if (next.nextElementSibling === null) {
            container.querySelector('ul li:first-child').classList.add('next')
        } else {
            next.nextElementSibling.classList.add('next')
        }
        next.classList.remove('next')
        next.classList.add('current')
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5)
    }

    shuffle(newsItems)

    const newsListItems = newsItems.map((item, index) => {
        let liClass
        switch (index) {
            case 0:
                liClass = 'current'
                break
            case 1:
                liClass = 'next'
                break
            case newsItems.length - 1:
                liClass = 'prev'
                break
            default:
                liClass = ''
                break
        }
        return `<li class="${liClass}"><a href="#">${item}</a></li>`
    })

    return {
        element: `
            <div class="auto-rolling-news-container" id="auto-rolling-news-container${props.id}">
                <div class="auto-rolling-news-title">연합뉴스</div>
                <div class="auto-rolling-wrap">
                    <ul>
                        ${newsListItems.join('')}
                    </ul>
                </div>
            </div>
        `,
    }
}

export default AutoRollingNews
