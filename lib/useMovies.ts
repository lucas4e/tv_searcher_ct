import * as React from 'react'
import axios from 'axios'
import { Itv } from './../models/Interface'

const useMovies = (searchQuery: string) => {
  const [data, setData] = React.useState<Itv | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const baseUrl = 'https://api.tvmaze.com/singlesearch/shows?q='

  React.useEffect(() => {
    if (!searchQuery) return setData(null)
    const formattedString = searchQuery.split(' ').join('&')
    getMoviesBySearchQuery(formattedString)
  }, [searchQuery])

  const getMoviesBySearchQuery = async (sq: string) => {
    let res = null
    try {
      res = await axios.get(`${baseUrl} ${sq}&embed=episodes`)
    } catch (error) {
      setError(error.response)
    }
    if (res) setData(res.data)
  }

  return { data, loading, error }
}

export default useMovies
