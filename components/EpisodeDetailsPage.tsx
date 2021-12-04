import * as React from 'react'
import { Episode } from '../models/Interface'
import { Box } from '@chakra-ui/layout'
import { useEpisodeContext } from '../lib/showContext'

const EpisodeDetailsPage: React.FC<Episode> = () => {
  const { episodeContext, setEpisodeContext } = useEpisodeContext()
  return <Box>{episodeContext?.name}</Box>
}

export default EpisodeDetailsPage
