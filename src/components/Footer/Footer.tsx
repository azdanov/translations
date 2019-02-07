import React from 'react'
import { Icon, Container } from 'semantic-ui-react'

export const Footer: React.FC = (): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <div className="footer">
      <Container text textAlign="center">
        <Icon name="copyright outline" /> {year}
      </Container>
    </div>
  )
}
