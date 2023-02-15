import React, { useContext } from 'react'

import { useState } from 'react'
import { DataContext } from '../DataContext'
import GameStats from './GameStats'
import Item from './Item'



export default function MatchObject({ match }) {

  const data = useContext(DataContext)

  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const sumName = data.profile.name
  const summonerData = data.summoner
  const runeData = data.runes

    const player = match.info['participants'].find(({ summonerName }) => summonerName == sumName)
    const summoners = Object.values(summonerData)
    const summoner1 = summoners.find(({ key }) => key == player.summoner1Id).id
    const summoner2 = summoners.find(({ key }) => key == player.summoner2Id).id
    const runes = player.perks.styles
    const primaryStyle = runes[0]
    const primaryStyleId = primaryStyle.style
    const primaryRuneIds = primaryStyle.selections
    const primaryStyleObject = runeData.find(({id}) => id == primaryStyleId)
    const keyStoneId = primaryRuneIds[0].perk
    const keyStoneObject = primaryStyleObject.slots[0].runes.find(({id}) => id == keyStoneId)
    const secondaryStyle = runes[1]
    const secondaryStyleId = secondaryStyle.style
    const secondaryStyleObject = runeData.find(({id}) => id == secondaryStyleId)

    const playerItems = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]



  return (
    <div>
    <div className={`p-4 border-b-2 flex justify-around text-left bg-white w-full`}>
      <h1>{player.win ? 'Win' : 'Loss'}</h1>
      <div className='relative w-fit'>  
      <img className='' src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName}.png`} alt="" />
      <p className={` w-fit h-fit p-1 border absolute translate-x-24 -translate-y-8`}>{player.champLevel}</p>
      </div>
      <div>
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner1}.png`} alt={summoner1} />
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner2}.png`} alt={summoner2} />
      </div>
      <div>
        <img className='w-16 h-16' src={`https://ddragon.canisback.com/img/${keyStoneObject.icon}`} />
        <img className='w-16 h-16' src={`https://ddragon.canisback.com/img/${secondaryStyleObject.icon}`} />
      </div>

      <div className='flex items-center'>
        {playerItems.map(item => !item==0 ? <Item item={data.item[item]} /> : null)}
      </div>
    
    <button onClick={handleClick}>Expand</button>
    </div>

    {expanded ? 


    <GameStats players={match.info['participants']} data={data} /> 
    
    
    : null}

    </div>
  )
}
