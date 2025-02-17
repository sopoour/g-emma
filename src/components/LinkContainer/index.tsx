import { FC, useMemo } from 'react';
import Link from 'next/link';
import styles from './LinkContainer.module.scss';
import { Flex } from '@mantine/core';
import { IconLink } from '@app/types';
import { FaEnvelope, FaInstagram, FaTiktok, FaSpotify, FaMusic, FaYoutube } from 'react-icons/fa';

type Size = 'small' | 'medium' | 'big';

type Props = {
  iconLinks: IconLink[];
  size?: Size;
  className?: string;
  ariaLabel?: string;
};

const LinkContainer: FC<Props> = ({ iconLinks, className, ariaLabel, size = 'medium' }) => {
  const links = useMemo(
    () =>
      iconLinks.map((icon) => {
        switch (icon.type) {
          case 'tiktok':
            return {
              id: 'tiktok',
              icon: <FaTiktok />,
              link: 'https://www.tiktok.com/@gemma.msc',
            };
          case 'spotify':
            return {
              id: 'spotify',
              icon: <FaSpotify />,
              link: 'https://open.spotify.com/artist/6ZEMlHydJRHREpHwmNza4T?si=L5NhpgmwSmO2AmJAjRnxWw',
            };
          case 'email':
            return { id: 'email', icon: <FaEnvelope />, link: 'mailto:contact@g-emma.com' };
          case 'instagram':
            return {
              id: 'instagram',
              icon: <FaInstagram />,
              link: 'https://www.instagram.com/gemma.msc/',
            };
          case 'appleMusic':
            return {
              id: 'appleMusic',
              icon: <FaMusic />,
              link: 'https://music.apple.com/dk/artist/gemma/1469747172',
            };
          case 'youtube':
            return {
              id: 'youtube',
              icon: <FaYoutube />,
              link: 'https://youtube.com/channel/UCAIXGihT2_TrYTazM_hkz2w?si=_FBfx7tTdjTPl9on',
            };
          default:
            return { id: 'email', icon: <FaEnvelope />, link: 'mailto:contact@g-emma.com' };
        }
      }),
    [iconLinks],
  );

  return (
    <Flex
      gap={size === 'small' ? 'lg' : 'xl'}
      direction={'row'}
      align={'center'}
      aria-label={ariaLabel ?? 'Social Media links'}
      className={`${styles.linkContainer} ${className}`}
      style={{ '--svg-size': `var(--svg-${size})` }}
    >
      {links?.map(
        (item) =>
          item.link && (
            <Link href={item.link} key={item.id} target="_blank" aria-label={item.id}>
              {item.icon}
            </Link>
          ),
      )}
    </Flex>
  );
};

export default LinkContainer;
