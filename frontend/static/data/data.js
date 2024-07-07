function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const categories = ["종합/경제", "방송/통신", "IT", "스포츠/연애", "매거진/전문지", "지역"];
const mediaCompanies = ["서울경제", "중앙일보", "한겨레", "조선일보", "동아일보", "경향신문", "한국경제", "매일경제", "머니투데이", "파이낸셜뉴스"];
const articleTitles = [
    "또 국민연금의 몽니…현대百 지주사 불발",
    "방시혁 제국이냐 카카오 왕국이냐…K엔터 누가 거머쥘까",
    "사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다",
    "[단독] 원희룡 해외건설 근로자 소득공제 월 500만원으로 상향할 것",
    "태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]",
    "LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다",
    "코로나19 백신 개발의 새로운 도전",
    "비트코인, 사상 최고가 기록 경신",
    "자동차 산업, 전기차로의 대전환 시작",
    "대학생들, 취업난으로 인한 고통 증가",
    "AI 기술, 의료 분야 혁신 이끈다",
    "환경 보호, 이제는 선택이 아닌 필수",
    "여행업계, 코로나 이후 회복세 뚜렷",
    "부동산 시장, 금리 인상에 따른 변화 예상",
    "기후 변화, 글로벌 대응이 필요한 시점"
];

export const NEWS = Array.from({ length: 100 }, () => ({
    "category": getRandomElement(categories),
    "lastDate": "2023.02.10. 18:27",
    "mediaCompanyImageURL": "https://s.pstatic.net/static/newsstand/2019/logo/011.png",
    "name": getRandomElement(mediaCompanies),
    "isSubscribe": false, // 랜덤 구독 여부
    "articles": Array.from({ length: 7 }, () => ({
        "articleTitle": getRandomElement(articleTitles),
        "imageURL": "https://cdn.mediatoday.co.kr/news/photo/202311/313885_438531_4716.jpg",
    }))
}));

