import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import ImpactMetrics from '../components/ImpactMetrics';
import Transparency from '../components/Transparency';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <main>
      <Hero />
      <ImpactMetrics />
      <Features />
      <HowItWorks />
      <Transparency />
      <Footer />
    </main>
  );
}
