import Button, { ButtonVariantProps } from '../components/base/Button.js'
import { Icon } from '../components/base/IconView.js'
import createComponent from '../core/component/component.js'
import ImageView from '../components/base/ImageView.js'
import { generateRandomId } from '../utils/idGenerator.js'

const ListNewsstand = () => {
    const buttonComponent = createComponent(Button, {
        id: generateRandomId(10),
        icon: Icon.PLUS,
        text: '구독하기',
        style: 'height:10px;',
        variant: ButtonVariantProps.WHITE,
    })

    const ImageComponent = createComponent(ImageView, {
        id: generateRandomId(10),
        src: 'https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202407/03/ned/20240703103837967unkh.jpg',
        style: 'width: 100%; height:100%',
    })

    return {
        element: `
        <div class="list-news-container">
            <ul class="list-news-header">
                <li>
                    종합/경제
                </li>
                <li>
                    방송/통신
                </li>
                <li>
                    IT
                </li>
                <li>
                    영자지
                </li>
                <li>
                    스포츠/연예
                </li>
                <li>
                    매거진/전문지
                </li>
                <li>
                    지역
                </li>
            </ul>
            <div class="list-news-body">
                <div class="list-news-left-container">
                    <div class="list-news-left-top">
                        <h5>
                            ICON
                        </h5>
                        <h5>
                            2023.02.10. 18:27 편집
                        </h5>
                        ${buttonComponent.element}
                    </div>
                    <div class="list-news-left-body">
                        ${ImageComponent.element}
                    </div>
                    <div class="list-news-left-bottom">
                        <h4>
                            봇물처럼 터지는 공공요금 인상…꼭 지금이어야 하나
                        </h4>
                    </div>
                </div>
                <div class="list-news-right-container">
                    <a>
                        "위스키 사려고 이틀 전부터 줄 섰어요"
                    </a>
                    <a>
                        '방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까
                    </a>
                    <a>
                        사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다
                    </a>
                    <a>
                        [단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"
                    </a>
                    <a>
                        태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]
                    </a>
                    <a>
                        LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”
                    </a>
                </div>
            </div>
        </div>
        `,
    }
}

export default ListNewsstand
