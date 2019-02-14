import Hidden from '@reach/visually-hidden'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Header, Icon } from 'semantic-ui-react'
import Article from '../types/Article'
import { Order } from '../types/Languages'

interface Props {
  order: Order
  setOrder: (value: Order) => void
  setResults: React.Dispatch<React.SetStateAction<Article[]>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Hero: React.FC<Props> = ({
  order: [first, second],
  setOrder,
  setResults,
  setSearch,
}): JSX.Element => {
  const [t] = useTranslation()

  return (
    <Header as="h1" textAlign="center" className="hero">
      <Header.Content>
        <span>{t(first)}</span> - <span>{t(second)}</span>
        <Header.Subheader>
          {t('dictionary')}
          <Button
            icon
            className="tertiary"
            onClick={() => {
              setOrder([second, first] as Order)
              setResults([])
              setSearch('')
            }}
          >
            <Hidden>{t('change direction')}</Hidden>
            <Icon name="exchange" />
          </Button>
        </Header.Subheader>
      </Header.Content>
    </Header>
  )
}

export default Hero
