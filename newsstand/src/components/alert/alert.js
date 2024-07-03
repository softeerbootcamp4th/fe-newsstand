export const Alert = () => {

    return {
        element: `
            <div class ="alert">
      <div>
        <div class="alert-text">
            <span><span class="display-medium16" id ="pressName">언론사명</span> 을(를)</span>
            <span>구독해지하시겠습니까?</span>
        </div>
        <div class="alert-button">
          <button class="alert-left-button"> 예, 해지합니다 </button>
          <button class="alert-right-button"> 아니오 </button>
        </div>
      </div>
    </div>
      `
      };
}

export default Alert;
