import React from 'react';
import { Header } from '@/components';
import AboutHero from '@/components/organisms/AboutHero';
import AboutMissionVision from '@/components/organisms/AboutMissionVision';
import AboutLogoExplanation from '@/components/organisms/AboutLogoExplanation';
import AboutStats from '@/components/organisms/AboutStats';
import AboutTeam from '@/components/organisms/AboutTeam';
import type { AboutData } from '@/lib/aboutMockData';
import Reveal from '@/components/atoms/Reveal';

interface AboutPageTemplateProps {
  data: AboutData;
  dict: any;
}

const AboutPageTemplate: React.FC<AboutPageTemplateProps> = ({ data, dict }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-6">
      {/* <Header dict={dict} /> */}

      <div className="pt-4 sm:pt-6" />
      <Reveal direction="up" durationMs={700}>
        <AboutHero title={data.hero.title} subtitle={data.hero.subtitle} backgroundImage={data.hero.backgroundImage} />
      </Reveal>
   
      {/* <div className="h-[2px] bg-gray-100"></div> */}
      <Reveal direction="up" delayMs={80}>
        <AboutMissionVision mission={data.mission} vision={data.vision} values={data.values} />
      </Reveal>

      {/* Logo Explanation Section */}
      <Reveal direction="up" delayMs={120}>
        <AboutLogoExplanation />
      </Reveal>

      {/* <div className="h-[2px] bg-gray-100"></div> */}
      <Reveal direction="up" delayMs={160}>
        <AboutStats stats={data.stats} />
      </Reveal>

      {/* <div className="h-[2px] bg-gray-100"></div> */}
      <Reveal direction="up" delayMs={200}>
        <AboutTeam team={data.team} />
      </Reveal>
    </div>
  );
};

export default AboutPageTemplate;


