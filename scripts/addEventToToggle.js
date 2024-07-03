export function addEventToToggle(toggleState) {
    let leftToggleDom = document.querySelector("#toggle_left");
    let rightToggleDom =document.querySelector("#toggle_right");
    leftToggleDom.addEventListener("click",function() {
        toggleState.toggleName="left";
        document.querySelector("#toggle_left").classList.add('toggle_item_active');
        document.querySelector("#toggle_right").classList.remove('toggle_item_active');
    });
    rightToggleDom.addEventListener("click",function() {
        toggleState.toggleName="right";
        document.querySelector("#toggle_right").classList.add('toggle_item_active');
        document.querySelector("#toggle_left").classList.remove('toggle_item_active');
    });

    let toggleDataList = [
        {
            title: "1번 제목",
            companies: [
                {
                    name: "1번 회사",
                    articles: new Array(6).fill(0).map((_,index)=>{
                        return {
                            title: `${index} 번 기사`,
                            image: "특정 기사 이미지"
                        }
                    }),
                    isSubscribed: false
                }
            ]
        }
    ];

    

    function generateTapList() {
        let tap = document.querySelector(".news_detail_tap_box");
        tap.innerHTML = "";
        toggleDataList.forEach(articleObject => {
            const tapItem = document.createElement('div');
            tapItem.classList.add('news_detail_tap_item'); // 클래스 추가
            tapItem.textContent = articleObject.title;
            tap.appendChild(tapItem);  
        });
    }

    function handleToggle() {
        //탭 클릭시 핸들해줘야함
    } 

    generateTapList();


}