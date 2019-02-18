import '@reach/menu-button/styles.css'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import 'fomantic-ui-css/semantic.css'
import React from 'react'
import { render } from 'react-dom'
import { ServiceWorkerMessage } from '../components'
import '../i18n'
import '../index.css'
import { register } from './serviceWorker'

const worker = document.querySelector('#worker') as Element

register({
  onSuccess: () => {
    render(<ServiceWorkerMessage />, worker)
  },
  onUpdate: reg => {
    render(<ServiceWorkerMessage update register={reg} />, worker)
  },
})
