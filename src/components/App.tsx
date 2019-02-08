import { Container, Grid, Segment } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { Footer } from './Footer/Footer'
import { Hero } from './Hero/Hero'
import { NavBar } from './NavBar/NavBar'
import { Results } from './Results/Results'
import { Search } from './Search/Search'

export interface Result {
  en: string
  et: string[]
}

const App: React.FC = (): JSX.Element => {
  const [loading] = useState(false)
  const [t] = useTranslation()

  return (
    <>
      <Container className="content">
        <Helmet>
          <title>{t('translations')}</title>
        </Helmet>
        <NavBar />
        <Hero />
        <Segment basic>
          <Grid centered>
            <Grid.Column mobile={14} tablet={9} computer={8}>
              <Search loading={loading} />
            </Grid.Column>
            <Grid.Row>
              <Grid.Column mobile={14} tablet={9} computer={8}>
                <Results loading={loading} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Footer className="footer" />
    </>
  )
}

export default App
