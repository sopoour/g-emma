import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Layout.module.scss';
import Logo from '@app/assets/Logo.png';
import { AppShell, Burger, Flex, Group, Image, Text } from '@mantine/core';
import { useDisclosure, useIntersection, useMediaQuery } from '@mantine/hooks';
import LinkContainer from '../LinkContainer/LinkContainer';
import { IconLink } from '@app/types';
import Hero from '../sections/Hero/Hero';
import { animateScroll, Link } from 'react-scroll';

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
  const [opened, { toggle, close }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const currentYear = new Date().getFullYear();
  const [scrolled, setScrolled] = useState<Boolean>(false);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.1,
  });
  const navbarClass = scrolled ? `${styles.navbarBg} ${styles.navbarScrolled}` : styles.navbarBg;

  const navLinkItems = navLinks.map((item, index) => {
    const itemHref = item.label.toLowerCase();

    return (
      <Link
        key={item.label + index}
        id={item.label}
        activeClass={styles.active}
        href={`#${itemHref}`}
        to={itemHref}
        className={styles.navLink}
        spy
        smooth
        offset={isMobile ? -50 : 0}
        duration={700}
        onClick={close}
      >
        {item.label}
      </Link>
    );
  });

  useEffect(() => {
    setScrolled(entry?.isIntersecting === false);
  }, [entry]);

  return (
    <AppShell
      header={{ height: 64 }}
      bg={'g-light.1'}
      navbar={{ width: '100%', breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      styles={{
        root: { '--app-shell-border-color': 'transparent' },
      }}
    >
      <AppShell.Header className={navbarClass}>
        <Group h="100%" px="xl" w="100%">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap={2} visibleFrom="md">
              {navLinkItems}
            </Group>
            <Image
              src={Logo.src}
              alt="Logo"
              style={{ maxHeight: '45px', cursor: 'pointer' }}
              onClick={() => animateScroll.scrollTo(0, { smooth: true, duration: 800 })}
            />
            <Group visibleFrom="md">
              <LinkContainer iconLinks={links} />
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
              color={scrolled ? 'g-light.1' : 'g-dark.9'}
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        py="md"
        px={4}
        bg={scrolled ? 'g-dark.9' : 'g-light.1'}
        style={{
          justifyContent: 'right',
          gap: 8,
          width: '50%',
          top: 0,
        }}
        className={navbarClass}
      >
        <Group
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingInline: 'var(--mantine-spacing-xl)',
            paddingBlock: 'var(--mantine-spacing-xl)',
            scrollBehavior: 'smooth',
          }}
        >
          {navLinkItems}
        </Group>
        <LinkContainer size="small" iconLinks={links} className={styles.linkContainerMobile} />
      </AppShell.Navbar>
      <AppShell.Section>
        <Hero ref={ref} />
      </AppShell.Section>
      <AppShell.Main style={{ marginBottom: '65px' }}>{children}</AppShell.Main>
      <AppShell.Footer bg="g-dark.9" color="g-light.0">
        <Flex direction={'row'} align={'center'} justify={'center'} h={64}>
          <Text c={'g-light.0'}>Copyright {currentYear} © G&apos;emma GbR</Text>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
