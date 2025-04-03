import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Video } from '@app/services/graphql/types';
import { FC } from 'react';
import useSWR from 'swr';
import styles from './Videos.module.scss';
import { Flex, Text } from '@mantine/core';

const Videos: FC = () => {
  const { data, isLoading } = useSWR<Video[] | null>('/api/video', fetcher);
  return (
    <SectionContainer id="videos" className={styles.videoSection}>
      {data?.map((video) => (
        <Flex key={video.title} direction={'column'} gap={32}>
          <Text c={'g-dark.9'} size="20px" fw={700} ff="BioRhyme">
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
