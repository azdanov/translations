import React, { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, Input, Label, Message as UIMessage } from 'semantic-ui-react'

interface Props {
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchEl: MutableRefObject<Input | null>
}

export const Message: React.FC<Props> = ({
  error,
  setError,
  setSearch,
  searchEl,
}): JSX.Element => {
  const [t] = useTranslation()

  return (
    <UIMessage warning>
      <UIMessage.Header>{t('error')}</UIMessage.Header>
      <UIMessage.Content>
        <Label
          floating
          as="a"
          href="#"
          tabIndex="0"
          className="right aligned"
          onClick={event => {
            event.preventDefault()
            setError('')
            setSearch('')
            if (searchEl && searchEl.current) {
              searchEl.current.focus()
            }
          }}
        >
          {t('close')}
          <Icon name="delete" />
        </Label>
        {t(error)}
      </UIMessage.Content>
    </UIMessage>
  )
}

export default Message
