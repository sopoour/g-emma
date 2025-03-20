import { Container, Grid } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import { LiveEvents } from '@app/services/graphql/types';
import { fetcher } from '@app/hooks/fetch/useFetch';
import LiveSection from './elements/LiveSection';

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvents[] | null>('/api/liveEvents', fetcher);
  const today = new Date();

  const upcomingShows = data?.filter((live) => new Date(live.date) >= today);
  const pastShows = data?.filter((live) => new Date(live.date) < today);

  return (
    <Container size={'md'} component={'section'} id="live">
      <Grid gutter="xl" style={{ position: 'relative' }}>
        {upcomingShows && upcomingShows?.length > 0 && (
          <LiveSection title="Upcoming shows" shows={upcomingShows} />
        )}
        <LiveSection title="Past shows" shows={pastShows} hasShowAll />
      </Grid>
    </Container>
  );
};

export default Live;
