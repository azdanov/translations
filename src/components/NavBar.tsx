import { Menu as ReachMenu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { EN, ET } from '../constants'
import { Order } from '../contracts'
import { choosePath } from '../utils'
import { Globe } from './Svg'

interface Props extends RouteComponentProps {
  order: Order
}

export const NavBar: React.FC<Props> = ({ order }): JSX.Element => {
  const [t, i18n] = useTranslation()
  const [activeLanguage, setActiveLanguage] = useState(i18n.language)

  function handleSelect(language: string): void {
    if (language === i18n.language) return

    i18n.changeLanguage(language, () => setActiveLanguage(language))
  }

  const { from, to } = choosePath(order)

  const homePath = `/${from}/${to}/`

  return (
    <div className="ui centered grid navbar">
      <div className="eight wide computer fourteen wide mobile nine wide tablet column">
        <div className="ui secondary menu">
          <div className="fitted item">
            <Globe width="3em" height="3em" />
          </div>
          <div className="ui pointing secondary menu">
            <NavLink
              className="item"
              href={homePath}
              to={homePath}
              isActive={(match, location) => checkMainPath(location.pathname)}
            >
              {t('home')}
            </NavLink>
            <NavLink className="item" href="/about" to="/about">
              {t('about')}
            </NavLink>
          </div>

          <div className="right compact menu">
            <ReachMenu>
              <MenuButton className="ui dropdown item">
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
                </MenuItem>{' '}
              </MenuList>
            </ReachMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export function checkMainPath(path: string): boolean {
  return new RegExp(`${EN}|${ET}`).test(path)
}
