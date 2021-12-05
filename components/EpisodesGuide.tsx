import * as React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
} from '@chakra-ui/react'
import EpisodeDetailsCard from './EpisodeDetailsCard'
import { Episode } from '../models/Interface'
import styles from './EpisodesGuide.module.css'

interface EpisodesProps {
  numberOfSeasons: number
  episodesData: Episode[]
}

const EpisodesGuide: React.FC<EpisodesProps> = ({
  numberOfSeasons,
  episodesData,
}) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const selectedSeason = tabIndex + 1

  return (
    <Tabs index={tabIndex} onChange={e => setTabIndex(e)}>
      <TabList flexFlow='wrap'>
        {Array.from(Array(numberOfSeasons)).map((_, index) => {
          return <Tab key={index}>{`Season ${index + 1}`}</Tab>
        })}
      </TabList>
      <TabPanels>
        {Array.from(Array(numberOfSeasons)).map((_, index) => (
          <TabPanel key={index}>
            <HStack
              className={styles.episodesScrollContainer}
              overflowX='scroll'
              display='flex'
              alignItems='flex-start'
            >
              {episodesData
                ?.filter(episode => episode.season === selectedSeason)
                .map(episode => (
                  <EpisodeDetailsCard key={episode.id} {...episode} />
                ))}
            </HStack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default EpisodesGuide
