import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import DarkmodeButton from '../components/DarkmodeButton'
import { Box } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box p={5}>
        <DarkmodeButton />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
