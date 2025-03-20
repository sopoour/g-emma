import { LiveEvents } from '@app/services/graphql/types';
import { Button, Grid, Text } from '@mantine/core';
import { FC, useState } from 'react';
import Arrow from '@app/assets/arrow.svg';
import LiveRow from './LiveRow';
import styles from '../Live.module.scss';

type Props = {
  title: string;
  shows?: LiveEvents[];
  hasShowAll?: boolean;
};

const LiveSection: FC<Props> = ({ title, shows, hasShowAll = false }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const visibleShows = showAll ? shows : shows?.slice(0, 3);
  const liveShows = hasShowAll ? visibleShows : shows;

  return (
    <>
      <Grid.Col span={{ base: 12, sm: 4 }} className={hasShowAll ? styles.liveGridSections : ''}>
        <Text size="lg" fw={700} ff="BioRhyme" c={'g-dark.9'}>
          {title}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }} className={hasShowAll ? styles.liveGridSections : ''}>
        {liveShows?.map((live) => (
          <LiveRow
            key={live.date}
            date={live.date}
            constellation={live.constellation}
            eventType={live.eventType}
            location={live.location}
          />
        ))}
        {!showAll && hasShowAll && (
          <div className={styles.showMore}>
            <Button
              onClick={() => setShowAll(true)}
              variant="subtle"
              radius="md"
              rightSection={<Arrow />}
            >
              Show all past shows
            </Button>
          </div>
        )}
      </Grid.Col>
    </>
  );
};

export default LiveSection;
