import { English, Estonian, Order } from '../contracts'

export const DAY = 'day'
export const HISTORY = 'history'
export const HISTORY_KEY = 'history'
export const MAIN_PANEL_KEY = 'main-panel'
export const SETTINGS = 'settings'
export const TOTAL_PHRASES_KEY = 'total-phrases'
export const WORD_OF_THE_DAY_KEY = 'word-of-the-day'
export const ORDER_KEY = 'order'
export const DEFAULT_ORDER: Order = ['english', 'estonian']

export const EN = 'en'
export const ET = 'et'
export const ENGLISH = 'english'
export const ESTONIAN = 'estonian'
export const LANGUAGES: { en: English; et: Estonian; [key: string]: string } = {
  [EN]: ENGLISH,
  [ET]: ESTONIAN,
}
