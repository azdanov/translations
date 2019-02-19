import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, NavBar, NoMatch } from '.'
import { useLocalStorage } from '../hooks'
import { EN, ET } from '../i18n'
import { Order } from '../types'

export const ORDER_KEY = 'order'

const Main = React.lazy(() => import('./Main'))
const About = React.lazy(() => import('./About'))

export const DEFAULT_ORDER: Order = ['english', 'estonian']

export const App: React.FC = (): JSX.Element => {
  const [defaultOrder] = useLocalStorage<Order>(ORDER_KEY, DEFAULT_ORDER)
  const [order, setOrder] = useLocalStorage<Order>(ORDER_KEY, defaultOrder)

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
