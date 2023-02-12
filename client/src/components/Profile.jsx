import { Card, CircularProgress, Container, Typography } from '@mui/material'
import React, { useState } from 'react'


export default function Profile({data}) {

  const {profile, ranked} = data

  const [soloDuo, flex] = [ranked[1], ranked[0]]

  const wr = (wins, losses) => Math.round((wins/(wins+losses))*100)



  return (
    <div className='flex p-2 h-fit'>
      <div className='w-1/3 bg-white rounded-lg m-2 text-center'>
        <Typography variant='h2'>{profile.name}</Typography>
        <div className='w-fit'>
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/${profile.profileIconId}.png`} alt="" />
        <div className='flex justify-center'><p className='w-fit border-4 p-2 border-black'>{profile.summonerLevel}</p></div>
        </div>
        </div>
        
        
      <div className='w-1/3 bg-white rounded-lg m-2'>
        Ranked Solo/duo
        <p>{soloDuo.tier} {soloDuo.rank}</p>
        <p>{soloDuo.leaguePoints} LP</p>
        <p>{soloDuo.wins}W {soloDuo.losses}L</p>
        <div className='inline-flex relative'>
        <CircularProgress size={200} value={wr(soloDuo.wins, soloDuo.losses)} variant='determinate' />
        <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
          <p>{wr(soloDuo.wins, soloDuo.losses)}%</p>
        </div>

        </div>
        

      </div>
      <div className='w-1/3 bg-white rounded-lg m-2'>
        Ranked Flex
        <p>{flex.tier} {flex.rank}</p>
        <p>{flex.leaguePoints} LP</p>
        <p>{flex.wins}W {flex.losses}L</p>
        <div className='inline-flex relative'>
        <CircularProgress size={200} value={wr(flex.wins, flex.losses)} variant='determinate' />
        <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
          <p>{wr(flex.wins, flex.losses)}%</p>
        </div>

        </div>
        

      </div>


    </div>
  )
}
