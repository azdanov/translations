import React, { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { EN, ET } from '../i18n'
import { Globe } from './Globe'

export const NavBar: React.FC = (): JSX.Element => {
  const [t, i18n] = useTranslation()
  const [activeItem, setActiveItem] = useState(i18n.language)

  function handleItemClick(event: SyntheticEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    const { language } = event.currentTarget.dataset

    if (language) {
      i18n.changeLanguage(language, () => setActiveItem(language))
    }
  }

  return (
    <Menu secondary>
      <Menu.Item>
        <Globe width="3em" height="3em" />
      </Menu.Item>
      <Menu.Item as={NavLink} name={t('home')} href="/" to="/" exact />
      <Menu.Item as={NavLink} name={t('about')} href="/about" to="/about" />
      <Menu.Menu position="right">
        <Dropdown item text={t('language')}>
          <Dropdown.Menu>
            <Dropdown.Item
              as="a"
              data-language={EN}
              href={EN}
              active={activeItem === EN}
              // @ts-ignore
              onClick={handleItemClick}
            >
              English
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              data-language={ET}
              href={ET}
              active={activeItem === ET}
              // @ts-ignore
              onClick={handleItemClick}
            >
              Eesti
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
