import About from '@app/components/sections/About/About';
import Hero from '@app/components/sections/Hero/Hero';
import Live from '@app/components/sections/Live/Live';
import MusicSection from '@app/components/sections/MusicSection/MusicSection';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Live />
    <About />
    <MusicSection />
  </>
);

export default Home;
