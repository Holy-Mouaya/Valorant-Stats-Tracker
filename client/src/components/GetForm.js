import React, { createContext } from 'react';
import '../App.css'
import './GetForm.css';
import IntroCard from './IntroCard';
import { useNavigate } from 'react-router-dom';
import {set, useForm} from 'react-hook-form';
import { useContext } from 'react';
import { usernameContext } from '../App';

function GetForm() {

const {setValue} = useContext(usernameContext)

const navigate = useNavigate();
const{register, handleSubmit, errors} = useForm();

const onSubmit = async (data) => {
const response = await fetch (`/statistics/${data.usernameInput}/${data.tagInput}`);
const userData = await response.json();
//setValue(userData);
//setValue([userData, userAgent]);
if (userData.status == 200){

  const agentResponse = await fetch (`/mmr/${userData.data.region}/${userData.data.name}/${userData.data.tag}/agent`);
  const userAgent = await agentResponse.json();
  const rankResponse = await fetch (`/mmr/${userData.data.region}/${userData.data.name}/${userData.data.tag}/rank`);
  const userRank = (await rankResponse.json()).replace(/\s/g, '');
  const KDAResponse = await fetch (`/mmr/${userData.data.region}/${userData.data.name}/${userData.data.tag}/KDA`);
  const userKDA = await KDAResponse.json();
  const userRegion = userData.data.region;
  const userLevel = userData.data.account_level;

  const MMRResponse = await fetch (`/mmr/${userData.data.region}/${userData.data.name}/${userData.data.tag}/eloChange`);
  const userMMR = await MMRResponse.json();

  const winrateResponse = await fetch (`/mmr/${userData.data.region}/${userData.data.name}/${userData.data.tag}/winrate`);
  const userWinrate = await winrateResponse.json();

  

  setValue([userAgent, userRegion, userLevel, userRank, userKDA]);

  localStorage.setItem('region', userData.data.region);
  localStorage.setItem('level', userData.data.account_level);
  localStorage.setItem('KDA', userKDA);
  localStorage.setItem('rank', userRank);
  localStorage.setItem('agentName', userAgent);

  localStorage.setItem('eloChange', JSON.stringify(userMMR));

  
  localStorage.setItem('winrate', JSON.stringify(userWinrate));

  navigate(`/statistics/${data.usernameInput}${data.tagInput}`);
} else {
  console.log('This account does not exist or has been inactive for too long');
}
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='getForm' name='getForm'>
      <label className='getLabel'>
        Valorant Stats Checker
      </label>
      <input
      type='text'
      placeholder='Enter account name'
      className='usernameInput'
      {...register('usernameInput',{required: true})}
      />
      <input
      type='text'
      placeholder='Enter account tag'
      className='tagInput'
      {...register('tagInput',{required: true})}
      />
      <button type='submit' className='submitBtn'>
        Search Up
      </button>
    </form>
  )
}

export default GetForm;