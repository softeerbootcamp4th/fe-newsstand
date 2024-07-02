import createComponent from './core/component/component.js';
import ToggleTitle from './components/ToggleTitle.js';
import Count from './components/Count.js';
import NewsBox from './components/newsBox.js';

const App = () => {
  const toggleTitleComponent = createComponent(ToggleTitle);
  const countComponent = createComponent(Count);
  const newsBoxCoponent = createComponent(NewsBox, {title:"TEST"});

  return {
    element: `
      <div>
        ${toggleTitleComponent.element}
        ${countComponent.element}
        ${newsBoxCoponent.element}
      </div>
    `,
  };
}

export default App;