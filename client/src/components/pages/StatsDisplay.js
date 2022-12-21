import React from 'react';
import IntroCard from '../IntroCard';
import GraphCard from '../GraphCard';
import WinrateCard from '../WinrateCard';
import GamesCard from '../GamesCard';
import {Helmet} from 'react-helmet'
import NameCard from '../NameCard';
import BackButton from '../BackButton';

function StatsDisplay() {
  return (
    <div className='cardHolder'>
      <Helmet>
        <style>{'body { background-color: #0a0817; }'}</style>
      </Helmet>
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
      <div className='nameFeature'>
        <NameCard/>
      </div>
      <div className='buttonFeature'>
        <BackButton/>
      </div>
    </div>
  )
}

export default StatsDisplay