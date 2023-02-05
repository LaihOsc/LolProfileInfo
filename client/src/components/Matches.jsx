import React from 'react'
import MatchObject from './MatchObject'

export default function Matches({ matches, summonerName }) {

    console.log(matches)

    console.log(matches)


  return (
    <div>
      {matches.map(match => <MatchObject match={match} sumName={summonerName} />)}
    </div>
  )
}
