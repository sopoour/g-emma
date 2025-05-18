import BackgroundSection from '@app/components/BackgroundSection/BackgroundSection';
import TeamMember from '@app/components/TeamMember/TeamMember';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Team as TeamType } from '@app/services/graphql/types';
import { Container, Flex, Title } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';

const Team: FC = () => {
  const { data: teamData, isLoading } = useSWR<TeamType[] | null>('/api/team', fetcher, {});
  return (
    <BackgroundSection id="impressum" background="linear-gradient(150deg, #a1b9e1 0%, #F4F6FB 70%)">
      <Container
        size="lg"
        py={{ base: '80px', sm: '150px' }}
        fw={600}
        ff={'Hind Vadodara'}
        c={'g-dark.9'}
        style={{ display: 'flex', gap: '68px', flexDirection: 'column' }}
      >
        <Title ta={'center'} size={'44px'}>
          Team behind G&apos;emma
        </Title>
        <Flex
          rowGap={{ base: '30px', sm: '48px' }}
          columnGap={{ base: '16px', sm: '32px' }}
          wrap={'wrap'}
          justify={'center'}
        >
          {teamData
            ?.sort((a, b) => (a?.orderNumber as number) - (b?.orderNumber as number))
            ?.map((teamMember) => <TeamMember teamMember={teamMember} key={teamMember.name} />)}
        </Flex>
      </Container>
    </BackgroundSection>
  );
};

export default Team;
