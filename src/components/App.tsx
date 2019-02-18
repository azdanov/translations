import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import { EN, ET } from '../i18n'
import { Order } from '../types/Languages'
import Footer from './Footer'
import { orderKey } from './Main'
import NavBar from './NavBar'
import NoMatch from './NoMatch'

const Main = React.lazy(() => import('./Main'))
const About = React.lazy(() => import('./About'))

export const DEFAULT_ORDER: Order = ['english', 'estonian']

export const App: React.FC = (): JSX.Element => {
  const [defaultOrder] = useLocalStorage<Order>(orderKey, DEFAULT_ORDER)
  const [order, setOrder] = useLocalStorage<Order>(orderKey, defaultOrder)

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '205px',
          position: 'absolute',
          background: 'white',
        }}
      />
      <div className="ui container content">
        <Router>
          <>
            <Route render={props => <NavBar {...props} order={order} />} />
            <React.Suspense fallback={null}>
              <Switch>
                <Route path="/about" render={() => <About />} />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Main {...props} order={order} setOrder={setOrder} />
                  )}
                />
                <Route
                  path={`/:from(${EN}|${ET})/:to(${EN}|${ET})/:word?`}
                  render={props => (
                    <Main {...props} order={order} setOrder={setOrder} />
                  )}
                />
                <Route component={NoMatch} />
              </Switch>
            </React.Suspense>
          </>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
