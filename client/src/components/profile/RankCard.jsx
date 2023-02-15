import React from 'react'
import { CircularProgress } from '@mui/material'

export default function RankCard({wr, rankQueue, img}) {
  return (
    <div className='w-1/3 bg-white rounded-lg m-2 flex flex-col justify-evenly items-center'>
          Solo/Duo
          <img src={img} alt="" />
          <p>{rankQueue.tier} {rankQueue.rank}</p>
          <p>{rankQueue.wins} Wins | {rankQueue.leaguePoints} LP</p>
          <div className='inline-flex relative'>
          <CircularProgress size={150} value={wr(rankQueue.wins, rankQueue.losses)} variant='determinate' />
          <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
            <p className='text-3xl font-bold'>{wr(rankQueue.wins, rankQueue.losses)}%</p>
          </div>
  
          </div>
          
  
        </div>
  )
    
}
