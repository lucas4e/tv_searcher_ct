import * as React from 'react'
import { Episode } from '../models/Interface'
import { Box, Text } from '@chakra-ui/react'

const EpisodeDetailsCard: React.FC<Episode> = ({ episode }) => {
  return <Box>{/* <Text>{episode.name}</Text> */}</Box>
}

export default EpisodeDetailsCard
