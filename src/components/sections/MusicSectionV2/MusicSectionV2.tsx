import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Music } from '@app/services/graphql/types';
import { ISOToYear } from '@app/utils/formatDate';
import { Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './MusicSectionV2.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useKeyPress from '@app/hooks/useKeyPress';
import MusicCard from './elements/MusicCard';

const MusicSectionV2: FC = () => {
  const { data, isLoading } = useSWR<Music[] | null>('/api/music', fetcher);
  /* const groupedAlbumCollection = useMemo(() => {
    const grouped = data?.reduce<Record<string, Music[]>>((acc, item) => {
      if (item.albumCollection && !acc[item.albumCollection]) {
        acc[item.albumCollection] = [];
      }
      item.albumCollection && acc[item.albumCollection].push(item);
      return acc;
    }, {});

    return (
      grouped &&
      Object.entries(grouped)
        .map(([albumCollection, musicCollection]) => {
          // Sort music within each collection by releaseDate (descending)
          musicCollection.sort(
            (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
          );

          // Get latest release date (first element after sorting)
          const latestReleaseDate = musicCollection[0]?.releaseDate || '1970-01-01T00:00:00.000Z';

          return {
            musicCollectionTitle: albumCollection,
            musicCollection,
            latestReleaseDate,
          };
        })
        // Sort album groups by latest release date (descending)
        .sort(
          (a, b) =>
            new Date(b.latestReleaseDate).getTime() - new Date(a.latestReleaseDate).getTime(),
        )
    );
  }, [data]); */

  const [activeCard, setActiveCard] = useState<number>(0);
  const handleNext = () => data && setActiveCard((prevIndex) => prevIndex + 1);
  const handlePrev = () => data && setActiveCard((prevIndex) => prevIndex - 1);

  const arrowRightPressed = useKeyPress('ArrowRight');
  const arrowLeftPressed = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (arrowLeftPressed && activeCard !== 0) handlePrev();
    if (arrowRightPressed && activeCard + 1 !== data?.length) handleNext();
  }, [arrowLeftPressed, arrowRightPressed]);

  return (
    <SectionContainer id="music.v2" className={styles.musicSection}>
      {data && (
        <Text size={'32px'} fw={700} ff="BioRhyme" c={'g-dark.9'} ta="center">
          {data[activeCard]?.albumCollection} ({ISOToYear(data[activeCard]?.releaseDate)})
        </Text>
      )}
      <div className={styles.carousel}>
        {activeCard !== 0 && (
          <button className={`${styles.navButton} ${styles.left}`} onClick={handlePrev}>
            <IoIosArrowBack focusable="false" aria-hidden="true" />
          </button>
        )}
        {activeCard + 1 !== data?.length && (
          <button className={`${styles.navButton} ${styles.right}`} onClick={handleNext}>
            <IoIosArrowForward focusable="false" aria-hidden="true" />
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
            />
          ))}
      </div>
    </SectionContainer>
  );
};

export default MusicSectionV2;
