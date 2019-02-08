import { Container, List, Header } from 'semantic-ui-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Result } from '../App'
import { ResultsPlaceholder } from './ResultsPlaceholder'

export const Results: React.FC<{ results?: Result[]; loading: boolean }> = ({
  results,
  loading,
}): JSX.Element | null => {
  const [t] = useTranslation()

  if (loading) {
    return <ResultsPlaceholder />
  }

  if (!results) {
    return null
  }

  return (
    <Container text fluid>
      <Header as="h2" size="small">
        {t('results')}: {results.length}
      </Header>
      <List relaxed>
        {results.map(result => (
          <List.Item key={result.en}>
            <List.Header>{result.en}</List.Header>
            {result.et.map((et, index) => (
              <span key={et}>
                {addNextSeparator(index)}
                {et}
              </span>
            ))}
          </List.Item>
        ))}
      </List>
    </Container>
  )
}

const addNextSeparator = (index: number): JSX.Element | null => {
  return index ? (
    <span aria-hidden style={{ userSelect: 'none', margin: '0 0.3em' }}>
      |
    </span>
  ) : null
}
