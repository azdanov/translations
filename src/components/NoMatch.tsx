import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment } from 'semantic-ui-react'

export const NoMatch: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <Segment basic>
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              404 <Header.Subheader>{t('not found')}</Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <p>
              {t('not found description')}
              <Link href="/" to="/">
                {t('home')}
              </Link>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default NoMatch
