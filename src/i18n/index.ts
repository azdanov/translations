import i18next from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import resources from './resources.json'

export const EN = 'en'
export const ET = 'et'

i18next
  .use(initReactI18next)
  .use(LngDetector)
  .init({
    resources,
    fallbackLng: EN,
    debug: process.env.NODE_ENV === 'development',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
