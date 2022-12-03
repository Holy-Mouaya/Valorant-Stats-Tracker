import React from 'react';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src="/videos/valobg.mp4" autoPlay loop muted/>
    </div>
  )
}

export default HeroSection