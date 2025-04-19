import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Video } from '@app/services/graphql/types';
import { FC } from 'react';
import useSWR from 'swr';
import styles from './Videos.module.scss';
import { Flex, Text, VisuallyHidden } from '@mantine/core';

const Videos: FC = () => {
  const { data, isLoading } = useSWR<Video[] | null>('/api/video', fetcher);
  return (
    <SectionContainer id="videos" className={styles.videoSection}>
      <VisuallyHidden component={'h2'}>Videos</VisuallyHidden>
      {data?.map((video) => (
        <Flex key={video.title} direction={'column'} gap={32} className={styles.videoContainer}>
          <Text c={'g-dark.9'} size="20px" fw={600} ff="Hind Vadodara" component="h3">
            {video.title}
          </Text>
          <iframe
            src={video.videoLink || ''}
            title={video.title || ''}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className={styles.video}
          />
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default Videos;
