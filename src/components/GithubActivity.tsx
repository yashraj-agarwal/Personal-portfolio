import React from 'react';
import { GithubCalendar } from '@/components/ui/retro-space-shooter-git-hub-calendar';
import Reveal from './Reveal';

export default function GithubActivity() {
  return (
    <div className="w-fit flex flex-col items-center">
      <Reveal>
        <div className="w-full max-w-[90vw] md:max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10 w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
            <GithubCalendar
              username="yashraj-agarwal"
              cellSize={14}
              cellGap={4}
              className="w-full"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
