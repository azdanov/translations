import i18next from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { English, Estonian } from '../types/Languages'
import resources from './resources.json'

export const EN = 'en'
export const ET = 'et'

export const ESTONIAN = 'estonian'
export const ENGLISH = 'english'

export const languages: { en: English; et: Estonian; [key: string]: string } = {
  [EN]: ENGLISH,
  [ET]: ESTONIAN,
}

i18next
  .use(initReactI18next)
  .use(LngDetector)
  .init({
    resources,
    lng: process.env.NODE_ENV === 'test' ? 'cimode' : undefined,
    fallbackLng: EN,
    debug: process.env.NODE_ENV === 'development',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
