const stateManager = (() => {
    let state = {
      pressIndex: 0,
      pageIndex: 0,
    };
  
    return {
      getPressIndex: () => state.pressIndex,
      setPressIndex: (index) => { state.pressIndex = index; },
  
      getPageIndex: () => state.pageIndex,
      setPageIndex: (index) => { state.pageIndex = index; },
    };
})(); //객체 선언 - 즉시 사용 가능
  
export default stateManager;
  