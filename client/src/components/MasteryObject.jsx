import React from 'react'

export default function MasteryObject({ champion, champName }) {

    const { championId, championLevel, championPoints } = champion


  return (
    <div>
      <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champName}.png`} alt={championId} />
      <p>{championLevel}</p>
      <p>{championPoints}</p>
    </div>
  )
}
