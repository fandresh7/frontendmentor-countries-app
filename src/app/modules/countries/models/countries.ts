export interface Country {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  capital?: string
  subregion: string
  region: Region
  population: number
  latlng?: number[]
  timezones: string[]
  borders?: string[]
  nativeName: string
  numericCode: string
  flags: Flags
  currencies?: Currency[]
  languages: Language[]
  translations: Translations
  flag: string
  cioc?: string
  independent: boolean
  similarFlags: string[]
}

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface Flags {
  svg: string
  png: string
}

export interface Language {
  iso639_1?: string
  iso639_2: string
  name: string
  nativeName?: string
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  AntarcticOcean = 'Antarctic Ocean',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
  Polar = 'Polar'
}

export interface Translations {
  br: string
  pt: string
  nl: string
  hr: string
  fa?: string
  de: string
  es: string
  fr: string
  ja: string
  it: string
  hu: string
}
