import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'semantic-ui-react'

interface Props {
  loading: boolean
  search: string
  setSearch: (search: string) => void
}

export const Search: React.FC<Props> = ({
  loading,
  search,
  setSearch,
}): JSX.Element => {
  const [term, setTerm] = useState(search)
  const [t] = useTranslation()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const word = event.currentTarget.value
    setTerm(word)
  }

  const handleClick = (event: SyntheticEvent<HTMLInputElement, MouseEvent>): void => {
    event.preventDefault()
    handleSetSearch(term)
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    handleSetSearch(term)
  }

  const handleSetSearch = (word: string): void => {
    setSearch(word)
  }

  return (
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
          'data-testid': 'search-action',
        }}
        onChange={handleChange}
        placeholder={`${t('search')} …`}
      />
    </form>
  )
}

export default Search
