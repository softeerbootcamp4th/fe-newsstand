export const Alert = ({ pressName, handleOkButtonClick }) => {
  const alertElement = document.createElement('div');
  alertElement.className = 'alert-container';

  const render = () => {
      alertElement.innerHTML = `
          <div class="alert-content">
              <div class="alert-text">
                  <span><span class="display-medium16">${pressName}</span>을(를)</span>
                  <span>구독 해지하시겠습니까?</span>
              </div>
              <div class="alert-button">
                  <button class="alert-left-button">예, 해지합니다</button>
                  <button class="alert-right-button">아니오</button>
              </div>
          </div>
      `;

      const leftButton = alertElement.querySelector('.alert-left-button');
      leftButton.addEventListener('click', () => {
          handleOkButtonClick();
          hideAlert();
      });

      const rightButton = alertElement.querySelector('.alert-right-button');
      rightButton.addEventListener('click', hideAlert);
  };

  const hideAlert = () => {
      document.body.removeChild(alertElement);
  };

  const showAlert = () => {
      document.body.appendChild(alertElement);
  };

  render();

  return {
      element: alertElement,
      show: showAlert
  };
};

export default Alert;