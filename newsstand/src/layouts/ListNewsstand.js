import Button from '../components/base/Button.js'
import { Icon } from '../components/base/IconView.js'
import createComponent from '../core/component/component.js'
import ImageView from '../components/base/ImageView.js'
import { generateRandomId } from '../utils/idGenerator.js'
import useState from '../core/hooks/useState.js'

const ListNewsstand = () => {
    const [count, setCount] = useState(0)

    const buttonComponent1 = createComponent(Button, {
        id: generateRandomId(10),
        icon: Icon.PLUS,
        text: `test1 ${count}`,
        style: 'width: 80px; height:10px;',
        variant: 'white',
    })
    const buttonComponent2 = createComponent(Button, {
        id: generateRandomId(10),
        icon: Icon.PLUS,
        text: `test2 ${count}`,
        style: 'width: 80px; height:10px;',
        variant: 'white',
    })

    const ImageComponent = createComponent(ImageView, {
        src: 'https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202407/03/ned/20240703103837967unkh.jpg',
    })

    setInterval(() => {
        setCount(count + 1)
    }, 2000)

    return {
        element: `
        <div class="list-news-container">
            <div class="list-news-header">
            </div>
            <div class="list-news-body">
                <div class="list-news-left-container">
                    <div class="list-news-left-top">
                        <h3>
                            TITLE
                        </h3>
                        ${buttonComponent1.element}
                        ${buttonComponent2.element}
                    </div>
                </div>
                <div class="list-news-right-container">
                </div>
            </div>
        </div>
        `,
    }
}

export default ListNewsstand
