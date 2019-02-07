import React from 'react'
import { Container } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Search } from './Search/Search'
import { Hero } from './Hero/Hero'
import { NavBar } from './NavBar/NavBar'
import { Footer } from './Footer/Footer'

const App: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  return (
    <Container>
      <Helmet>
        <title>{t('translations')}</title>
      </Helmet>
      <NavBar />
      <Hero />
      <Search />
      <Footer />
    </Container>
  )
}

export default App
