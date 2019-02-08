import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import { Input, Container } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

export const Search: React.FC<{ loading: boolean }> = ({ loading }): JSX.Element => {
  const [term, changeTerm] = useState('')
  const [t] = useTranslation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    changeTerm(event.currentTarget.value)
  }

  const handleClick = (event: SyntheticEvent<HTMLInputElement, MouseEvent>): void => {
    event.preventDefault()

    if (loading) {
      return
    }

    translate(term)
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (loading) {
      return
    }

    translate(term)
  }

  // TODO: Extract
  const translate = (word: string): void => {
    console.log(word)
  }

  return (
    <Container fluid>
      <form onSubmit={handleSubmit}>
        <Input
          fluid
          loading={loading}
          size="large"
          value={term}
          icon={{
            name: 'search',
            circular: true,
            link: true,
            'aria-hidden': 'true',
            onClick: handleClick,
          }}
          onChange={handleChange}
          placeholder={`${t('search')} …`}
        />
      </form>
    </Container>
  )
}
