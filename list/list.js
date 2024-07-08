import { deleteNav, generateNav } from "../components/nav.js";
import { generateBanner } from "../components/newsBanner.js";
import { generateNewsList } from "../components/newsList.js";
import { getTodayString } from "../utils/utils.js";
const categoryList = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const myList = ["언론사1", "언론사5", "언론사9", "언론사11", "언론사12"];

const headlineData = [
  {
    media: "언론사1",
    news: [
      "[1보] 경제 성장률, 기대 이상의 상승",
      "[1보] 코로나19 백신 접종률, 예상을 웃도는 증가",
      "[속보] 기후 변화 대응, 세계 각국 공조 모색",
      "[속보] 디지털 트랜스포메이션 가속화, 기업들 반응",
      "[1보] 주식 시장 급락, 투자자들 불안 증가",
    ],
  },
  {
    media: "언론사2",
    news: [
      "[1보] 금리 인상 기대에 부동산 시장 영향",
      "[속보] 글로벌 무역 갈등 재점화 가능성",
      "[속보] 기술 기업들의 인공지능 연구 경쟁",
      "[1보] 5G 네트워크 확장 속도, 소비자 접근성 향상",
      "[1보] 통신사들의 요금 인하 경쟁 가열",
    ],
  },
];

const data = {
  "종합/경제": [
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
  ],
  "방송/통신": [
    {
      media: "언론사3",
      news: [
        "5G 네트워크 확장 속도, 소비자 접근성 향상",
        "통신사들의 요금 인하 경쟁 가열",
        "디지털 방송 시장의 미래 전망",
        "온라인 스트리밍 서비스 인기 급상승",
        "스마트 시티 프로젝트 진행 상황 보고",
        "방송 산업의 다양한 혁신 방향",
      ],
    },
    {
      media: "언론사4",
      news: [
        "새로운 방송 규제로 인한 업계 변화",
        "5G 기술의 새로운 활용 사례",
        "통신망 보안 문제와 해결 방안",
        "디지털 미디어 플랫폼의 글로벌 확장",
        "통신사들의 인공지능 기술 적용 도입",
        "방송과 통신의 융합이 가져오는 새로운 비즈니스 모델",
      ],
    },
  ],
  IT: [
    {
      media: "언론사5",
      news: [
        "클라우드 기술의 혁신과 비즈니스 적용",
        "사물인터넷 기술의 새로운 시장 동향",
        "빅데이터 분석 도구의 최신 발전",
        "인공지능 기술의 새로운 적용 분야",
        "소셜 미디어 플랫폼의 개인 정보 보호 문제",
        "사이버 보안 위협에 대한 글로벌 대응 전략",
      ],
    },
    {
      media: "언론사6",
      news: [
        "최신 모바일 애플리케이션 개발 동향",
        "IT 기술이 변화시키는 전통 산업의 혁신",
        "인공지능 스타트업의 성장과 과제",
        "블록체인 기술의 잠재적인 금융 적용",
        "클라우드 플랫폼의 데이터 보안 및 규제 문제",
        "디지털 트랜스포메이션을 위한 기업의 IT 전략",
      ],
    },
  ],
  영자지: [
    {
      media: "언론사7",
      news: [
        "글로벌 경제 전망과 리스크 요인",
        "국제 금융 시장의 변동성 분석",
        "세계 각국의 통화 정책 비교",
        "국제 무역 협상과 무역 장벽 해소 방안",
        "세계 주요 경제 지표 분석",
        "글로벌 금융 시스템의 새로운 동향과 전망",
      ],
    },
    {
      media: "언론사8",
      news: [
        "국제 정치의 핵심 이슈와 동향 분석",
        "국제 갈등 해결을 위한 외교 전략",
        "세계 각국의 정치 지도자들의 최신 발언",
        "세계 각국의 사회 문제와 정책 대응",
        "글로벌 미디어와 언론 자유의 현황과 도전 과제",
        "세계 각국의 문화와 역사적 배경 분석",
      ],
    },
  ],
  "스포츠/연예": [
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
      media: "언론사10",
      news: [
        "스포츠 스타들의 인터뷰와 생각",
        "연예계의 신규 인재 발굴과 성장",
        "스포츠 팀과 선수의 훈련과 준비 과정",
        "인기 TV 프로그램과 방송 일정 소개",
        "연예계의 새로운 상업 광고와 협찬 소식",
        "스포츠와 연예계의 중요한 인물들의 이야기",
      ],
    },
  ],
  "매거진/전문지": [
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
  ],
  지역: [
    {
      media: "언론사13",
      news: [
        "지역 사회 이슈와 시민들의 의견",
        "지역 경제 발전 계획과 현황",
        "지역 문화 행사와 축제 소식",
        "지역 환경 보호 활동과 정책",
        "지역 교육 시스템의 개선 방안",
        "지역 사회 복지 프로그램 소개",
      ],
    },
    {
      media: "언론사14",
      news: [
        "지역 정치 지도자들의 정책 발표",
        "지역 주요 산업의 동향과 변화",
        "지역 주택 시장 분석과 예측",
        "지역 건강 및 복지 서비스 현황",
        "지역 환경 보호 운동과 활동가들의 이야기",
        "지역 문화유산과 관광 산업의 발전 방안",
      ],
    },
  ],
};

//요소 생성
const bannerContainer = document.getElementById("banner_container");
const navContainer = document.getElementById("nav_container");
generateNav(navContainer, categoryList);
generateBanner(bannerContainer, headlineData[0]);
generateBanner(bannerContainer, headlineData[1]);

//각 배너는 time delay를 가지고 롤링
function rollingCallback(time) {
  const prevElements = bannerContainer.querySelectorAll(".prev");
  prevElements.forEach((prev, index) => {
    setTimeout(() => {
      prev.classList.remove("prev");
    }, index * time);
  });

  const currentElements = bannerContainer.querySelectorAll(".current");
  currentElements.forEach((current, index) => {
    setTimeout(() => {
      current.classList.remove("current");
      current.classList.add("prev");
    }, index * time);
  });

  const nextElements = bannerContainer.querySelectorAll(".next");
  nextElements.forEach((next, index) => {
    setTimeout(() => {
      next.classList.remove("next");
      next.classList.add("current");

      let nextNext = next.nextElementSibling;
      if (!nextNext) {
        nextNext = next.parentElement.firstElementChild;
      }
      nextNext.classList.add("next");
    }, index * time);
  });
}

const today = document.querySelector(".today");
const headerCategory = document.querySelectorAll(".headerCategory");
const headerShow = document.querySelectorAll(".headerShow");
const newsListContainer = document.getElementById("newsList_container");
const categoryElements = document.querySelectorAll(".contentList li");
const currentMedia = document.querySelector(".media");
const progresses = document.querySelectorAll(".progress");

let selectedHeaderCategoryIndex = 0;
let selectedCategoryIndex = 0;
let currentMediaIndex = 0;

// nav 진행도 표시
function setProgress(categoryIndex, index) {
  progresses[categoryIndex].innerHTML = `${index + 1}/${
    data[categoryList[categoryIndex]].length
  }`;
}

// 뉴스 리스트 업데이트, 카테고리와 언론사 index를 매개변수로 사용
function updateNewsList(category, mediaIndex) {
  newsListContainer.innerHTML = "";

  const mediaList = data[category];
  setProgress(selectedCategoryIndex, mediaIndex);

  generateNewsList(newsListContainer, mediaList[mediaIndex]);
  currentMedia.innerHTML = mediaList[mediaIndex].media;
}

// 카테고리 변경 업데이트
function updateCategory(category) {
  currentMediaIndex = 0;
  updateNewsList(category, currentMediaIndex);
}

//왜 전역변수로 설정해야 작동하는가??
var intervalId;
// 20초 마다 언론사 넘김
function startInterval() {
  intervalId = setInterval(() => {
    currentMediaIndex++;
    if (currentMediaIndex >= data[categoryList[selectedCategoryIndex]].length) {
      selectedCategoryIndex = (selectedCategoryIndex + 1) % categoryList.length;
      categoryElements.forEach((element, index) => {
        if (index === selectedCategoryIndex) {
          element.classList.add("selected");
        } else {
          element.classList.remove("selected");
        }
      });
      updateCategory(categoryList[selectedCategoryIndex]);
      currentMediaIndex = 0;
    } else {
      updateNewsList(categoryList[selectedCategoryIndex], currentMediaIndex);
    }
  }, 20000);
}
setInterval(() => rollingCallback(1000), 5000);

// 초기화 함수
function initialize() {
  //header 초기화
  today.innerHTML = getTodayString();
  //header_selected 초기화
  headerCategory[0].classList.add("selected");
  headerShow[0].classList.add("selected");
  headerCategory.forEach((element, index) => {
    element.addEventListener("click", () => {
      headerCategory[selectedHeaderCategoryIndex].classList.remove("selected");
      element.classList.add("selected");

      selectedHeaderCategoryIndex = index;

      //nav 삭제후 재생성
      deleteNav();
      if (selectedHeaderCategoryIndex === 0)
        generateNav(navContainer, categoryList);
      else if (selectedHeaderCategoryIndex === 1)
        generateNav(navContainer, myList);
    });
  });

  //nav, newsList 초기화
  categoryElements[selectedCategoryIndex].classList.add("selected");
  currentMedia.innerHTML = data[categoryList[0]][0].media;
  updateNewsList(categoryList[selectedCategoryIndex], currentMediaIndex);

  // nav 카테고리 선택 시 클릭 이벤트 정의
  categoryElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      categoryElements[selectedCategoryIndex].classList.remove("selected");
      element.classList.add("selected");

      selectedCategoryIndex = index;
      updateCategory(categoryList[index]);

      clearInterval(intervalId);
      startInterval();
    });
  });
}

// 초기화
initialize();
startInterval();
