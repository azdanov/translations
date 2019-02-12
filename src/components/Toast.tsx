import React from 'react'
import { Button, Label, Segment } from 'semantic-ui-react'

export const Toast: React.FC<{
  message: string
  button?: string
  onConfirm: () => void
}> = ({ message, button = 'OK', onConfirm }): JSX.Element => (
  <Segment basic textAlign="center">
    <Button as="div" labelPosition="left" tabIndex="-1" role="alert" className="toast">
      <Label as="p" basic>
        {message}
      </Label>
      <Button onClick={onConfirm}>{button}</Button>
    </Button>
  </Segment>
)

export default Toast
