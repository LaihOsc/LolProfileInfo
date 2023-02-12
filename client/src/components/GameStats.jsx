import React from 'react'
import PlayerStat from './PlayerStat'

export default function GameStats({ players, data }) {

  const redTeam = 'bg-rose-900'
  const blueTeam = 'bg-indigo-900'

  return (
    <div>
      <div className='flex text-center'>
        <div className={`w-5/12 border ${blueTeam}`}>{players[0].win ? 'Victory' : 'Defeat'} Blue Team</div>
        <div className='w-1/12 border'>KDA</div>
        <div className='w-1/12 border'>Damage</div>
        <div className='w-1/12 border'>Gold</div>
        <div className='w-1/12 border'>CS</div>
        <div className='w-1/12 border'>Wards</div>
        <div className='w-2/12 border'>Items</div>
      </div>

        {players.slice(0,5).map(player => <PlayerStat player={player} data={data} team={blueTeam}  />)}
        <div className={`w-5/12 border text-center ${redTeam}`}>{players[5].win ? 'Victory' : 'Defeat'} Red Team</div>
        {players.slice(5,10).map(player => <PlayerStat player={player} data={data} team={redTeam} />)}

      
    </div>
  )
}
