import React from 'react'

export default function MatchObject({ match, sumName }) {

    console.log(sumName)

    const player = match.info['participants'].find(({ summonerName }) => summonerName == sumName)

    console.log(player)


  return (
    <div>
      <h1>{player.win ? 'Win' : 'Loss'}</h1>
      <img src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName}.png`} alt="" />

    </div>
  )
}
