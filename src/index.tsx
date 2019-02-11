import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'
import './i18n'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'

ReactDOM.render(<App />, document.querySelector('#root'))

serviceWorker.unregister()
