import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import './BackButton.css';

function BackButton() {  
  const navigate = useNavigate();
  return (
    <>
      <img src={'/rankimages/back-arrow.png'} className='arrow-image' onClick={() => navigate('/')}/>
      <button className='button' onClick={() => navigate('/')}></button>
    </>
  );
};

export default BackButton;