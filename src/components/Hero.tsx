import Hidden from '@reach/visually-hidden'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Header, Icon } from 'semantic-ui-react'

export const Hero: React.FC = (): JSX.Element => {
  const [t] = useTranslation()
  const [[first, second], setOrder] = useState(['english', 'estonian'])

  return (
    <>
      <Header as="h1" textAlign="center" className="hero">
        <Header.Content>
          <span>{t(first)}</span> - <span>{t(second)}</span>
          <Header.Subheader>
            {t('dictionary')}
            <Button
              icon
              className="tertiary"
              onClick={() => {
                setOrder([second, first])
              }}
            >
              <Hidden>{t('change direction')}</Hidden>
              <Icon name="exchange" />
            </Button>
          </Header.Subheader>
        </Header.Content>
      </Header>
    </>
  )
}

export default Hero
