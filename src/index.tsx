import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'
import { ServiceWorkerMessage } from './components/ServiceWorkerMessage'
import './i18n'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'

const root = document.querySelector('#root')
const worker = document.querySelector('#worker') as Element

ReactDOM.render(<App />, root)

serviceWorker.register({
  onSuccess: () => {
    ReactDOM.render(<ServiceWorkerMessage />, worker)
  },
})
