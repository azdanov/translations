import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { NoMatch } from './NoMatch'

const Main = React.lazy(() => import('./Main'))
const About = React.lazy(() => import('./About'))

export const App: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <>
      <Container className="content">
        <Helmet>
          <title>
            {t('home')} | {t('translations')}
          </title>
        </Helmet>
        <Router>
          <>
            <NavBar />
            <React.Suspense fallback={null}>
              <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route path="/about" render={() => <About />} />
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
