import lscache from 'lscache'
import React, {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { HISTORY_KEY, ORDER_KEY } from '../../constants'
import { useLocalStorage } from '../../hooks'
import { Order } from '../../contracts'
import { choosePath } from '../../utils'

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
  const [saveHistory, setSaveHistory] = useState(false)
  const [order] = useLocalStorage<Order>(ORDER_KEY)
  const [t] = useTranslation()

  useEffect(() => {
    if (!saveHistory) return

    const history = lscache.get(HISTORY_KEY) || []
    const { from, to } = choosePath(order)

    lscache.set(HISTORY_KEY, [
      ...history,
      { time: Date.now(), term, order: { from, to } },
    ])

    setSaveHistory(false)
  }, [saveHistory])

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
    setSaveHistory(true)
    handleSetSearch(term)
  }

  const handleSetSearch = (word: string): void => {
    setSearch(word)
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={`ui big fluid icon input ${loading ? 'loading' : ''}`}>
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
