import * as React from 'react'
import { IMovie } from '../models/IMovie'
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

const DetailsItem = (data: IMovie) => {
  const [selectedSeason, setSelectedSeason] = React.useState(1)
  const { toggleColorMode, colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  console.log(data.data)

  const formattedPremierDate = () => {
    return data?.data.premiered.split('-')[0]
  }

  const formattedEndDate = () => {
    if (!data.data.ended) return ''
    return data.data.ended.split('-')[0]
  }

  const formattedGenres = () => {
    return data?.data.genres.map((g, i, { length }) => {
      return (
        <Text key={i} opacity='0.5'>
          {i + 1 === length ? g : ` ${g} |`}
        </Text>
      )
    })
  }

  const displayShowDates = () => {
    let dates
    data.data.premiered
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
            src={data.data.image?.original}
            alt={`poster for show ${data.data.name}`}
            fit='cover'
          />
        </Box>
        <Box w='full'>
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
                  <Heading fontSize={36}>{data?.data.name}</Heading>
                  <Text>{displayShowDates()}</Text>
                </HStack>
                <HStack>{formattedGenres()}</HStack>
              </VStack>
              {data?.data.rating.average && (
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
                            href={`https://www.imdb.com/title/${data.data.externals.imdb}`}
                          >
                            {data?.data.rating.average}
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
          <Box rounded='10' p={4} bg={isDarkMode ? 'gray.700' : 'gray.200'}>
            {data.data.summary ? (
              <Text mb={10}>
                {data?.data.summary.replace(/<\/?[A-z][^>]*>/g, '')}
              </Text>
            ) : (
              <Text mb={10} opacity='0.5'>
                No summary available for this show
              </Text>
            )}

            <Box className='networkInfoContainer'></Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}

export default DetailsItem
