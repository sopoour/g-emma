import { ISOToDate } from '@app/utils/formatDate';
import { Flex, Grid, Text } from '@mantine/core';
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
    <Grid gutter={{ base: 's', xs: 'lg' }} columns={3} className={styles.liveRow}>
      <Grid.Col span={1}>
        <Text fw={600} c={'g-dark.9'}>
          {ISOToDate(date)}
        </Text>
        <Text c={'g-dark.9'}>{eventType}</Text>
      </Grid.Col>
      <Grid.Col span={1} style={{ textAlign: 'center' }}>
        <Text c={'g-dark.9'}> {location}</Text>
      </Grid.Col>
      <Grid.Col span={1} style={{ textAlign: 'center' }}>
        <Text c={'g-dark.9'}>{constellation}</Text>
      </Grid.Col>
    </Grid>
  );
};

export default LiveRow;
