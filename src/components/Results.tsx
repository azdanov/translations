import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Header, List } from 'semantic-ui-react'
import { Article } from '../types/Article'
import { ResultsPlaceholder } from './ResultsPlaceholder'

export const Results: React.FC<{ results?: Article[]; loading: boolean }> = ({
  results,
  loading,
}): JSX.Element | null => {
  const [t] = useTranslation()

  if (loading) {
    return <ResultsPlaceholder />
  }

  if (!results || isEmpty(results)) {
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
    <span aria-hidden style={{ userSelect: 'none', margin: '0 0.35em' }}>
      |
    </span>
  ) : null
}
