import React from 'react'
import MasteryObject from './MasteryObject'

export default function Mastery({ data }) {

  const mastery = data.mastery

  const champion = data.champion

    const champs = Object.values(champion)
    const champ = champs.find(({ key }) => key == `${mastery[0].championId}`)

  return (
    <div>

    <MasteryObject champion={mastery[0]} champName={champ.name}/>

    </div>
  )
}
