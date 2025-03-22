import { Container } from '@mantine/core';
import { FC, ReactNode } from 'react';
import styles from './SectionContainer.module.scss';

type Props = {
  id: string;
  children: ReactNode;
};

const SectionContainer: FC<Props> = ({ id, children }) => (
  <Container size={'md'} component={'section'} id={id} className={styles.sectionContainer}>
    {children}
  </Container>
);

export default SectionContainer;
