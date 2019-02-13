import React, { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Dropdown, DropdownProps, Menu } from 'semantic-ui-react'
import { EN, ET } from '../i18n'
import { Globe } from './Globe'

export const NavBar: React.FC = (): JSX.Element => {
  const [t, i18n] = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)

  function handleItemClick(
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps,
  ): void {
    event.preventDefault()
    const language = String(data.value)

    if (language) {
      i18n.changeLanguage(language, () => setActiveLanguage(language))
    }
  }

  return (
    <Menu secondary style={{ marginTop: '0.5rem' }}>
      <Menu.Item fitted="vertically">
        <Globe width="3em" height="3em" />
      </Menu.Item>
      <Menu secondary pointing style={{ marginBottom: '0.3rem' }}>
        <Menu.Item as={NavLink} name={t('home')} href="/" to="/" exact />
        <Menu.Item as={NavLink} name={t('about')} href="/about" to="/about" />
      </Menu>

      <Menu.Menu position="right">
        <Dropdown
          item
          value={activeLanguage}
          onChange={handleItemClick}
          text={t('language')}
          options={[{ text: 'English', value: EN }, { text: 'Eesti', value: ET }]}
          style={{ marginBottom: '0.3rem' }}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
