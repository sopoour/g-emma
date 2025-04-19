import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import ContentfulImage from '@app/lib/contentful-image';
import { GeneralContent } from '@app/services/graphql/types';
import { SimpleGrid, Text, VisuallyHidden } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import styles from './About.module.scss';

const About: FC = () => {
  const { data, isLoading } = useSWR<GeneralContent | null>('/api/generalContent', fetcher);
  return (
    <div style={{ background: 'linear-gradient(210deg, #F4F6FB 50%, #99BD89 100%)' }}>
      <SectionContainer id="about">
        <VisuallyHidden component={'h2'}>About</VisuallyHidden>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 32, sm: 64 }}
          style={{ height: '75%', alignItems: 'center' }}
        >
          <span style={{ position: 'relative' }}>
            {data?.aboutImage?.url && (
              <ContentfulImage
                src={data?.aboutImage?.url}
                fill
                className={styles.aboutImage}
                alt={'Emma Portrait'}
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover' }}
              />
            )}
          </span>
          <Text c={'g-dark.9'} size="xl" fw={500}>
            {data?.aboutDescription}
          </Text>
        </SimpleGrid>
      </SectionContainer>
    </div>
  );
};

export default About;
