import "./SnackBar.css";

function SnackBar({ $target, position = "beforeend" }) {
  this.$element = document.createElement("div");
  this.$element.className = "snackBar";
  this.$element.classList.add("hide");

  $target.insertAdjacentElement(position, this.$element);

  this.show = function ({ text, duration = 2000 }) {
    this.render(text);

    this.$element.classList.remove("hide");

    setTimeout(() => {
      this.$element.classList.add("hide");
    }, duration);
  };
}

SnackBar.prototype.render = function (text) {
  this.$element.innerText = text;
};

export default SnackBar;
