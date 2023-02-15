import React, { useContext } from 'react'
import { DataContext } from '../DataContext'
import MatchObject from './MatchObject'



export default function Matches() {

  const data = useContext(DataContext)

  const matches = data.matches



  return (
    <div className={`flex flex-col justify-center items-center bg-slate-300 w-full `}>
      <p className='bg-white w-full'>Yeet</p>
      {matches.map(match => <MatchObject key={match.metadata.matchId} match={match} data={data}  />)}
      
    </div>
  )
}
