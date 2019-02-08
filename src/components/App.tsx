import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Container } from 'semantic-ui-react'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Main } from './Main'
import { NavBar } from './NavBar'

const App: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <>
      <Container className="content">
        <Helmet>
          <title>{t('translations')}</title>
        </Helmet>
        <NavBar />
        <Hero />
        <Main />
      </Container>
      <Footer className="footer" />
    </>
  )
}

export default App
