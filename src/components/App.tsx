import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { NoMatch } from './NoMatch'
import { GlobalStyle } from './GlobalStyle'

const Main = React.lazy(() => import('./Main'))
const About = React.lazy(() => import('./About'))

export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Container className="content">
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
      </Container>
      <Footer className="footer" />
    </>
  )
}

export default App
