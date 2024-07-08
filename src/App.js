import "./App.css";
import Header from "@/components/Header/Header";
import AutoRollingNews from "@/components/AutoRollingNews/AutoRollingNews";
import NewsList from "@/components/NewsList/NewsList";
import breakingNews from "@/mocks/data/breakingNews.json";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  new Header({ $target: this.$element });
  new AutoRollingNews({ $target: this.$element, news: breakingNews });
  new NewsList({ $target: this.$element });
}

export default App;