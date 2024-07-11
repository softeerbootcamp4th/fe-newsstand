import createComponent from './core/component/component.js'
import App from './App.js'

const $app = document.getElementById('app')
const appComponent = createComponent(App, { id: '1' })

$app.innerHTML = appComponent.element
