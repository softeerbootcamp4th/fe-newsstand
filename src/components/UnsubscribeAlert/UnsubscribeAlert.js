import "./UnsubscribeAlert.css";

function UnsubscribeAlert({ $target, position = "beforeend", onConfirm }) {
  this.$element = document.createElement("dialog");
  this.$element.classList.add("alert");
  this.$element.classList.add("hide");

  $target.insertAdjacentElement(position, this.$element);

  this.props = { onConfirm };

  this.handleClick = function (event) {
    const button = event.target.closest("button");

    if (button) {
      const { id } = button;

      if (id === "confirmButton") {
        this.props.onConfirm();
        this.close();

        return;
      }

      if (id === "cancelButton") {
        this.close();

        return;
      }
    }
  };

  // this.render(company);

  this.$element.addEventListener("click", this.handleClick.bind(this));
}

UnsubscribeAlert.prototype.show = function (company) {
  this.render(company);
  this.$element.classList.remove("hide");
};

UnsubscribeAlert.prototype.close = function () {
  this.$element.classList.add("hide");
};

UnsubscribeAlert.prototype.setOnConfirm = function (onConfirm) {
  this.props = { onConfirm };
};

UnsubscribeAlert.prototype.render = function (company) {
  this.$element.innerHTML = /* html */ `
    <section class="textSection">
      <p><span class="bold">${company}</span>을(를)</p>
      <span>구독해지하시겠습니까?</span>
    </section>
    
    <section class="buttonSection">
      <button id="confirmButton" class="primary">예, 해지합니다</button>
      <button id="cancelButton" class="secondary">아니오</button>
    </section> 
  `;
};

export default UnsubscribeAlert;
