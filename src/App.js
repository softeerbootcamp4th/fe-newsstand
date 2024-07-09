import "./App.css";
import Header from "@/components/layout/Header/Header";
import AutoRollingNews from "@/components/AutoRollingNews/AutoRollingNews";
import NewsList from "@/components/NewsList/NewsList";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  this.checkTheme();

  new Header({ $target: this.$element });
  new AutoRollingNews({ $target: this.$element });
  new NewsList({ $target: this.$element });
}

App.prototype.checkTheme = function () {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    window.document.body.classList.add("dark");
  }

  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQueryList.addEventListener("change", (e) => {
    if (e.matches) {
      window.document.body.classList.add("dark");
    } else {
      window.document.body.classList.remove("dark");
    }
  });
};

export default App;
