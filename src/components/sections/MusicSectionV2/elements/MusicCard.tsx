import ContentfulImage from '@app/lib/contentful-image';
import { Music } from '@app/services/graphql/types';
import { Card, em } from '@mantine/core';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './MusicCard.module.scss';
import useKeyPress from '@app/hooks/useKeyPress';
import useClickOutside from '@app/hooks/useClickOutside';
import { useMediaQuery } from '@mantine/hooks';

const MAX_VISIBILITY = 3;

type Props = {
  music: Music;
  activeIndex: number;
  musicIndex: number;
};

const MusicCard: FC<Props> = ({ music, activeIndex, musicIndex }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  /*  const isDesktop = useMedia(Breakpoints.xs); */
  const arrowRightPressed = useKeyPress('ArrowRight');
  const arrowLeftPressed = useKeyPress('ArrowLeft');
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  const basicStyle = {
    '--music-title': `"${music.musicTitle}"`,
    '--offset': `${(activeIndex - musicIndex) / 3}`,
    '--absOffset': `${Math.abs(activeIndex - musicIndex) / 3}`,
    '--direction': `${Math.sign(activeIndex - musicIndex)}`,
  };

  useEffect(() => {
    // if user uses arrows to navigate then make sure the correct card is in focus so onEnter it turns
    if (activeIndex === musicIndex && (arrowLeftPressed || arrowRightPressed))
      return ref.current?.focus();
  }, [activeIndex, musicIndex, arrowLeftPressed, arrowRightPressed]);
  return (
    <Card
      /*  shadow="xl" */
      padding="xl"
      radius="md"
      component="a"
      href={music.url || ''}
      target="_blank"
      key={music.musicTitle}
      className={styles.musicCard}
      style={
        isMobile
          ? {
              ...basicStyle,
            }
          : {
              ...basicStyle,
              opacity: Math.abs(activeIndex - musicIndex) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(activeIndex - musicIndex) > MAX_VISIBILITY ? 'none' : 'block',
              pointerEvents: activeIndex === musicIndex ? 'auto' : 'none',
            }
      }
      ref={ref}
      aria-label={`${music.musicTitle}-music-card`}
      tabIndex={activeIndex === musicIndex ? 0 : -1}
    >
      <ContentfulImage
        src={music.musicCover?.url || ''}
        fill
        objectFit="cover"
        alt={music.musicTitle}
      />
    </Card>
  );
};

export default MusicCard;
