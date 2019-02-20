import { en, et } from './Languages'

export interface HistoryContract {
  time: number
  term: string
  order: { from: en | et; to: en | et }
}
