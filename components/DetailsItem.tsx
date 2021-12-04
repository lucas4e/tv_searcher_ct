import * as React from 'react'
import {
  Box,
  Heading,
  Image,
  HStack,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import styles from './DetailsItem.module.css'
import { AiFillStar } from 'react-icons/ai'
import EpisodesGuide from './EpisodesGuide'
import { Episode, Itv } from '../models/Interface'
import { useEpisodeContext } from '../lib/showContext'
import EpisodeDetailsPage from './EpisodeDetailsPage'

const DetailsItem: React.FC<Itv> = ({ data }) => {
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
    return data?.premiered.split('-')[0]
  }

  const formattedEndDate = () => {
    if (!data.ended) return ''
    return data.ended.split('-')[0]
  }

  const formattedGenres = () => {
    return data?.genres.map((g, i, { length }) => {
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
                    <Text>{displayShowDates()}</Text>
                  </HStack>
                  <HStack>{formattedGenres()}</HStack>
                </VStack>
                {data?.rating.average && (
                  <VStack alignItems='start'>
                    <Text>IMDb Rating</Text>
                    <VStack>
                      <HStack>
                        <AiFillStar
                          style={{ fill: '#c1ab29', fontSize: '22px' }}
                        />
                        <HStack>
                          <Text fontWeight='bold'>
                            <Link
                              href={`https://www.imdb.com/title/${data.externals.imdb}`}
                            >
                              {data?.rating.average}
                            </Link>
                          </Text>
                          <Text opacity='0.5'>/ 10</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </VStack>
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

              <Box className='showInfoContainer'>
                {data?.runtime && (
                  <HStack>
                    <Text>Runtime </Text>
                    <Text opacity='0.5'>{`${data?.runtime}m`}</Text>
                  </HStack>
                )}
                {data?.language && (
                  <HStack>
                    <Text>Language </Text>
                    <Text opacity='0.5'>{data?.language}</Text>
                  </HStack>
                )}
                {data?.network && (
                  <VStack alignItems='start' spacing='0'>
                    <HStack>
                      <Text>Country </Text>
                      <Text opacity='0.5'>{data?.network.country.name}</Text>
                    </HStack>
                    <HStack>
                      <Text>Network </Text>
                      <Text opacity='0.5'>{data?.network.name}</Text>
                    </HStack>
                  </VStack>
                )}
              </Box>
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
          <EpisodeDetailsPage />
        )}
      </HStack>
    </Box>
  )
}

export default DetailsItem
