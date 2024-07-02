import "./app.css";
import Header from "./components/Header";

function App({ $target }) {
  this.$element = document.createElement("main");
  this.$element.className = "app";
  $target.appendChild(this.$element);

  new Header({ $target: this.$element });
}

export default App;
