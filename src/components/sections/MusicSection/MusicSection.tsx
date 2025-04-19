import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Music } from '@app/services/graphql/types';
import { ISOToYear } from '@app/utils/formatDate';
import { Text, VisuallyHidden } from '@mantine/core';
import { FC, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import styles from './MusicSection.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useKeyPress from '@app/hooks/useKeyPress';
import MusicCard from './elements/MusicCard';
import { useMediaQuery } from '@mantine/hooks';

const MusicSectionV2: FC = () => {
  const { data, isLoading } = useSWR<Music[] | null>('/api/music', fetcher);
  const [activeCard, setActiveCard] = useState<number>(0);
  const isMobile = useMediaQuery(`(max-width: 48em)`);
  const handleNext = () => data && setActiveCard((prevIndex) => prevIndex + 1);
  const handlePrev = () => data && setActiveCard((prevIndex) => prevIndex - 1);

  const arrowRightPressed = useKeyPress('ArrowRight');
  const arrowLeftPressed = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (arrowLeftPressed && activeCard !== 0) handlePrev();
    if (arrowRightPressed && activeCard + 1 !== data?.length) handleNext();
  }, [arrowLeftPressed, arrowRightPressed]);

  return (
    <SectionContainer id="music" className={styles.musicSection}>
      {data && (
        <Text
          size={isMobile ? '24px' : '32px'}
          fw={700}
          ff="Lexend"
          c={'g-dark.9'}
          ta="center"
          style={{ padding: '0 16px' }}
        >
          {data[activeCard]?.albumCollection} ({ISOToYear(data[activeCard]?.releaseDate)})
        </Text>
      )}
      <div className={styles.carousel}>
        {activeCard !== 0 && (
          <button className={`${styles.navButton} ${styles.left}`} onClick={handlePrev}>
            <IoIosArrowBack focusable="false" aria-hidden="true" />
            <VisuallyHidden>Previous button</VisuallyHidden>
          </button>
        )}
        {activeCard + 1 !== data?.length && (
          <button className={`${styles.navButton} ${styles.right}`} onClick={handleNext}>
            <IoIosArrowForward focusable="false" aria-hidden="true" />
            <VisuallyHidden>Next button</VisuallyHidden>
          </button>
        )}

        {data
          ?.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          .map((music, index) => (
            <MusicCard
              music={music}
              musicIndex={index}
              activeIndex={activeCard}
              key={music.musicTitle}
              data-index={index}
              onActiveCardChange={setActiveCard}
            />
          ))}
      </div>
    </SectionContainer>
  );
};

export default MusicSectionV2;
