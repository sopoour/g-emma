import { Container } from '@mantine/core';
import { FC, ReactNode } from 'react';
import styles from './SectionContainer.module.scss';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const SectionContainer: FC<Props> = ({ id, children, className, style }) => (
  <Container
    size={'md'}
    component={'section'}
    id={id}
    className={`${styles.sectionContainer} ${className}`}
    style={style}
  >
    {children}
  </Container>
);

export default SectionContainer;
