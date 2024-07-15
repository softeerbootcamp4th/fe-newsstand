export const SnackBar = (props) => {
  let element = document.createElement("div");
  element.className = "snackbar-container";

  function render() {
      const html = `
          <div class="snack-bar">${props.title}</div>
      `;
      element.innerHTML = html;
  }

  function show() {
      document.body.appendChild(element);
      const snackBarElement = element.querySelector('.snack-bar');

      setTimeout(() => {
          snackBarElement.classList.add("show");
      }, 100);

      setTimeout(() => {
          snackBarElement.classList.remove("show");
          snackBarElement.classList.add("hide");
      }, 3100);

      setTimeout(() => {
          document.body.removeChild(element);
          if (props.callback) {
            props.callback();
        }
      }, 3600);
  }

  render();

  return {
      element,
      show
  };
};

export default SnackBar;
