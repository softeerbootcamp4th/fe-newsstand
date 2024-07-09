export let menuInfo;
export let menuCurrentPage = 1;
export let menuLastPage = 0;
export let menuIdx = 0;
export let categoryTimeoutId;
export let nowDate = new Date();
export let nowDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][nowDate.getDay()]
export let dateText = `${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}.${nowDay}`
export let leftRollingId;
export let rightRollingId;
export let isMediaWhole = true;
export let isGrid = false;

export const newsState = {
    setMenuInfo: (info) => { menuInfo = info },
    setMenuCurrentPage: (page) => { menuCurrentPage = page },
    setMenuLastPage: (page) => { menuLastPage = page },
    setMenuIdx: (idx) => { menuIdx = idx },
    setCategoryTimeoutId: (id) => { categoryTimeoutId = id },
    setleftRollingId: (id) => { leftRollingId = id },
    setRightRollingId: (id) => { rightRollingId = id },
    setIsMediaWhole: (bool) => { isMediaWhole = bool },
    setIsGrid: (bool) => { isGrid = bool },
};