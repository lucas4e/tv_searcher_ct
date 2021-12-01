import * as React from 'react'
import { Box, Text } from '@chakra-ui/react'

const MediaPlaceholderItem: React.FC = () => {
  return (
    <Box display='flex' justifyContent='center' mt={300}>
      <Text fontSize={32} color={'gray.700'}>
        Search for your favorite show
      </Text>
    </Box>
  )
}

export default MediaPlaceholderItem
