import * as React from 'react'
import {
  Box,
  Heading,
  Image,
  HStack,
  VStack,
  Text,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useColorMode } from '@chakra-ui/color-mode'
import styles from './DetailsItem.module.css'
import EpisodesGuide from './EpisodesGuide'
import { Episode, Itv } from '../models/Interface'
import { useEpisodeContext } from '../lib/showContext'
import EpisodeDetailsPage from './EpisodeDetailsPage'
import IMDbRating from './IMDbRating'

const DetailsItem: React.FC<Itv> = data => {
  const { episodeContext, setEpisodeContext } = useEpisodeContext()
  const [numberOfSeasons, setNumberOfSeasons] = React.useState(1)
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  const episodeData = data?._embedded.episodes

  const getTotalSeasons = React.useCallback(() => {
    let distinctSeasons = [...new Set(episodeData.map((e: any) => e.season))]
    setNumberOfSeasons(distinctSeasons.length)
  }, [episodeData])

  React.useEffect(() => {
    getTotalSeasons()
  }, [data, getTotalSeasons])

  const formattedPremierDate = () => {
    return data?.premiered.toString().split('-')[0]
  }

  const formattedEndDate = () => {
    if (!data.ended) return ''
    return data.ended.toString().split('-')[0]
  }

  const formattedGenres = () => {
    return data?.genres.map((g: any, i: any, { length }) => {
      return (
        <Text key={i} opacity='0.5'>
          {i + 1 === length ? g : ` ${g} |`}
        </Text>
      )
    })
  }

  const displayShowDates = () => {
    let dates
    data.premiered
      ? (dates = `${formattedPremierDate()} - ${formattedEndDate()}`)
      : (dates = '')
    return dates
  }

  const exitEpisodeView = () => {
    return setEpisodeContext(null)
  }
  console.log(data)

  return (
    <Box className={styles.movieContainer}>
      <HStack alignItems='flex-start'>
        <Box marginRight='10px'>
          <Image
            maxW='650px'
            h='75vh'
            rounded={10}
            src={data.image?.original}
            alt={`poster for show ${data.name}`}
            fit='cover'
          />
        </Box>
        {!episodeContext ? (
          <Box w='full' overflowX='auto'>
            <HStack
              rounded='10'
              p={4}
              mb={5}
              bg={isDarkMode ? 'gray.700' : 'gray.200'}
            >
              <HStack
                display='flex'
                justifyContent='space-between'
                w='100%'
                alignItems='center'
              >
                <VStack alignItems='start'>
                  <HStack alignItems='center'>
                    <Heading fontSize={36}>{data?.name}</Heading>
                    <Text opacity={0.4}>{displayShowDates()}</Text>
                  </HStack>
                  <HStack>{formattedGenres()}</HStack>
                </VStack>
                {data?.rating.average && (
                  <IMDbRating
                    rating={data.rating.average}
                    url={data.externals.imdb}
                  />
                )}
              </HStack>
            </HStack>
            <Box
              rounded='10'
              p={4}
              mb={5}
              bg={isDarkMode ? 'gray.700' : 'gray.200'}
            >
              {data.summary ? (
                <Text mb={10}>
                  {data?.summary.replace(/<\/?[A-z][^>]*>/g, '')}
                </Text>
              ) : (
                <Text mb={10} opacity='0.5'>
                  No summary available for this show
                </Text>
              )}
              <HStack>
                <VStack mr='5' alignItems='flex-start'>
                  <Text>Runtime</Text>
                  <Text>Language</Text>
                  <Text>Country</Text>
                  <Text>Network</Text>
                </VStack>
                <VStack alignItems='flex-start'>
                  <Text opacity='0.5'>{`${data?.runtime || 'unknown'}m`}</Text>
                  <Text opacity='0.5'>{`${data?.language || 'unknown'}`}</Text>
                  <Text opacity='0.5'>{`${
                    data?.network.country.name || 'unknown'
                  }`}</Text>
                  <Text opacity='0.5'>{`${
                    data?.network.name || 'unknown'
                  }`}</Text>
                </VStack>
              </HStack>
            </Box>
            <Box
              className='episodesGuide'
              rounded='10'
              p={4}
              bg={isDarkMode ? 'gray.700' : 'gray.200'}
            >
              <Text mb={5}>Episodes Guide</Text>
              <EpisodesGuide
                numberOfSeasons={numberOfSeasons}
                episodesData={data._embedded.episodes}
              />
            </Box>
          </Box>
        ) : (
          <VStack alignItems='flex-start'>
            <EpisodeDetailsPage />
            <IconButton
              w='full'
              aria-label='go back'
              icon={<MdOutlineArrowBackIosNew />}
              onClick={exitEpisodeView}
            >
              Back
            </IconButton>
          </VStack>
        )}
      </HStack>
    </Box>
  )
}

export default DetailsItem
