import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import { Grid, Input, Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

export const Search: React.FC = (): JSX.Element => {
  const [term, changeTerm] = useState('')
  const [t] = useTranslation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    changeTerm(event.currentTarget.value)
  }

  const handleClick = (event: SyntheticEvent<HTMLInputElement, MouseEvent>): void => {
    event.preventDefault()
    translate(term)
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    translate(term)
  }

  // TODO: Extract
  const translate = (word: string): void => {
    console.log(word)
  }

  return (
    <Segment basic>
      <Grid centered>
        <Grid.Column
          textAlign="center"
          mobile={14}
          tablet={9}
          computer={7}
          widescreen={5}
        >
          <form onSubmit={handleSubmit}>
            <Input
              fluid
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
              placeholder={`${t('search')} ...`}
            />
          </form>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
