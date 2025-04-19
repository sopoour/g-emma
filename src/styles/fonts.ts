import { Hind Vadodara, Roboto_Mono } from 'next/font/google';

// define your variable fonts
const Hind Vadodara = Hind Vadodara({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  display: 'block',
  preload: true,
});
const robotoMono = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  fallback: ['monospace'],
  preload: true,
});

export { Hind Vadodara, robotoMono };
