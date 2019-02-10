import React, { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from 'semantic-ui-react'
import { EN, ET } from '../i18n'
import { SvgGlobe } from './Globe'

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
        <SvgGlobe width="3em" height="3em" />
      </Menu.Item>
      <Menu.Item name={t('home')} href="/" />
      <Menu.Menu position="right">
        <Menu.Item
          data-language={EN}
          href={EN}
          name="English"
          active={activeItem === EN}
          onClick={handleItemClick}
        />
        <Menu.Item
          data-language={ET}
          href={ET}
          name="Eesti"
          active={activeItem === ET}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  )
}
