import React from 'react'
import MasteryObject from './MasteryObject'
import { useQuery } from 'react-query'

export default function Mastery({ mastery }) {

    const { isLoading, error, data } = useQuery('championJson', () =>
      fetch('http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json').then(res =>
        res.json()
      )
    )
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message

    const champs = Object.values(data.data)
    const champ = champs.find(({ key }) => key == `${mastery[0].championId}`)
    console.log(champ)

  return (
    <div>

    <MasteryObject champion={mastery[0]} champName={champ.name}/>

    </div>
  )
}
