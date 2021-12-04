import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import DarkmodeButton from '../components/DarkmodeButton'
import { Box } from '@chakra-ui/react'
import { ContextProvider } from '../lib/showContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <ChakraProvider>
        <Box p={5}>
          <DarkmodeButton />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </ContextProvider>
  )
}

export default MyApp
