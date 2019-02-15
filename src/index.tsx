import '@reach/menu-button/styles.css'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'
import 'fomantic-ui-css/semantic.css'
import './utils/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'

const root = document.querySelector('#root')

ReactDOM.render(<App />, root)
