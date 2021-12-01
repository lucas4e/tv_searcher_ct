export interface IMovie {
  data: {
    _embedded: object
    _links: object
    averageRuntime: number
    dvdCountry?: null
    ended?: null
    externals: {
      tvrage: number
      thetvdb: number
      imdb: string
    }
    genres: Array<string>
    id: number
    image?: {
      medium: string
      original: string
    }
    language: string
    name: string
    network: object
    officialSite: string
    premiered: string
    rating: {
      average: number
    }
    runtime: number
    schedule: object
    status: string
    summary: string
    type: string
    updated: number
    url: string
    webChannel: boolean
    weight: number
  }
}
