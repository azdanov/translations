/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header, List, Placeholder, Segment } from 'semantic-ui-react'
import { useFetchWordOfTheDay } from '../hooks/useFetchWordOfTheDay'

export interface WordOfTheDayResult {
  word: string
  note: string
  definitions: { text: string }[]
}

interface Props {
  show: boolean
}

export const WordOfTheDay: React.FC<Props> = ({ show }): JSX.Element | null => {
  const [t] = useTranslation()
  const [result, setResult] = useState({} as WordOfTheDayResult)
  const [loading, setLoading] = useState(false)

  useFetchWordOfTheDay(setResult, setLoading)

  if (!show) return null

  const isReady = !loading && result.word && result.definitions && result.note

  return (
    <>
      <Segment attached="top">
        <Header as="h2" size="medium" textAlign="center">
          {t('word of the day')}
        </Header>
      </Segment>
      <Segment padded attached="bottom" loading={loading}>
        {isReady ? (
          <>
            <Header as="h3" size="medium">
              <Header.Content>
                <a href={`https://www.wordnik.com/words/${result.word}`}>
                  {result.word}
                </a>
              </Header.Content>
              <Header.Subheader>{result.note}</Header.Subheader>
            </Header>
            <p>{t('definition')}:</p>
            <List bulleted relaxed>
              {result.definitions.map(definition => (
                <List.Item key={definition.text}>{definition.text}</List.Item>
              ))}
            </List>
          </>
        ) : (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        )}
      </Segment>
    </>
  )
}

export default WordOfTheDay
