import About from '@app/components/sections/About/About';
import Hero from '@app/components/sections/Hero/Hero';
import Live from '@app/components/sections/Live/Live';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Live />
    <About />
  </>
);

export default Home;
