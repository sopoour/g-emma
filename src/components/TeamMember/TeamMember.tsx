import ContentfulImage from '@app/lib/contentful-image';
import { Team } from '@app/services/graphql/types';
import { FC, useMemo, useRef, useState } from 'react';
import styles from './TeamMember.module.scss';
import { Card, Flex, Text } from '@mantine/core';
import LinkContainer from '../LinkContainer/LinkContainer';
import { IconLink } from '@app/types';
import useClickOutside from '@app/hooks/useClickOutside';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  teamMember: Team;
};

const TeamMember: FC<Props> = ({ teamMember }) => {
  const [view, setView] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  const links: IconLink[] = useMemo(() => {
    let array: IconLink[] = [];
    if (teamMember.email) array.push({ type: 'email', link: 'mailto:' + teamMember.email });
    if (teamMember.website) array.push({ type: 'link', link: teamMember.website });
    if (teamMember.instagram) array.push({ type: 'instagram', link: teamMember.instagram });

    return array;
  }, [teamMember]);

  useClickOutside(ref, () => setView(false));

  return (
    <Flex direction={'column'} gap={'16px'} align={'center'}>
      <Card
        ref={ref}
        component={'button'}
        className={`${styles.teamCard} ${view ? styles.teamCardContentViewed : ''}`}
        onMouseEnter={() => !!teamMember.description && !isMobile && setView(true)}
        onMouseLeave={() => !!teamMember.description && !isMobile && setView(false)}
        onClick={() => !!teamMember.description && isMobile && setView((prev) => !prev)}
        style={!!teamMember.description ? { cursor: 'pointer' } : {}}
      >
        <Flex direction={'column'} gap={'40px'} justify={'center'} className={styles.description}>
          {teamMember.description && (
            <Text c={'g-dark.9'} ta="justify">
              {teamMember.description}
            </Text>
          )}
        </Flex>
        {teamMember?.picture && (
          <ContentfulImage
            src={teamMember.picture.url as string}
            fill
            className={styles.picture}
            alt={'Emma Portrait'}
            sizes="(max-width: 768px) 100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className={styles.role}>
          <Text fw={600} ff={'Hind Vadodara'} size="16px" c={'g-dark.9'}>
            {teamMember.name}
          </Text>
          <Text fw={600} ff={'Hind Vadodara'} size="16px" c={'g-dark.9'}>
            {teamMember.role}
          </Text>
        </div>
      </Card>

      <LinkContainer iconLinks={links} size="small" />
    </Flex>
  );
};

export default TeamMember;
