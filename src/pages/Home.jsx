import { useState } from 'react';
import CinematicSequence from '@/components/sections/CinematicSequence';
import SelectedWork from '@/components/SelectedWork';
import WhyTria from '@/components/WhyTria';
import Capabilities from '@/components/Capabilities';
import Process from '@/components/Process';
import InsideProject from '@/components/InsideProject';
import Studio from '@/components/Studio';
import FAQ from '@/components/FAQ';
import StartProject from '@/components/StartProject';
import RotateDeviceOverlay from '@/components/RotateDeviceOverlay';

import { useSEO } from '@/hooks/useSEO';

export default function Home() {
  const [isRotationBlocked, setIsRotationBlocked] = useState(false);

  useSEO({
    title: 'Independent Web Design & Development Studio',
    description: 'Tria Design builds distinctive digital experiences for ambitious businesses. Custom web design, development, and strategic execution.'
  });

  return (
    <main>
      <RotateDeviceOverlay onActiveChange={setIsRotationBlocked} />
      <CinematicSequence isPaused={isRotationBlocked} />
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
