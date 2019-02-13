import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import 'fomantic-ui-css/semantic.css';
import { App } from './components/App'
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
  onUpdate: register => {
    ReactDOM.render(<ServiceWorkerMessage update register={register} />, worker)
  },
})
