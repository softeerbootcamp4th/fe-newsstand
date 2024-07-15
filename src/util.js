export const updateDOMstyle = (DOM, style) => {
  Object.keys(style).forEach((key) => {
    DOM.style[key] = style[key];
  });
};

export const getSubscribeList = () => {
  let JSONData = localStorage.getItem("subscribe-list");
  return JSONData ? JSON.parse(JSONData) : [];
};

export const pushSubscribe = (id) => {
  let subscribeList = getSubscribeList();
  if (!subscribeList.includes(id)) {
    subscribeList = [...subscribeList, id];
    localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
  }
};

export const removeSubscribe = (id) => {
  let subscribeList = getSubscribeList();
  subscribeList = subscribeList.filter(com => com !== id);
  localStorage.setItem("subscribe-list", JSON.stringify(subscribeList));
};