import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import GetForm from '../GetForm';


function Home () {
  return(
    <main className='home'>
      <div className='formFeature'>
        <GetForm/>
      </div>
      <HeroSection/>
    </main>
  );

}

export default Home;