import * as React from 'react'
import type { NextPage } from 'next'
import useMovies from '../lib/useMovies'
import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
} from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'
import DetailsItem from '../components/DetailsItem'
import MediaPlaceholderItem from '../components/MediaPlaceholderItem'

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { data, loading, error } = useMovies(searchQuery)

  return (
    <Box className='homeContainer'>
      <InputGroup w={400} mb={5}>
        <Input
          variant='filled'
          value={searchQuery}
          placeholder={'Type to search'}
          onChange={e => setSearchQuery(e.target.value)}
        ></Input>
        <InputRightElement>
          <Icon w={5} h={5} as={BiSearchAlt} />
        </InputRightElement>
      </InputGroup>
      {data ? <DetailsItem {...data} /> : <MediaPlaceholderItem />}
    </Box>
  )
}

export default Home
