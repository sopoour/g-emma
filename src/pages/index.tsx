import About from '@app/components/sections/About/About';
import Contact from '@app/components/sections/Contact/Contact';
import Live from '@app/components/sections/Live/Live';
import MusicSectionV1 from '@app/components/sections/MusicSectionV1/MusicSectionV1';
import MusicSectionV2 from '@app/components/sections/MusicSectionV2/MusicSectionV2';
import Videos from '@app/components/sections/Videos/Videos';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Live />
    <About />
    <MusicSectionV1 />
    <MusicSectionV2 />
    <Videos />
    <Contact />
  </>
);

export default Home;
