import { shuffle } from '../utils/listUtils.js'
import { newsItems } from '../datas/mockData.js'

const AutoRollingNews = (props) => {
    let interval = ''
    let rollingContainer = null

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            interval = setInterval(rollingCallback, 5000)
        }, props.wait)

        if (!rollingContainer) {
            rollingContainer = document.querySelector(`#auto-rolling-news-container${props.id}`)
        }

        rollingContainer.addEventListener('mouseover', function () {
            clearInterval(interval)
        })
        rollingContainer.addEventListener('mouseout', function () {
            interval = setInterval(rollingCallback, 5000)
        })
    })

    function rollingCallback() {
        if (!rollingContainer) {
            rollingContainer = document.querySelector(`#auto-rolling-news-container${props.id}`)
        }
        rollingContainer.querySelector('.prev').classList.remove('prev')

        let current = rollingContainer.querySelector('.current')
        current.classList.remove('current')
        current.classList.add('prev')

        let next = rollingContainer.querySelector('.next')

        if (next.nextElementSibling === null) {
            rollingContainer.querySelector('ul li:first-child').classList.add('next')
        } else {
            next.nextElementSibling.classList.add('next')
        }
        next.classList.remove('next')
        next.classList.add('current')
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
