import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Layout.module.scss';
import Logo from '@app/assets/Logo.png';
import { AppShell, Burger, Group, Image, Text } from '@mantine/core';
import { useDisclosure, useIntersection, useMediaQuery } from '@mantine/hooks';
import LinkContainer from '../LinkContainer/LinkContainer';
import { IconLink } from '@app/types';
import Hero from '../sections/Hero/Hero';
import { animateScroll, Link } from 'react-scroll';
import Sidebar from '../Sidebar/Sidebar';

const navLinks = [
  { label: 'Live' },
  { label: 'About' },
  { label: 'Music.v1' },
  { label: 'Music.v2' },
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
              <LinkContainer />
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
      <Sidebar
        open={opened}
        close={close}
        className={navbarClass}
        style={{
          backgroundColor: `${scrolled ? 'var(--mantine-color-g-dark-9)' : 'var(--mantine-color-g-dark-1)'}`,
        }}
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
        <LinkContainer size="small" className={styles.linkContainerMobile} />
      </Sidebar>
      <AppShell.Section>
        <Hero ref={ref} />
      </AppShell.Section>
      <AppShell.Main style={{ marginBottom: '65px', padding: '0' }}>{children}</AppShell.Main>
      <AppShell.Section
        component="footer"
        bg="g-dark.9"
        color="g-light.0"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64 }}
      >
        <Text c={'g-light.0'}>Copyright {currentYear} © G&apos;emma GbR</Text>
      </AppShell.Section>
    </AppShell>
  );
};

export default Layout;
