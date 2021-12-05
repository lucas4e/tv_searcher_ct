import * as React from 'react'
import { VStack, HStack, Text, Link } from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'

interface Props {
  url?: string
  rating: number
}

const IMDbRating: React.FC<Props> = props => {
  return (
    <VStack alignItems='start'>
      <Text>IMDb Rating</Text>
      <HStack>
        <AiFillStar style={{ fill: '#c1ab29', fontSize: '22px' }} />
        <HStack>
          <Text fontWeight='bold'>
            {props.url ? (
              <Link href={`https://www.imdb.com/title/${props.url}`}>
                {props.rating}
              </Link>
            ) : (
              <Text>{props.rating}</Text>
            )}
          </Text>
          <Text opacity='0.5'>/ 10</Text>
        </HStack>
      </HStack>
    </VStack>
  )
}

export default IMDbRating
