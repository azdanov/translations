import { Article } from './Article'

import { EN, ET } from './Languages'

export interface Translation {
  articles: Articles
}

interface Articles {
  [key: string]: Article
}

export interface Phrase {
  text: string
  language: string
}

export interface Meaning {
  language: string
  text: string
}

export interface Tuc {
  phrase: Phrase
  meaning: Meaning
}

export interface JsonBody {
  from: EN | ET
  tuc: Tuc[]
  phrase: string
  meanings: Meaning[]
}
