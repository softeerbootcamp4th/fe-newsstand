import "./App.css";
import Header from "@/components/Header/Header";
import LatestNewsViewer from "@/components/LatestNewsViewer/LatestNewsViewer";
import NewsList from "@/components/NewsList/NewsList";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  new Header({ $target: this.$element });
  new LatestNewsViewer({ $target: this.$element });
  new NewsList({ $target: this.$element });
}

export default App;
