import { FC, forwardRef } from 'react';
import styles from './Hero.module.scss';

const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  return <div className={styles.background} ref={ref} />;
});

Hero.displayName = 'Hero';
export default Hero;
