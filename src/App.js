import "./App.css";
import Header from "@/components/common/Header/Header";
import AutoRollingNews from "@/components/AutoRollingNews/AutoRollingNews";
import NewsList from "@/components/NewsList/NewsList";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  new Header({ $target: this.$element });
  new AutoRollingNews({ $target: this.$element });
  new NewsList({ $target: this.$element });
}

export default App;
