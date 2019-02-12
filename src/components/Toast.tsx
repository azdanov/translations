import React from 'react'
import { Button, Label, Segment } from 'semantic-ui-react'

export const Toast: React.FC<{ message: string; onConfirm: () => void }> = ({
  message,
  onConfirm,
}): JSX.Element => (
  <Segment basic textAlign="center">
    <Button as="div" labelPosition="left" tabIndex="-1" role="alert" className="toast">
      <Label as="p" basic>
        {message}
      </Label>
      <Button onClick={onConfirm}>OK</Button>
    </Button>
  </Segment>
)
