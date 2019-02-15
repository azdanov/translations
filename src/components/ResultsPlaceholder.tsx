import { times } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ResultsPlaceholder: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <div className="container text">
      <h2 className="ui header small">{`${t('loading')} …`}</h2>
      <div role="list" className="ui relaxed list">
        {times(4, i => {
          return (
            <div role="listitem" className="item" key={i}>
              <div className="header">
                <div className="ui placeholder">
                  <div className={`line ${isEven(i) ? 'short' : 'very short'}`} />
                </div>
              </div>
              <div className="ui placeholder">
                <div className={`line ${isEven(i) ? 'long' : 'very long'}`} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const isEven = (n: number): boolean => {
  return n % 2 === 0
}

export default ResultsPlaceholder
