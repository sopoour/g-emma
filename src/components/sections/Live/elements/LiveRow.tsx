import { ISOToDate } from '@app/utils/formatDate';
import { Flex, Text } from '@mantine/core';
import { FC } from 'react';
import styles from '../Live.module.scss';

type Props = {
  date: string;
  eventType: string;
  location: string;
  constellation: string;
};

const LiveRow: FC<Props> = ({ date, location, eventType, constellation }) => {
  return (
    <Flex direction={'row'} gap={'md'} justify={'space-between'} className={styles.liveRow}>
      <Flex direction={'column'}>
        <Text fw={600}>{ISOToDate(date)}</Text>
        <Text>{eventType}</Text>
      </Flex>
      <Text>{location}</Text>
      <Text>{constellation}</Text>
    </Flex>
  );
};

export default LiveRow;
