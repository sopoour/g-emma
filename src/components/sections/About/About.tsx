import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import ContentfulImage from '@app/lib/contentful-image';
import { GeneralContent } from '@app/services/graphql/types';
import { SimpleGrid, Text } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import styles from './About.module.scss';

const About: FC = () => {
  const { data, isLoading } = useSWR<GeneralContent | null>('/api/generalContent', fetcher);
  return (
    <SectionContainer id="about">
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={64}
        style={{ height: '75%', alignItems: 'center' }}
      >
        <span style={{ position: 'relative' }}>
          {data?.aboutImage?.url && (
            <ContentfulImage
              src={data?.aboutImage?.url}
              fill
              objectFit="cover"
              className={styles.aboutImage}
              alt={'Emma Portrait'}
            />
          )}
        </span>
        <Text c={'g-dark.9'} size="lg" fw={500}>
          {data?.aboutDescription}
        </Text>
      </SimpleGrid>
    </SectionContainer>
  );
};

export default About;
