import { forwardRef, useRef } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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
];

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const butterflyRefs = useRef<Array<HTMLImageElement | null>>([null]);

  const animateProperty = (target: HTMLImageElement, prop: string, min: number, max: number) => {
    gsap?.to(target, {
      duration: random(2, 4),
      [prop]: random(min, max),
      ease: 'sine.inAndOut',
      onComplete: animateProperty,
      onCompleteParams: [target, prop, min, max],
    });
  };

  useGSAP(
    () => {
      if (!container.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      butterflyRefs.current.forEach((butterfly, index) => {
        if (!butterfly) return;
        const dx = width * 0.8;
        const dy = height * 0.8;

        gsap.set(butterfly, { xPercent: -50, yPercent: -50 });

        animateProperty(butterfly, 'scale', random(0.7, 1), random(0.5, 1));
        animateProperty(butterfly, 'x', 0, dx);
        animateProperty(butterfly, 'y', 0, dy);
      });
    },
    { scope: container },
  );

  return (
    <div className={styles.background} ref={ref}>
      <div
        ref={container}
        id="wrapperBirds"
        style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
      >
        {butterFlyFiles.map((butterfly, index) => (
          <Image
            key={index}
            alt={`Butterfly ${index}`}
            src={butterfly}
            width={70}
            height={70}
            priority
            ref={(ref) => {
              butterflyRefs.current[index] = ref;
            }}
          />
        ))}
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';
export default Hero;
