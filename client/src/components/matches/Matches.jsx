import React, { useContext } from 'react'
import { DataContext } from '../../DataContext'
import MatchObject from './MatchObject'


export default function Matches() {

  const data = useContext(DataContext)

  const matches = data.matches



  return (
    <div className='p-4'>

    {/* Title */}
    <div className=' flex justify-center w-full py-4 dark:text-white'>
          <h1 className='font-bold text-4xl w-4/5 '>Match History</h1>
        </div>

    {/* Matches */}
    <div className={`flex flex-col justify-center items-center h-full `}>
      {matches.map(match => <MatchObject key={match.metadata.matchId} match={match} data={data}  />)}
      
    </div>
    </div>
  )
}
