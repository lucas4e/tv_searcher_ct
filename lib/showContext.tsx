import * as React from 'react'
import { Episode } from '../models/Interface'

const Context = React.createContext<any>(null)

export const ContextProvider: React.FC<any> = ({ children }) => {
  const [episodeContext, setEpisodeContext] = React.useState<Episode | null>(
    null
  )
  return (
    <Context.Provider value={{ episodeContext, setEpisodeContext }}>
      {children}
    </Context.Provider>
  )
}

export const useEpisodeContext = () => React.useContext(Context)
