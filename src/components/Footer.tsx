import React from 'react'
import { Container, Icon, Segment } from 'semantic-ui-react'

export const Footer: React.FC<{ className?: string }> = ({
  className = 'footer',
}): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <Container text textAlign="center" className={className}>
      <Segment basic>
        <div style={{ color: 'rgba(0,0,0,.6)' }}>
          <Icon name="copyright outline" /> {year}
        </div>
      </Segment>
    </Container>
  )
}

export default Footer
