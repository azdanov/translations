import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { Menu as ReachMenu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import { EN, ET } from '../i18n'
import { Globe } from './Globe'

export const NavBar: React.FC = (): JSX.Element => {
  const [t, i18n] = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)

  function handleSelect(language: string): void {
    if (language === i18n.language) return

    i18n.changeLanguage(language, () => setActiveLanguage(language))
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
        <ReachMenu>
          <MenuButton className="ui dropdown item" style={{ marginBottom: '0.1rem' }}>
            <div className="text">{t('language')}</div>{' '}
            <span aria-hidden className="dropdown icon" />
          </MenuButton>
          <MenuList>
            <MenuItem
              data-current={activeLanguage === EN}
              onSelect={() => handleSelect(EN)}
            >
              <span className="text">English</span>
            </MenuItem>
            <MenuItem
              data-current={activeLanguage === ET}
              onSelect={() => handleSelect(ET)}
            >
              <span className="text">Eesti</span>
            </MenuItem>
          </MenuList>
        </ReachMenu>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
