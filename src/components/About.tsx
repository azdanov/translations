import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'
import glosbe from '../images/glosbe.png'
import wordnik from '../images/wordnik.png'
import useTitle from '../hooks/useTitle'

export const About: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  useTitle(`${t('about')} | ${t('translations')}`)

  return (
    <Segment basic>
      <Grid centered>
        <Grid.Column mobile={14} tablet={9} computer={8}>
          <Header as="h1" textAlign="center">
            <Header.Content>{t('about this')}</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={9} computer={8}>
            <p>
              <strong>{t('description')}:</strong> {t('about description')}
            </p>
            <p>
              <strong>{t('disclaimer')}:</strong> {t('about disclaimer')}
            </p>
            <p>
              <strong>{t('for developer')}:</strong>{' '}
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
            <Header as="h2" size="large" textAlign="center">
              <Header.Content>{t('attributions')}</Header.Content>
            </Header>
            <Segment basic textAlign="center">
              <Image
                src={glosbe}
                as="a"
                size="medium"
                rel="noopener noreferrer"
                href="https://glosbe.com/"
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
