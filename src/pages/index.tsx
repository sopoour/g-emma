import About from '@app/components/sections/About/About';
import Hero from '@app/components/sections/Hero/Hero';
import Live from '@app/components/sections/Live/Live';
import MusicSectionV1 from '@app/components/sections/MusicSectionV1/MusicSectionV1';
import MusicSectionV2 from '@app/components/sections/MusicSectionV2/MusicSectionV2';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Live />
    <About />
    <MusicSectionV1 />
    <MusicSectionV2 />
  </>
);

export default Home;
