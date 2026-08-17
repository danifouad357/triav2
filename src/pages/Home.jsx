import { useState, useEffect } from 'react';
import CinematicSequence from '@/components/sections/CinematicSequence';
import MobileHero from '@/components/sections/MobileHero';
import SelectedWork from '@/components/SelectedWork';
import WhyTria from '@/components/WhyTria';
import Capabilities from '@/components/Capabilities';
import Process from '@/components/Process';
import InsideProject from '@/components/InsideProject';
import Studio from '@/components/Studio';
import FAQ from '@/components/FAQ';
import StartProject from '@/components/StartProject';


import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useSEO({
    title: 'Independent Web Design & Development Studio',
    description: 'Tria Design builds distinctive digital experiences for ambitious businesses. Custom web design, development, and strategic execution.'
  });

  return (
    <main>
      {isMobile ? <MobileHero /> : <CinematicSequence />}
      <SelectedWork />
      <WhyTria />
      <Capabilities />
      <Process />
      <InsideProject />
      <Studio />
      <FAQ />
      <StartProject />
    </main>
  );
}
