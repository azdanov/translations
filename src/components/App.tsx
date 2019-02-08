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
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="https://translations.netlify.com/" />
          <meta name="twitter:title" content="Translations" />
          <meta
            name="twitter:description"
            content="English - Estonian dictionary made in React with help of the Netlify Functions."
          />
          <meta name="twitter:image" content="/android-chrome-512x512.png" />
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
