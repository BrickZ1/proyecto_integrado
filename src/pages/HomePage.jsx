import React from 'react';
import HeroSection from '../components/informacion/HeroSection';
import AtractivosGrid from '../components/informacion/AtractivosGrid';
import ProyectoInfo from '../components/informacion/ProyectoInfo';
import Comunidades from '../components/informacion/Comunidades';

export default function HomePage() {
  return (
    <div className="pb-12">
      <HeroSection />
      <div className="container mx-auto px-4">
        <AtractivosGrid />
        <ProyectoInfo />
        <Comunidades />
      </div>
    </div>
  );
}