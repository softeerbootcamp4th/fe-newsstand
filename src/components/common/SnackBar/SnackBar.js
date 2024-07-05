import "./SnackBar.css";

function SnackBar({ $target, position = "beforeend", text, duration = 5000, onSuccess }) {
  this.$element = document.createElement("div");
  this.$element.className = "snackBar";
  this.$element.classList.add("hide");

  $target.insertAdjacentElement(position, this.$element);

  this.render(text, duration, onSuccess);
}

SnackBar.prototype.render = function (text, duration = 5000, onSuccess) {
  this.$element.innerText = text;
  this.$element.classList.remove("hide");

  setTimeout(() => {
    this.$element.classList.add("hide");

    if (onSuccess) onSuccess();
  }, duration);
};

export default SnackBar;
