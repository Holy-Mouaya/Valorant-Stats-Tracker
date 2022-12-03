import React from 'react';
import IntroCard from '../IntroCard';
import GraphCard from '../GraphCard';
import WinrateCard from '../WinrateCard';
import GamesCard from '../GamesCard';
//import HeroSection from '../HeroSection';

function StatsDisplay() {
  return (
    <div className='cardHolder'>
      <div className='introFeature'>
        <IntroCard/>
      </div>
      <div className='graphFeature'>
        <GraphCard/>
      </div>
      <div className='winrateFeature'>
        <WinrateCard/>
      </div>
      <div className='gamesFeature'>
        <GamesCard/>
      </div>

    </div>
  )
}

export default StatsDisplay