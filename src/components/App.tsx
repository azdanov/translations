import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, NavBar, NoMatch } from '.'
import { DEFAULT_ORDER, EN, ET, ORDER_KEY } from '../constants'
import { useLocalStorage } from '../hooks'
import { Order } from '../contracts'

const Main = React.lazy(() => import('./Main/Main'))
const About = React.lazy(() => import('./About'))

export const App: React.FC = (): JSX.Element => {
  const [defaultOrder] = useLocalStorage<Order>(ORDER_KEY, DEFAULT_ORDER)
  const [order, setOrder] = useLocalStorage<Order>(ORDER_KEY, defaultOrder)

  return (
    <>
      <div className="backdrop" />
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
