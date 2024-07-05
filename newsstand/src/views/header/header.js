export const Header = () => {
  let element = document.createElement("div");
  element.className = "header-container";
  
  function getDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const dayOfWeek = daysOfWeek[currentDate.getDay()]; // 0부터 일요일

    return `${year}. ${month}. ${day}. ${dayOfWeek}`;
  }

  function render() {
    const html = `
        <div class="logo-container">
            <img src="../../assets/icons/newspaper.svg" alt="newspaper icon">
            <span class="logo-label">뉴스스탠드</span>
        </div>
        <div class="day-label">${getDate()}</div>
    `;

    element.innerHTML = html;
  }

  render();

  return {
    element,
  };
};

export default Header;
