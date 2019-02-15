import React from 'react'

export const Toast: React.FC<{
  message: string
  button?: string
  onConfirm: () => void
}> = ({ message, button = 'OK', onConfirm }): JSX.Element => (
  <div className="ui basic center aligned segment">
    <div className="ui left labeled button toast" role="alert">
      <p className="ui basic label">{message}</p>
      <button type="button" className="ui button" onClick={onConfirm}>
        {button}
      </button>
    </div>
  </div>
)

export default Toast
