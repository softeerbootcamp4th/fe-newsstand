import "./SnackBar.css";

function SnackBar({ $target, position = "beforeend", text, duration = 5000, onSuccess }) {
  this.$element = document.createElement("div");
  this.$element.className = "snackBar";
  this.$element.classList.add("hide");

  $target.insertAdjacentElement(position, this.$element);

  this.render(text);

  this.show = function () {
    this.$element.classList.remove("hide");

    setTimeout(() => {
      this.$element.classList.add("hide");

      if (onSuccess) onSuccess();
    }, duration);
  };
}

SnackBar.prototype.render = function (text) {
  this.$element.innerText = text;
};

export default SnackBar;
