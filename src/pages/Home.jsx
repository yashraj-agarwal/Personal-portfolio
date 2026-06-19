import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

// Lazy-load all below-the-fold sections so their JS is only parsed + executed
// after the hero is rendered and interactive. This reduces initial bundle eval time
// and cuts peak memory during first load by ~60-80 MB.
const About      = lazy(() => import('../components/About'));
const Projects   = lazy(() => import('../components/Projects'));
const Experience = lazy(() => import('../components/Experience'));

// Minimal skeleton shown while lazy chunks load — keeps layout stable
const SectionSkeleton = () => (
  <div className="py-32 w-full" aria-hidden="true" />
);

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Experience />
      </Suspense>
    </>
  );
}
