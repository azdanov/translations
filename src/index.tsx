import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'
import './i18n'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

ReactDOM.render(<App />, document.querySelector('#root'))

// @see https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
