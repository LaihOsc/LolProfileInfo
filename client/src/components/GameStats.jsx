import React, { useContext } from 'react'
import PlayerStat from './PlayerStat'
import { DataContext } from '../DataContext'

export default function GameStats({ players }) {

  const data = useContext(DataContext)

  const redTeam = 'bg-rose-900'
  const blueTeam = 'bg-indigo-900'

  return (
    <div className='w-4/5'>
      <div className='flex text-center'>
        <div className='w-1/12'>Team 1</div>
        <div className='w-1/12 border'>KDA</div>
        <div className='w-1/12 border'>Damage</div>
        <div className='w-1/12 border'>Gold</div>
        <div className='w-1/12 border'>CS</div>
        <div className='w-1/12 border'>Wards</div>
        <div className='w-2/12 border'>Items</div>
      </div>

        {players.slice(0,5).map(player => <PlayerStat player={player} team={blueTeam}  />)}
        <div className={`w-5/12 border text-center ${redTeam}`}>{players[5].win ? 'Victory' : 'Defeat'} Red Team</div>
        {players.slice(5,10).map(player => <PlayerStat player={player} team={redTeam} />)}

      
    </div>
  )
}
