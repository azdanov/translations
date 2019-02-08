import { Container, List, Placeholder, Header } from 'semantic-ui-react'
import React from 'react'
import { times } from 'lodash'
import { useTranslation } from 'react-i18next'

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
                  <Placeholder.Line length={i % 2 ? 'short' : 'very short'} />
                </Placeholder>
              </List.Header>
              <Placeholder>
                <Placeholder.Line length={i % 2 ? 'long' : 'very long'} />
              </Placeholder>
            </List.Item>
          )
        })}
      </List>
    </Container>
  )
}
