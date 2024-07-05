import "./Alert.css";

function Alert({ $target, position = "beforeend", text }) {
  this.$element = document.createElement("dialog");
  this.$element.className = "alert";

  $target.insertAdjacentElement(position, this.$element);

  this.render(text);
}

Alert.prototype.render = function (text) {
  this.$element.innerHTML = /* html */ `
    <section class="textSection">${text}</section>

    <section class="buttonSection">
      <button class="primary">예, 해지합니다</button>
      <button class="secondary">아니오</button>
    </section> 
  `;
};

export default Alert;
