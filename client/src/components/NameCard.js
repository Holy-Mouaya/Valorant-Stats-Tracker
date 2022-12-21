import React from 'react';
import './NameCard.css';

function NameCard() {
  let playerCardURL = localStorage.getItem('playerCard');
  let userName = localStorage.getItem('userName');
  let userTag = localStorage.getItem('userTag');
  return (
    <div className='nameCard'>
      <img className='playerImage' src={playerCardURL}/>
      <h1 className='name'>
        {userName}
      </h1>
      <h1 className='tag'>
        #{userTag}
      </h1>
    </div>
  )
}

export default NameCard