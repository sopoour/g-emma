import { Container } from '@mantine/core';
import { FC, ReactNode } from 'react';
import styles from './SectionContainer.module.scss';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

const SectionContainer: FC<Props> = ({ id, children, className }) => (
  <Container
    size={'md'}
    component={'section'}
    id={id}
    className={`${styles.sectionContainer} ${className}`}
  >
    {children}
  </Container>
);

export default SectionContainer;
