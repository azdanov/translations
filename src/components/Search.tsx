import React, {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  SyntheticEvent,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'semantic-ui-react'

interface Props {
  loading: boolean
  search: string
  setSearch: (search: string) => void
  searchEl: MutableRefObject<Input | null>
}

export const Search: React.FC<Props> = ({
  loading,
  search,
  setSearch,
  searchEl,
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
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        fluid
        ref={searchEl}
        loading={loading}
        size="large"
        value={term}
        aria-label={t('search')}
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
