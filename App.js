import "./App.css";
import Header from "./src/components/Header/Header";
import LatestNewsViewer from "./src/components/LatestNewsViewer/LatestNewsViewer";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  new Header({ $target: this.$element });
  new LatestNewsViewer({ $target: this.$element });
}

export default App;
