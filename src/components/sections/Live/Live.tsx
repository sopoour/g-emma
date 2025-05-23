import { Grid, VisuallyHidden } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import { LiveEvents } from '@app/services/graphql/types';
import { fetcher } from '@app/hooks/fetch/useFetch';
import LiveSection from './elements/LiveSection';
import MaxwidthContainer from '@app/components/MaxwidthContainer/MaxwidthContainer';
import BackgroundSection from '@app/components/BackgroundSection/BackgroundSection';
import { normalizeDate } from '@app/utils/formatDate';

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvents[] | null>('/api/liveEvents', fetcher);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time from today

  const upcomingShows = data
    ?.filter((live) => normalizeDate(live.date) >= today)
    ?.sort((a, b) => normalizeDate(a.date).getTime() - normalizeDate(b.date).getTime());

  const pastShows = data
    ?.filter((live) => normalizeDate(live.date) < today)
    ?.sort((a, b) => normalizeDate(b.date).getTime() - normalizeDate(a.date).getTime());

  return (
    <BackgroundSection id="live" background="linear-gradient(165deg, #BDD3E8 0%, #F4F6FB 50%)">
      <MaxwidthContainer id="live">
        <VisuallyHidden component={'h2'}>Live Shows</VisuallyHidden>
        <Grid gutter="xl" style={{ width: '100%' }}>
          {upcomingShows && upcomingShows?.length > 0 && (
            <LiveSection title="Upcoming shows" shows={upcomingShows} shownEventsNumber={4} />
          )}
          {pastShows && pastShows?.length > 0 && (
            <LiveSection title="Past shows" shows={pastShows} pastShows />
          )}
        </Grid>
      </MaxwidthContainer>
    </BackgroundSection>
  );
};

export default Live;
