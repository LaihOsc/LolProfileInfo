import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import RankCard from './RankCard'
import TopChamps from './TopChamps'
import { DataContext } from '../../DataContext'


export default function Profile() {

 

  const data = useContext(DataContext)


  const {profile, ranked, item} = data

  const [soloDuo, flex] = [ranked[1], ranked[0]]


  const wr = (wins, losses) => Math.round((wins/(wins+losses))*100)





  return (
    <>
    <div className='flex justify-center p-2 h-fit w-4/5'>
      <div className='w-1/3 bg-white rounded-lg m-2 text-center flex flex-col justify-center items-center'>
        <Typography variant='h2'>{profile.name}</Typography>
        <div className='w-fit'>
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/${profile.profileIconId}.png`} alt="" />
        <div className='flex justify-center '><p className='w-fit border-4 p-2 border-black'>{profile.summonerLevel}</p></div>
        </div>
        </div>
        
        
      <RankCard   wr={wr} rankQueue={soloDuo} img={data.images.ranks[soloDuo.tier.toLowerCase()]} />
      <RankCard   wr={wr} rankQueue={flex} img={data.images.ranks[flex.tier.toLowerCase()]} />
      

      {/* Website breaks if summoner hasn't played their placement games. To be fixed */}


    </div>

    <div className='flex p-2 h-fit'>

    <div className='w-1/4 bg-white rounded-lg m-2'>
      
    <TopChamps />

      
    </div>

    </div>
    </>
  )
}

    
  