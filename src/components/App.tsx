import { Container } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Main } from './Main/Main'
import { Footer } from './Footer/Footer'
import { Hero } from './Hero/Hero'
import { NavBar } from './NavBar/NavBar'

export interface Result {
  en: string
  et: string[]
}

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
