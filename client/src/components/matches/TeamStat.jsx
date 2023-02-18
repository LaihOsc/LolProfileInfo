import React from 'react'
import PlayerStat from './PlayerStat'

export default function TeamStat({startIndex, stopIndex, players, unifyData, team}) {
  return (
    <div>
      <div className='flex text-center'>
        <div style={{color: team}} className='w-2/12'>Team 1</div>
        <div className='w-2/12 whitespace-nowrap'><p >{`
        ${unifyData(players, startIndex, stopIndex,'kills')} / 
        ${unifyData(players, startIndex, stopIndex,'deaths')} / 
        ${unifyData(players, startIndex, stopIndex,'assists')}`}</p></div>

        <div className='w-4/12'>
          {unifyData(players,startIndex,stopIndex,'goldEarned')}
          </div>
        
          <div className='w-2/12'>
         <p>Stats</p>
        </div>
        <div className='w-1/12'>
          <p>Cs</p>
        </div>
        <div className='w-1/12'>
          <p>Gold</p>
        </div>
        
        </div>

        {players.slice( startIndex, stopIndex ).map(player => <PlayerStat player={player} />)}
    </div>
  )
}
