import { deleteNodeById, generateNode } from "../utils/utils.js";
import { setRightArrow } from "./nav.js";

const myData = [
  {
    media: "언론사1",
    news: [
      "경제 성장률, 기대 이상의 상승",
      "코로나19 백신 접종률, 예상을 웃도는 증가",
      "기후 변화 대응, 세계 각국 공조 모색",
      "디지털 트랜스포메이션 가속화, 기업들 반응",
      "스포츠 이벤트 취소 소식에 팬들 실망",
      "신규 취업자 수, 코로나19 이전 수준 회복",
    ],
  },
  {
    media: "언론사2",
    news: [
      "주식 시장 급락, 투자자들 불안 증가",
      "금리 인상 기대에 부동산 시장 영향",
      "글로벌 무역 갈등 재점화 가능성",
      "기술 기업들의 인공지능 연구 경쟁",
      "산업 혁신을 위한 정부 정책 발표",
      "디지털 화폐 도입, 금융 시스템 변화 예상",
    ],
  },
  {
    media: "언론사9",
    news: [
      "스포츠 이벤트의 최신 결과와 하이라이트",
      "올림픽 및 세계 스포츠 대회의 준비 상황",
      "프로 스포츠 리그의 경기 일정과 팀 분석",
      "연예계의 최신 뉴스와 인기 있는 아티스트 소식",
      "스타들의 SNS 활동과 팬들의 반응",
      "스포츠와 연예 문화의 새로운 트렌드와 현상",
    ],
  },
  {
    media: "언론사11",
    news: [
      "매거진의 최신 호 기사와 특집",
      "전문지의 특허와 기술 혁신 분석",
      "매거진의 주요 시사 포커스와 토론",
      "전문지의 글로벌 경제 전망과 전략",
      "매거진의 새로운 발표와 기업 소식",
      "전문지의 최신 학술 연구 결과 소개",
    ],
  },
  {
    media: "언론사12",
    news: [
      "매거진의 비즈니스와 경영 전략 분석",
      "전문지의 산업별 트렌드와 전망",
      "매거진의 글로벌 시장 분석과 예측",
      "전문지의 과학 기술의 최신 연구 동향",
      "매거진의 문화와 예술 산업 리뷰",
      "전문지의 사회 과학과 인문학의 다양한 주제",
    ],
  },
];

/**
 * 언론사 별 뉴스 목록을 container하위에 생성
 * @param {Node} container
 * @param {Object} content {media: String, news: Array}
 */
function generateMyNewsList(container, content) {
  const list = generateNode("ul", "newsList");

  content.news.slice(0, 6).forEach((category) => {
    const li = generateNode("li");
    li.textContent = category;
    list.appendChild(li);
  });

  createFooterElement(list, content.media);

  container.appendChild(list);
}

/**
 * media 에서 편집한 뉴스임을 알려주는 li 를 container하위에 생성
 * @param {Node} container
 * @param {String} media 언론사
 */
function createFooterElement(container, media) {
  const footer = generateNode("li", "newsList_footer");
  footer.textContent = `${media} 언론사에서 직접 편집한 뉴스입니다.`;
  container.appendChild(footer);
}

/**
 * 바뀐 카테고리에 맞게 newsList 업데이트
 * @param {String} category
 * @param {int} currentCategoryIndex
 * @param {int} currentMediaIndex
 */
export function updateMyNewsList(currentCategoryIndex) {
  const newsListContainer = deleteNodeById("newsList_container");
  const mediaList = myData.map((element) => element.media);

  setMedia(mediaList, currentCategoryIndex);

  setRightArrow(currentCategoryIndex);

  generateMyNewsList(newsListContainer, myData[currentCategoryIndex]);
}

export function getMyDataLength() {
  return myData.length;
}

/**
 * 언론사 목록과 현재 언론사 index를 받아 언론사 이름 출력
 * @param {Array} mediaList
 * @param {int} mediaIndex
 */
function setMedia(mediaList, mediaIndex) {
  const currentMedia = document.querySelector(".media");
  currentMedia.innerHTML = mediaList[mediaIndex];
}
