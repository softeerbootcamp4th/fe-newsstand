const subscribeManager = (() => {
  let subscribedData = [];
  return {
    getSubscribedData: () => [...subscribedData],
    setSubscribedData: (data) => { subscribedData = [...data]; },
    addNews: (newsItem) => { subscribedData.push(newsItem); },  // 배열에 뉴스 항목 추가
    removeNews: (newsItem) => { subscribedData = subscribeManager.filter(item => item !== newsItem); }
  };
})();

export default subscribeManager;

  