import React from 'react';
import './GamesCard.css';

function GamesCard() {

  let statsArr = JSON.parse(localStorage.getItem('stats'));
  let goldOrRed = [];
  for(let i = 0; i < (statsArr.length-1); i++){
    if(parseFloat(statsArr[i][3]) <= .5){
      goldOrRed[i] = '#a52525';
    }else if(parseFloat(statsArr[i][3]) >= 2.0){
      goldOrRed[i] = 'gold';
    }

    if(statsArr[i][0] == 'KAY/O'){
      statsArr[i][0] = 'kayo';
    }
  }

  return (
    <div className='gamesCard'>
      <div className='subDiv'>
        <h1 className='topDesc'>
          Last 5 competitive Matches
        </h1>
      </div>
      <div className={(statsArr[0][1][0] < statsArr[0][1][1]) ? 'subDiv2' : 'subDiv'}>
        <img className='faceImg' src={`/ValorantAgents/${statsArr[0][0]}face.png`}/>
        <h1 className='score'>
          {statsArr[0][1][0]}
        </h1>
        <h1 className='score2' style={(statsArr[0][1][0] < 10) ? {left:148} : {}}>
          {statsArr[0][1][1]}
        </h1>
        <h1 className='score3' style={(statsArr[0][1][0] < 10) ? {left:139} : {}}>
        :
        </h1>
        <h1 className='kdaText' style={{top:112}}>
          K&nbsp;/&nbsp;D&nbsp;/&nbsp;A
        </h1>
        <h1 className='kdaText4' style={{top:112}}>
          K&nbsp;/&nbsp;D&nbsp;
        </h1>
        <h1 className='kdaText2' style={{top:122}}>
          {statsArr[0][2][0]}&nbsp;/&nbsp;{statsArr[0][2][1]}&nbsp;/&nbsp;{statsArr[0][2][2]}
        </h1>
        <h1 className='kdaText3' style={{top:122, color: goldOrRed[0]}}>
        {statsArr[0][3]}
        </h1>
      </div>
      <div className={(statsArr[1][1][0] < statsArr[1][1][1]) ? 'subDiv2' : 'subDiv'}>
        <img className='faceImg' src={`/ValorantAgents/${statsArr[1][0]}face.png`}/>
        <h1 className='score4'>
          {statsArr[1][1][0]}
        </h1>
        <h1 className='score5' style={(statsArr[1][1][0] < 10) ? {left:148} : {}}>
          {statsArr[1][1][1]}
        </h1>
        <h1 className='score6' style={(statsArr[1][1][0] < 10) ? {left:139} : {}}>
        :
        </h1>
        <h1 className='kdaText' style={{top:202}}>
          K&nbsp;/&nbsp;D&nbsp;/&nbsp;A
        </h1>
        <h1 className='kdaText4' style={{top:202}}>
          K&nbsp;/&nbsp;D&nbsp;
        </h1>
        <h1 className='kdaText2' style={{top:212}}>
          {statsArr[1][2][0]}&nbsp;/&nbsp;{statsArr[1][2][1]}&nbsp;/&nbsp;{statsArr[1][2][2]}
        </h1>
        <h1 className='kdaText3' style={{top:212, color: goldOrRed[1]}}>
        {statsArr[1][3]}
        </h1>
      </div>
      <div className={(statsArr[2][1][0] < statsArr[2][1][1]) ? 'subDiv2' : 'subDiv'}>
        <img className='faceImg' src={`/ValorantAgents/${statsArr[2][0]}face.png`}/>
        <h1 className='score7'>
          {statsArr[2][1][0]}
        </h1>
        <h1 className='score8' style={(statsArr[2][1][0] < 10) ? {left:148} : {}}>
          {statsArr[2][1][1]}
        </h1>
        <h1 className='score9' style={(statsArr[2][1][0] < 10) ? {left:139} : {}}>
        :
        </h1>
        <h1 className='kdaText' style={{top:296}}>
          K&nbsp;/&nbsp;D&nbsp;/&nbsp;A
        </h1>
        <h1 className='kdaText4' style={{top:296}}>
          K&nbsp;/&nbsp;D&nbsp;
        </h1>
        <h1 className='kdaText2' style={{top:306}}>
          {statsArr[2][2][0]}&nbsp;/&nbsp;{statsArr[2][2][1]}&nbsp;/&nbsp;{statsArr[2][2][2]}
        </h1>
        <h1 className='kdaText3' style={{top:306, color: goldOrRed[2]}}>
        {statsArr[2][3]}
        </h1>
      </div>
      <div className={(statsArr[3][1][0] < statsArr[3][1][1]) ? 'subDiv2' : 'subDiv'}>
        <img className='faceImg' src={`/ValorantAgents/${statsArr[3][0]}face.png`}/>
        <h1 className='score10'>
          {statsArr[3][1][0]}
        </h1>
        <h1 className='score11' style={(statsArr[3][1][0] < 10) ? {left:148} : {}}>
          {statsArr[3][1][1]}
        </h1>
        <h1 className='score12' style={(statsArr[3][1][0] < 10) ? {left:139} : {}}>
        :
        </h1>
        <h1 className='kdaText' style={{top:386}}>
          K&nbsp;/&nbsp;D&nbsp;/&nbsp;A
        </h1>
        <h1 className='kdaText4' style={{top:386}}>
          K&nbsp;/&nbsp;D&nbsp;
        </h1>
        <h1 className='kdaText2' style={{top:396}}>
          {statsArr[3][2][0]}&nbsp;/&nbsp;{statsArr[3][2][1]}&nbsp;/&nbsp;{statsArr[3][2][2]}
        </h1>
        <h1 className='kdaText3' style={{top:396, color: goldOrRed[3]}}>
        {statsArr[3][3]}
        </h1>
      </div>
      <div className={(statsArr[4][1][0] < statsArr[4][1][1]) ? 'subDiv2' : 'subDiv'}>
        <img className='faceImg' src={`/ValorantAgents/${statsArr[4][0]}face.png`}/>
        <h1 className='score13'>
          {statsArr[4][1][0]}
        </h1>
        <h1 className='score14' style={(statsArr[4][1][0] < 10) ? {left:148} : {}}>
          {statsArr[4][1][1]}
        </h1>
        <h1 className='score15' style={(statsArr[4][1][0] < 10) ? {left:139} : {}}>
        :
        </h1>
        <h1 className='kdaText' style={{top:479}}>
          K&nbsp;/&nbsp;D&nbsp;/&nbsp;A
        </h1>
        <h1 className='kdaText4' style={{top:479}}>
          K&nbsp;/&nbsp;D&nbsp;
        </h1>
        <h1 className='kdaText2' style={{top:489}}>
          {statsArr[3][2][0]}&nbsp;/&nbsp;{statsArr[3][2][1]}&nbsp;/&nbsp;{statsArr[3][2][2]}
        </h1>
        <h1 className='kdaText3' style={{top:489, color: goldOrRed[4]}}>
        {statsArr[3][3]}
        </h1>
      </div>
    </div>
  )
}
export default GamesCard