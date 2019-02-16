import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
import NoMatch from './NoMatch'

const Main = React.lazy(() => import('./Main'))
const About = React.lazy(() => import('./About'))

export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '200px',
          position: 'absolute',
          background: 'white',
        }}
      />
      <div className="ui container content">
        <Router>
          <>
            <NavBar />
            <React.Suspense fallback={null}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => /* TODO: react-router-dom 4.4+ */ <Main />}
                />
                <Route
                  path="/about"
                  render={() => /* TODO: react-router-dom 4.4+ */ <About />}
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
