import "./App.css";
import Header from "@/components/layout/Header/Header";
import AutoRollingNews from "@/components/AutoRollingNews/AutoRollingNews";
import NewsList from "@/components/NewsList/NewsList";
import ThemeToggleButton from "./components/layout/ThemeToggleButton/ThemeToggleButton";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  this.checkSystemTheme();

  new Header({ $target: this.$element });
  new AutoRollingNews({ $target: this.$element });
  new NewsList({ $target: this.$element });
  new ThemeToggleButton({ $target: this.$element });
}

App.prototype.checkSystemTheme = function () {
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
