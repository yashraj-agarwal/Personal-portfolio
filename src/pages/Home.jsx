import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Process from '../components/Process';
import Projects from '../components/Projects';
import Experience from '../components/Experience';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
    </>
  );
}
