import * as React from 'react'
import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  ListItem,
  List,
} from '@chakra-ui/react'
import EpisodeDetailsCard from './EpisodeDetailsCard'
import { Episode } from '../models/Interface'

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
      <TabList>
        {Array.from(Array(numberOfSeasons)).map((_, index) => {
          return <Tab key={index}>{`Season ${index + 1}`}</Tab>
        })}
      </TabList>
      <TabPanels>
        {Array.from(Array(numberOfSeasons)).map((_, index) => (
          <TabPanel key={index}>
            <List>
              {episodesData
                ?.filter(episode => episode.season === selectedSeason)
                .map(episode => (
                  <ListItem key={episode.id}>
                    <Text>{episode.name}</Text>
                  </ListItem>
                ))}
            </List>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default EpisodesGuide
