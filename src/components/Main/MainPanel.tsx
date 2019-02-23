import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { History, Settings, WordOfTheDay } from '.'
import { DAY, HISTORY, MAIN_PANEL_KEY, SETTINGS } from '../../constants'
import { Order } from '../../contracts'
import { useLocalStorage } from '../../hooks'

export const MainPanel: React.FC<{
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setOrder: (value: Order) => void
}> = ({ setSearch, setOrder }): JSX.Element => {
  const [t] = useTranslation()
  const [panel, setPanel] = useLocalStorage(MAIN_PANEL_KEY, DAY)
  const [active, setActive] = useState(panel)

  return (
    <>
      <div className="ui top attached tabular menu">
        <button
          type="button"
          className={`item ${active === DAY && 'active'}`}
          onClick={event => {
            event.currentTarget.blur()
            setActive(DAY)
            setPanel(DAY)
          }}
        >
          {t(DAY)}
        </button>
        <button
          type="button"
          className={`item ${active === HISTORY && 'active'}`}
          onClick={event => {
            event.currentTarget.blur()
            setActive(HISTORY)
            setPanel(HISTORY)
          }}
        >
          {t(HISTORY)}
        </button>
        <button
          type="button"
          className={`item ${active === SETTINGS && 'active'}`}
          onClick={event => {
            event.currentTarget.blur()
            setActive(SETTINGS)
            setPanel(SETTINGS)
          }}
        >
          {t(SETTINGS)}
        </button>
      </div>
      <div className="ui bottom attached padded segment">
        {active === DAY && <WordOfTheDay />}
        {active === HISTORY && <History setSearch={setSearch} setOrder={setOrder} />}
        {active === SETTINGS && <Settings />}
      </div>
    </>
  )
}

export interface WordOfTheDayResult {
  word: string
  note: string
  definitions: { text: string }[]
}
