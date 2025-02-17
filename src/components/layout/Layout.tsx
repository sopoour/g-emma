import React, { FC, ReactNode } from 'react';
import styles from './Layout.module.scss';
import Logo from '@app/assets/Logo.png';
import { AppShell, Burger, Flex, Group, Image, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LinkContainer from '../LinkContainer';
import { IconLink } from '@app/types';

const links: IconLink[] = [
  { type: 'instagram' },
  { type: 'tiktok' },
  { type: 'spotify' },
  { type: 'appleMusic' },
  { type: 'youtube' },
  { type: 'email' },
];

const navLinks = [
  { label: 'Live' },
  { label: 'About' },
  { label: 'Music' },
  { label: 'Videos' },
  { label: 'Shop' },
  { label: 'Contact' },
];

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const navLinkItems = navLinks.map((item, index) => (
    <NavLink
      label={item.label}
      key={item.label}
      w="max-content"
      variant="subtle"
      color="g-light.1"
      active
      py={4}
      px={8}
      className={styles.navLink}
    />
  ));

  return (
    <AppShell
      header={{ height: 64 }}
      bg={'g-light.1'}
      navbar={{ width: '100%', breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      styles={{
        root: { '--app-shell-border-color': 'transparent' },
      }}
    >
      <AppShell.Header bg={'g-dark.9'}>
        <Group h="100%" px="xl" w="100%">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={2} visibleFrom="md">
              {navLinkItems}
            </Group>
            <Image src={Logo.src} alt="Logo" style={{ maxHeight: '45px' }} />
            <Group visibleFrom="md">
              <LinkContainer iconLinks={links} />
            </Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="g-light.1" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4} bg={'g-dark.9'} style={{ justifyContent: 'right', gap: 8 }}>
        <Group
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingInline: 'var(--mantine-spacing-xl)',
            paddingBlock: 'var(--mantine-spacing-xl)',
          }}
        >
          {navLinkItems}
        </Group>
        <LinkContainer size="small" iconLinks={links} className={styles.linkContainerMobile} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer bg="g-dark.9" color="g-light.1">
        <Flex direction={'row'} align={'center'} justify={'center'} h={64}>
          <Text c={'g-light.1'}>Copyright 2025 © G&apos;emma GbR</Text>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
