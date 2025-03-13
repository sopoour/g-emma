import { Container, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import { FC } from 'react';
import styles from './Live.module.scss';

const Live: FC = () => {
  return (
    <section>
      <Container size={'lg'}>
        <Flex direction={'row'} gap={'lg'}>
          <Title size={'md'}>Upcoming Shows</Title>
          <Flex direction={'column'} gap={'xl'} className={styles.liveGrid}>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={'md'} justify={'space-evenly'}>
              <Flex direction={'column'}>
                <Text fw={600}>02.06.2024</Text>
                <Text>Buskers Festival</Text>
              </Flex>
              <Text>Braunschweig</Text>
              <Text>TRIO</Text>
            </Flex>
            <Flex direction={'row'} gap={'md'} justify={'space-evenly'}>
              <Flex direction={'column'}>
                <Text fw={600}>02.06.2024</Text>
                <Text>Buskers Festival</Text>
              </Flex>
              <Text>Braunschweig</Text>
              <Text>TRIO</Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export default Live;
