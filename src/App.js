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

  this.components = {
    Header: new Header({ $target: this.$element }),
    AutoRollingNews: new AutoRollingNews({ $target: this.$element }),
    NewsList: new NewsList({ $target: this.$element }),
  };

  this.components.ThemeToggleButton = new ThemeToggleButton({
    $target: this.$element,
    onChangeTheme: this.components.NewsList.render.bind(this.components.NewsList),
  });
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
