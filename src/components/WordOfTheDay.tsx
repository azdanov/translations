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
  const [result, setResult] = useState<WordOfTheDayResult>({
    word: '',
    note: '',
    definitions: [],
  })
  const [loading, setLoading] = useState(false)

  useFetchWordOfTheDay(setResult, setLoading)

  if (!show) return null

  const isReady = !loading && result.word && result.definitions && result.note

  return (
    <>
      <Header
        as="h2"
        attached="top"
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e8e8e8',
          fontSize: '1rem',
          fontWeight: 'normal',
        }}
      >
        {t('word of the day')}
      </Header>
      <Segment attached="bottom" loading={loading}>
        {isReady ? (
          <>
            <Header as="h3" size="medium">
              <Header.Content>
                <a
                  href={`https://www.wordnik.com/words/${result.word}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
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
              <Placeholder.Line length="short" />
              <Placeholder.Line length="very long" />
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
