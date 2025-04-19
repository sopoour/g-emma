import { forwardRef, useRef, useEffect } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIntersection } from '@mantine/hooks';
import { GeneralContent } from '@app/services/graphql/types';
import { fetcher } from '@app/hooks/fetch/useFetch';
import useSWR, { SWRConfiguration } from 'swr';
import { IoIosArrowDown } from 'react-icons/io';
import { scroller } from 'react-scroll';
import ContentfulImage from '@app/lib/contentful-image';
import { Title, VisuallyHidden } from '@mantine/core';

gsap.registerPlugin(useGSAP);

function random(min: number, max: number) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

const butterFlyFiles = [
  'assets/hero/butterfly_0.svg',
  'assets/hero/butterfly_1.svg',
  'assets/hero/butterfly_2.svg',
  'assets/hero/butterfly_3.svg',
  'assets/hero/butterfly_4.svg',
  'assets/hero/butterfly_5.svg',
  'assets/hero/butterfly_6.svg',
  'assets/hero/butterfly_7.svg',
];

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  const { data: generalContentData } = useSWR<GeneralContent | null>(
    '/api/generalContent',
    fetcher,
    {},
  );
  const butterflyRefs = useRef<Array<HTMLImageElement | null>>([null]);
  const { ref: intersectionRef, entry } = useIntersection({
    threshold: 0.75,
  });

  const animateProperty = (target: HTMLImageElement, prop: string, min: number, max: number) => {
    gsap?.to(target, {
      duration: random(2, 4),
      [prop]: random(min, max),
      ease: 'sine.inAndOut',
      onComplete: animateProperty,
      onCompleteParams: [target, prop, min, max],
    });
  };

  const animateButterfly = (butterfly: HTMLImageElement, width: number, height: number) => {
    const dx = width * 0.8;
    const dy = height * 0.8;
    const newX = random(-dx / 10, dx);
    const newY = random(-dy / 10, dy);
    const angle = Math.atan2(newY - butterfly.y, newX - butterfly.x) * (180 / Math.PI);

    gsap.set(butterfly, { xPercent: -50, yPercent: -50 });

    animateProperty(butterfly, 'scale', random(0.7, 1), random(0.5, 1));
    gsap.to(butterfly, {
      duration: random(2, 4),
      x: newX,
      y: newY,
      rotation: angle,
      ease: 'sine.inAndOut',
      onComplete: () => animateButterfly(butterfly, width, height),
    });
  };

  const startAnimations = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    butterflyRefs.current.forEach((butterfly, index) => {
      if (!butterfly) return;
      animateButterfly(butterfly, width, height);
    });
  };

  const stopAnimations = () => {
    gsap.globalTimeline.clear();
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      startAnimations();
    } else {
      stopAnimations();
    }
  }, [entry?.isIntersecting]);

  return (
    <div
      className={styles.background}
      ref={ref}
      style={{
        position: 'relative',
      }}
    >
      <div
        ref={intersectionRef}
        id="wrapperButterflies"
        style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
      >
        <VisuallyHidden component={'h1'}>G'emma Music</VisuallyHidden>
        {generalContentData?.heroImage?.url && (
          <ContentfulImage
            src={generalContentData?.heroImage?.url}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 13%' }}
            priority
            alt={'Hero Background'}
          />
        )}
        {butterFlyFiles.map((butterfly, index) => (
          <Image
            key={index}
            alt={`Butterfly ${index}`}
            src={butterfly}
            width={80}
            height={80}
            priority
            ref={(ref) => {
              butterflyRefs.current[index] = ref;
            }}
          />
        ))}
        <button
          className={styles.arrowButtonContainer}
          onClick={() => scroller.scrollTo('live', { smooth: true, duration: 800 })}
          title="Scroll down to see the latest live shows"
        >
          <IoIosArrowDown />
          <IoIosArrowDown className={styles.arrowFadeElement} />
          <IoIosArrowDown className={styles.arrowFadeElement} />
        </button>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';
export default Hero;
