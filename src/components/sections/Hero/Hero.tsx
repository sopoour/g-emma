import { FC, forwardRef, useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

type Butterfly = {
  id: number;
  x: number;
  y: number;
  delay: number;
  rotation: number;
  scale: number;
  butterflySrc: string;
  endX: number;
  endY: number;
};

// List of available butterfly SVGs
const butterflyFiles = [
  '/assets/butterfly_0.svg',
  '/assets/butterfly_1.svg',
  '/assets/butterfly_2.svg',
  '/assets/butterfly_3.svg',
  '/assets/butterfly_4.svg',
];

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  const [mounted, setMounted] = useState(false);

  // Variants for infinite flying effect with random end locations
  const flyIn = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    delay: number,
    rotation: number,
  ): Variants => ({
    initial: { x: startX, y: startY, rotate: rotation, opacity: 1 },
    animate: {
      x: endX, // End at random X position
      y: endY, // End at random Y position
      rotate: 0, // Return to default rotation
      opacity: 1,
      transition: {
        duration: 5,
        delay,
        ease: 'easeInOut',
        repeat: Infinity, // Infinite loop
        repeatType: 'mirror',
      },
    },
  });

  // Update the butterfly's position after each animation cycle
  const updateButterflyPosition = (id: number) => {
    setButterflies((prevButterflies) =>
      prevButterflies.map((butterfly) =>
        butterfly.id === id
          ? {
              ...butterfly,
              x: butterfly.endX, // New start position = previous end position
              y: butterfly.endY, // New start position = previous end position
              endX: Math.random() * (window.innerWidth - 100), // New random destination
              endY: Math.random() * (window.innerHeight - 100), // New random destination
            }
          : butterfly,
      ),
    );
  };

  useEffect(() => {
    setMounted(true);
    const generateButterflies = Array.from({ length: 5 }, (_, id) => ({
      id,
      x: Math.random() > 0.5 ? -200 : 200, // Random left (-) or right (+) off-screen start
      y: Math.random() * window.innerHeight - 300, // Random height off-screen
      delay: Math.random() * 1.5, // Random delay for natural entry
      rotation: Math.random() * 60 - 30, // Random rotation between -30 and +30 degrees
      scale: Math.random() > 0.5 ? 1 : -1, // Random flip effect
      butterflySrc: butterflyFiles[id], // Random butterfly
      // Bound end locations within the visible window (taking into account the butterfly's size)
      endX: Math.random() * (window.innerWidth - 100), // Avoid going out of view horizontally
      endY: Math.random() * (window.innerHeight - 100), // Avoid going out of view vertically
    }));
    setButterflies(generateButterflies);
  }, []);

  return (
    <div className={styles.background} ref={ref}>
      {butterflies.map(({ id, x, y, endX, endY, delay, rotation, scale, butterflySrc }) => (
        <motion.div
          key={id}
          variants={flyIn(x, y, endX, endY, delay, rotation)}
          initial="initial"
          animate={'animate'} // Pause on scroll
          onAnimationComplete={() => updateButterflyPosition(id)}
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            transform: `scaleX(${scale})`, // Flip effect
          }}
        >
          <Image
            src={butterflySrc} // Dynamically select the butterfly SVG
            alt={`Butterfly ${id}`}
            width={60}
            height={60}
            priority
          />
        </motion.div>
      ))}
    </div>
  );
});

Hero.displayName = 'Hero';
export default Hero;
