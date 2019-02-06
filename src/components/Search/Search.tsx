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
      <Grid centered columns={3}>
        <Grid.Column>
          <form onSubmit={handleSubmit}>
            <Input
              fluid
              value={term}
              icon={{
                name: 'search',
                circular: true,
                link: true,
                'aria-label': t('find'),
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
