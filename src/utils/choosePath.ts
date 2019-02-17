import { head } from 'lodash'
import { EN, ENGLISH, ESTONIAN, ET } from '../i18n'
import { Order } from '../types/Languages'

export function choosePath(order: Order): { from: string; to: string } {
  let from = ''
  let to = ''

  if (head(order) === ENGLISH) {
    ;[from, to] = [EN, ET]
  }
  if (head(order) === ESTONIAN) {
    ;[from, to] = [ET, EN]
  }

  return { from, to }
}

export default choosePath
