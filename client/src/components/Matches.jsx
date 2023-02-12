import React from 'react'
import MatchObject from './MatchObject'



export default function Matches({ data }) {


  const matches = data.matches



  return (
    <div className={`w-3/5 m-auto bg-slate-500 `}>
      {matches.map(match => <MatchObject key={match.metadata.matchId} match={match} data={data}  />)}
    </div>
  )
}
