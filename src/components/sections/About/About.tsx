import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import ContentfulImage from '@app/lib/contentful-image';
import { GeneralContent } from '@app/services/graphql/types';
import { Container, SimpleGrid, Text } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';

const About: FC = () => {
  const { data, isLoading } = useSWR<GeneralContent | null>('/api/generalContent', fetcher);
  return (
    <SectionContainer id="about">
      <SimpleGrid cols={2} spacing="lg">
        {data?.aboutImage?.url && (
          <ContentfulImage src={data?.aboutImage?.url} width={100} height={100} />
        )}
        <Text>{data?.aboutDescription}</Text>
      </SimpleGrid>
    </SectionContainer>
  );
};

export default About;
