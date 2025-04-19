import { Container, Grid, VisuallyHidden } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import { LiveEvents } from '@app/services/graphql/types';
import { fetcher } from '@app/hooks/fetch/useFetch';
import LiveSection from './elements/LiveSection';
import SectionContainer from '@app/components/SectionContainer/SectionContainer';

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvents[] | null>('/api/liveEvents', fetcher);
  const today = new Date();

  const upcomingShows = data?.filter((live) => new Date(live.date) >= today);
  const pastShows = data?.filter((live) => new Date(live.date) < today);

  return (
    <div style={{ background: 'linear-gradient(180deg, #BDD3E8 0%, #F4F6FB 50%)' }}>
      <SectionContainer id="live">
        <VisuallyHidden component={'h2'}>Live Shows</VisuallyHidden>
        <Grid gutter="xl" style={{ position: 'relative' }}>
          {upcomingShows && upcomingShows?.length > 0 && (
            <LiveSection title="Upcoming shows" shows={upcomingShows} />
          )}
          <LiveSection title="Past shows" shows={pastShows} hasShowAll />
        </Grid>
      </SectionContainer>
    </div>
  );
};

export default Live;
