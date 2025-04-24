import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { GeneralContent } from '@app/services/graphql/types';
import { Container } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';

const PrivacyPolicy: FC = () => {
  const { data: generalContentData, isLoading } = useSWR<GeneralContent | null>(
    '/api/generalContent',
    fetcher,
    {},
  );
  return (
    <section style={{ background: 'linear-gradient(220deg, #BDD3E8 0%, #F4F6FB 80%)' }}>
      <Container size="md" py="150px">
        <MarkdownConfig content={generalContentData?.privacyPolicy as string} />
      </Container>
    </section>
  );
};

export default PrivacyPolicy;
