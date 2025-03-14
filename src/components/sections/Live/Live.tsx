import { Container, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import { FC } from 'react';
import styles from './Live.module.scss';
import LiveRow from './elements/LiveRow';

const liveData = [
  {
    date: '2024-07-07T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'TRIO',
  },
  {
    date: '2024-06-02T12:00:00.000Z',
    eventType: 'Buskers Festival',
    location: 'Braunschweig',
    constellation: 'Band',
  },
];

const Live: FC = () => {
  return (
    <Container
      size={'md'}
      component={'section'}
      id="live"
      style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
    >
      <Flex
        direction={{ base: 'column', xs: 'row' }}
        gap={'xl'}
        justify={'space-between'}
        align={{ base: 'center', xs: 'stretch' }}
        style={{ width: '100%' }}
      >
        <Text size={'lg'} fw={700} ff={'BioRhyme'} style={{ whiteSpace: 'nowrap' }}>
          Upcoming Shows
        </Text>
        <Flex
          direction={'column'}
          className={styles.liveGrid}
          align={{ base: 'center', xs: 'stretch' }}
        >
          {liveData.map((live) => (
            <LiveRow key={live.date} {...live} />
          ))}
        </Flex>
      </Flex>

      <Flex
        direction={{ base: 'column', xs: 'row' }}
        gap={'xl'}
        align={{ base: 'center', xs: 'stretch' }}
        justify={'space-between'}
        style={{ width: '100%' }}
      >
        <Text size={'lg'} fw={700} ff={'BioRhyme'} style={{ whiteSpace: 'nowrap' }}>
          Past Shows
        </Text>
        <Flex
          direction={'column'}
          className={styles.liveGrid}
          align={{ base: 'center', xs: 'stretch' }}
        >
          {liveData.map((live) => (
            <LiveRow key={live.date} {...live} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Live;
