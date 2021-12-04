import * as React from 'react'
import { useRouter } from 'next/dist/client/router'
import { Episode } from '../models/Interface'
import { Box, Image, Text } from '@chakra-ui/react'
import { useEpisodeContext } from '../lib/showContext'

const EpisodeDetailsCard: React.FC<Episode> = props => {
  const { episodeContext, setEpisodeContext } = useEpisodeContext()

  const fallBackImgSrc =
    'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg'

  const showEpisodeDetails = (props: Episode) => {
    // const url = props.url.split('https://www.tvmaze.com/').pop()
    // router.push({ pathname: '/[id]', query: { id: props.id } })
    setEpisodeContext(props)
  }

  return (
    <Box w={210}>
      <Box className='imgWrapper'>
        <Image
          src={props.image?.medium || fallBackImgSrc}
          alt=''
          minW={200}
          rounded={5}
          _hover={{ opacity: '0.5', cursor: 'pointer' }}
          onClick={() => showEpisodeDetails(props)}
        />
      </Box>
      {<Text mb={5}>{props.name}</Text>}
    </Box>
  )
}

export default EpisodeDetailsCard
