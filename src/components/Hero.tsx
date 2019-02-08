import React from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from 'semantic-ui-react'

export const Hero: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <Header as="h1" textAlign="center">
      <Header.Content>
        {t('languages')}
        <Header.Subheader>{t('dictionary')}</Header.Subheader>
      </Header.Content>
    </Header>
  )
}
