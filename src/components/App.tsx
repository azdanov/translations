import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Loader } from 'semantic-ui-react'
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
            <React.Suspense fallback={<Loader active inline="centered" />}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/about" component={About} />
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
