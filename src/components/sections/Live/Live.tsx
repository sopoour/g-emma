import { Button, Container, Grid, Text } from '@mantine/core';
import { FC, useState } from 'react';
import styles from './Live.module.scss';
import LiveRow from './elements/LiveRow';

const liveData = [
  {
    date: '2025-07-07T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'TRIO',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
];

const Live: FC = () => {
  const today = new Date();

  const upcomingShows = liveData.filter((live) => new Date(live.date) >= today);
  const pastShows = liveData.filter((live) => new Date(live.date) < today);

  const [showAll, setShowAll] = useState(false);
  const visibleShows = showAll ? pastShows : pastShows.slice(0, 3);

  return (
    <Container size={'md'} component={'section'} id="live">
      <Grid gutter="xl" style={{ position: 'relative' }}>
        {upcomingShows.length > 0 && (
          <>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text size="lg" fw={700} ff="BioRhyme" c={'g-dark.9'}>
                Upcoming Shows
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              {upcomingShows.map((live) => (
                <LiveRow key={live.date} {...live} />
              ))}
            </Grid.Col>
          </>
        )}

        <Grid.Col span={{ base: 12, sm: 4 }} className={styles.liveGridSections}>
          <Text size="lg" fw={700} ff="BioRhyme" c={'g-dark.9'}>
            Past Shows
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 8 }} className={styles.liveGridSections}>
          {visibleShows.map((live) => (
            <LiveRow key={live.date} {...live} />
          ))}
          {!showAll && (
            <div className={styles.showMore}>
              <Button onClick={() => setShowAll(true)} variant="subtle" radius="md">
                Show all past shows ▼
              </Button>
            </div>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Live;
