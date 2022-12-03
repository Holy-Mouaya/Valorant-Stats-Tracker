import React, { useState } from 'react'
import './IntroCard.css'
//import GetForm from './GetForm'
import { useContext } from 'react'
import { usernameContext } from '../App'


function IntroCard() {
  //const [response, setResponse] = useState([]);
  const {value} = useContext(usernameContext);
  let userAgent, userRegion, userLevel, userKDA, userRank;
  const pageAccessedByReload = (
    (PerformanceNavigationTiming && PerformanceNavigationTiming.TYPE === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  );
  if(pageAccessedByReload){
    userAgent = localStorage.getItem('agentName');
    userRegion = localStorage.getItem('region');
    userLevel = localStorage.getItem('level');
    userRank = localStorage.getItem('rank');
    userKDA = localStorage.getItem('KDA');
  }
  else{
    userAgent = value[0];
    userRegion = value[1];
    userLevel = value[2];
    userRank = value[3].replace(/\s/g, '');
    userKDA = value[4];
  }
  if(userAgent == 'KAY/O'){
    userAgent = 'Kayo';
  }

  return (
    <div className='introCard'>
      <img className='rank-image' src={`/rankimages/${userRank}.png`}/>
      <p className='top-rank'>
        Current Rank :
      </p>
      <p className='top-agent'>
        Top Agent
      </p>
      <h1 className='intro-title'>
        {userAgent.toUpperCase()}
      </h1>
      <hr className='intro-line'/>
      <h2 className='intro-stats1'>
        K/D Ratio
      </h2>
      <h2 className='intro-stats2'>
        Account Lvl.
      </h2>
      <h2 className='intro-stats3'>
        Region
      </h2>

      <h2 className='intro-data1'>
        {userKDA}
      </h2>
      <h2 className='intro-data2'>
        {userLevel}
      </h2>
      <h2 className='intro-data3'>
        {userRegion.toUpperCase()}
      </h2>
      <img className='agentImg' src={`/ValorantAgents/${userAgent}.png`} />
    </div>
  )
}

export default IntroCard