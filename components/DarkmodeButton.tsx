import * as React from 'react'
import { IconButton } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs'

const DarkmodeButton: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'

  return (
    <IconButton
      aria-label='Toggle Darkmode'
      bg='transparent'
      fontSize='xl'
      color={isDarkMode ? 'yellow.500' : 'inherit'}
      icon={isDarkMode ? <BsSunFill /> : <BsFillMoonFill />}
      onClick={toggleColorMode}
      pos='absolute'
      top='4'
      right='4'
    >
      Toggle Darkmode
    </IconButton>
  )
}

export default DarkmodeButton
