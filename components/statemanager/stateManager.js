const stateManager = (() => {
    let state = {
      pressIndex: 0,
      pageIndex: 0,
    };
    let clickedNews = "";
    //모든 기사
    let allNews = [];
    let Pages = [];
    
    return {
      getPressIndex: () => state.pressIndex,
      setPressIndex: (index) => { state.pressIndex = index; },
  
      getPageIndex: () => state.pageIndex,
      setPageIndex: (index) => { state.pageIndex = index; },

      getClickedNews: () => clickedNews,
      setClickedNews: (news) => { clickedNews = news; },

      getAllNews: () => [...allNews], 
      setAllNews: (newsArray) => { allNews = [...newsArray]; },  

      getPages: () => [...Pages], 
      setPages: (pages) => { Pages = [...pages]; },  

    };
})(); //객체 선언 - 즉시 사용 가능
  
export default stateManager;