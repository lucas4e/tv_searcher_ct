import * as React from 'react'
import { Box, VStack, Text, HStack, Heading, Image } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { useEpisodeContext } from '../lib/showContext'
import { AiFillStar } from 'react-icons/ai'
import IMDbRating from './IMDbRating'

const EpisodeDetailsPage: React.FC = () => {
  const { episodeContext } = useEpisodeContext()
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  console.log(episodeContext)

  return (
    <Box mb={3}>
      <VStack
        alignItems='flex-start'
        rounded='10'
        w='auto'
        p={4}
        bg={isDarkMode ? 'gray.700' : 'gray.200'}
        mb={5}
      >
        <HStack
          display='flex'
          w='full'
          className='detailsContainer'
          justifyContent='space-between'
          alignItems='center'
        >
          <VStack alignItems='start'>
            <HStack mr={5} marginBottom='-25px'>
              <Heading mr={2} fontSize='5xl' mb={5}>
                {episodeContext.name}
              </Heading>
              <Text
                opacity={0.4}
              >{`Season ${episodeContext.season}, Episode ${episodeContext.number}`}</Text>
            </HStack>
            <HStack>
              <Text>Airdate </Text>
              <Text opacity={0.4}>{episodeContext.airdate}</Text>
            </HStack>
          </VStack>
          <IMDbRating rating={episodeContext.rating.average} />
        </HStack>
      </VStack>
      <VStack
        alignItems='flex-start'
        rounded='10'
        p={4}
        bg={isDarkMode ? 'gray.700' : 'gray.200'}
      >
        <HStack>
          {episodeContext.image.original && (
            <Image
              style={{ WebkitBoxReflect: 'initial' }}
              rounded={5}
              minW='500px'
              maxW='50vw'
              src={episodeContext.image.original}
              alt=''
            />
          )}
        </HStack>
        <Text>{episodeContext.summary.replace(/<\/?[A-z][^>]*>/g, '')}</Text>
      </VStack>
    </Box>
  )
}

export default EpisodeDetailsPage
