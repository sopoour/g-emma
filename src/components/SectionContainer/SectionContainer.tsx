import { Container } from '@mantine/core';
import { FC, ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
};

const SectionContainer: FC<Props> = ({ id, children }) => (
  <Container
    size={'md'}
    component={'section'}
    id={id}
    style={{ padding: '64px 0', height: '100vh', margin: '0 auto' }}
  >
    {children}
  </Container>
);

export default SectionContainer;
