import { times } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Header, List, Placeholder } from 'semantic-ui-react'

export const ResultsPlaceholder: React.FC = (): JSX.Element => {
  const [t] = useTranslation()

  return (
    <Container text>
      <Header as="h2" size="small">{`${t('loading')} …`}</Header>
      <List relaxed>
        {times(4, i => {
          return (
            <List.Item key={i}>
              <List.Header>
                <Placeholder>
                  <Placeholder.Line length={isEven(i) ? 'short' : 'very short'} />
                </Placeholder>
              </List.Header>
              <Placeholder>
                <Placeholder.Line length={isEven(i) ? 'long' : 'very long'} />
              </Placeholder>
            </List.Item>
          )
        })}
      </List>
    </Container>
  )
}

const isEven = (n: number): boolean => {
  return n % 2 === 0
}

export default ResultsPlaceholder
