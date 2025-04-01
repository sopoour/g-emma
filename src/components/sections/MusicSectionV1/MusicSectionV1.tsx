import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Music } from '@app/services/graphql/types';
import { ISOToYear } from '@app/utils/formatDate';
import { Card, Flex, Text } from '@mantine/core';
import { FC, useMemo, useState } from 'react';
import useSWR from 'swr';
import styles from './MusicSectionV1.module.scss';
import ContentfulImage from '@app/lib/contentful-image';

const MusicSectionV1: FC = () => {
  const { data, isLoading } = useSWR<Music[] | null>('/api/music', fetcher);
  const groupedAlbumCollection = useMemo(() => {
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
  }, [data]);

  return (
    <SectionContainer id="music" className={styles.musicSection}>
      {groupedAlbumCollection?.map((musicCollection) => (
        <Flex
          align="flex-start"
          direction="column"
          gap={'lg'}
          key={musicCollection.musicCollectionTitle}
        >
          <Text size={'24px'} fw={700} ff="BioRhyme" c={'g-dark.9'}>
            {musicCollection.musicCollectionTitle} ({ISOToYear(musicCollection.latestReleaseDate)})
          </Text>
          <Flex direction={'row'} gap={'lg'} align={'center'} className={styles.cardContainer}>
            {musicCollection.musicCollection.map((music) => (
              <Card
                shadow="xs"
                padding="xl"
                radius="md"
                component="a"
                href={music.url || ''}
                target="_blank"
                key={music.musicTitle}
                className={styles.musicCard}
                style={{ '--music-title': `"${music.musicTitle}"` }}
              >
                <ContentfulImage
                  src={music.musicCover?.url || ''}
                  fill
                  objectFit="cover"
                  alt={music.musicTitle}
                />
              </Card>
            ))}
          </Flex>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default MusicSectionV1;
