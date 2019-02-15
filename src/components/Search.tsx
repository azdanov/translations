import React, {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  SyntheticEvent,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  loading: boolean
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchEl: MutableRefObject<HTMLInputElement | null>
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

  const handleClick = (event: SyntheticEvent<HTMLElement, MouseEvent>): void => {
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
      <div className={`ui large fluid icon input${loading ? ' loading' : ''}`}>
        <input
          ref={searchEl}
          aria-label={t('search')}
          placeholder={`${t('search')} …`}
          type="text"
          value={term}
          onChange={handleChange}
        />
        <i
          data-testid="search-action"
          aria-hidden="true"
          className="search circular link icon"
          onClick={handleClick}
        />
      </div>
    </form>
  )
}

export default Search
