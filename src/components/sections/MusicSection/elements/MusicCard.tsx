import ContentfulImage from '@app/lib/contentful-image';
import { Music } from '@app/services/graphql/types';
import { Card } from '@mantine/core';
import { FC, useEffect, useRef } from 'react';
import styles from './MusicCard.module.scss';
import useKeyPress from '@app/hooks/useKeyPress';
import { useIntersection, useMediaQuery } from '@mantine/hooks';

const MAX_VISIBILITY = 3;

type Props = {
  music: Music;
  activeIndex: number;
  musicIndex: number;
  onActiveCardChange: (index: number) => void;
};

const MusicCard: FC<Props> = ({ music, activeIndex, musicIndex, onActiveCardChange }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const arrowRightPressed = useKeyPress('ArrowRight');
  const arrowLeftPressed = useKeyPress('ArrowLeft');
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  const { ref: intersectionRef, entry } = useIntersection({
    root: null,
    threshold: 0.6,
    rootMargin: '0px',
  });

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

  // Keeping track on mobile which is the active card so that the title changes
  useEffect(() => {
    if (entry?.isIntersecting && isMobile) {
      onActiveCardChange(musicIndex);
    }
  }, [entry, musicIndex, onActiveCardChange, isMobile]);

  return (
    <Card
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
        alt={music.musicTitle}
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
        ref={intersectionRef}
      />
    </Card>
  );
};

export default MusicCard;
