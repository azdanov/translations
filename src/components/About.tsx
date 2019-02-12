import React from 'react'
import Helmet from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'
import eki from '../images/eki.jpg'
import wordnik from '../images/wordnik.png'

export const About: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  return (
    <Segment basic>
      <Helmet>
        <title>
          {t('about')} | {t('translations')}
        </title>
      </Helmet>
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Header as="h1" textAlign="center">
            <Header.Content>{t('about this')}</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <p>{t('about description')}</p>
            <p>
              {t('for developer')}:{' '}
              <a
                href="https://github.com/azdanov/translations"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <Header as="h2" size="medium" textAlign="center">
              <Header.Content>{t('attributions')}</Header.Content>
            </Header>
            <Segment basic textAlign="center">
              <Image
                src={eki}
                as="a"
                size="medium"
                rel="noopener noreferrer"
                href="http://portaal.eki.ee/"
                target="_blank"
              />
              <Divider hidden />
              <Image
                src={wordnik}
                as="a"
                size="medium"
                rel="noopener noreferrer"
                href="https://www.wordnik.com/"
                target="_blank"
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default About
