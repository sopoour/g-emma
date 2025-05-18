import BackgroundSection from '@app/components/BackgroundSection/BackgroundSection';
import TeamMember from '@app/components/TeamMember/TeamMember';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Team as TeamType } from '@app/services/graphql/types';
import { Container, Flex, Skeleton, Stack, Title } from '@mantine/core';
import { FC } from 'react';
import useSWR from 'swr';
import styles from '@app/components/TeamMember/TeamMember.module.scss';

const Team: FC = () => {
  const { data: teamData, isLoading } = useSWR<TeamType[] | null>('/api/team', fetcher, {});

  if (isLoading) {
    return (
      <section style={{ background: 'linear-gradient(150deg, #bfc2e2 0%, #F4F6FB 80%)' }}>
        <Container size="md" py={{ base: '80px', sm: '130px' }}>
          <Stack className={styles.teamsContainer}>
            <Skeleton height={40} width="50%" radius="sm" mt={32} style={{ alignSelf: 'center' }} />{' '}
            {/* Title */}
            <Flex
              rowGap={{ base: '30px', sm: '48px' }}
              columnGap={{ base: '16px', sm: '32px' }}
              wrap={'wrap'}
              justify={'center'}
            >
              <Skeleton className={styles.teamCard} />
              <Skeleton className={styles.teamCard} />
              <Skeleton className={styles.teamCard} />
              <Skeleton className={styles.teamCard} />
            </Flex>
          </Stack>
        </Container>
      </section>
    );
  }

  return (
    <BackgroundSection id="impressum" background="linear-gradient(150deg, #a1b9e1 0%, #F4F6FB 70%)">
      <Container size="md" py={{ base: '80px', sm: '150px' }} className={styles.teamsContainer}>
        <Title ta={'center'} fw={600} ff={'Hind Vadodara'} c={'g-dark.9'}>
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
