import { Menu as ReachMenu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { EN, ET } from '../i18n'
import Globe from './Globe'

export const NavBar: React.FC = (): JSX.Element => {
  const [t, i18n] = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)

  function handleSelect(language: string): void {
    if (language === i18n.language) return

    i18n.changeLanguage(language, () => setActiveLanguage(language))
  }

  return (
    <div className="ui secondary menu" style={{ marginTop: '0.5rem' }}>
      <div
        className="vertically fitted item"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <Globe width="3em" height="3em" />
      </div>
      <div className="ui pointing secondary menu" style={{ marginBottom: '0.3rem' }}>
        <NavLink className="item" href="/" to="/" exact>
          {t('home')}
        </NavLink>
        <NavLink className="item" href="/about" to="/about">
          {t('about')}
        </NavLink>
      </div>

      <div className="right menu">
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
      </div>
    </div>
  )
}

export default NavBar
