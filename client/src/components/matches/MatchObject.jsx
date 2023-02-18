import React, { useContext } from 'react'

import { useState } from 'react'
import { DataContext } from '../../DataContext'
import GameStats from './GameStats'
import Item from '../universal/Item'

import { ExpandMore, ExpandLess } from '@mui/icons-material'



export default function MatchObject({ match }) {

  const data = useContext(DataContext)

  const sumName = data.profile.name
  const summonerData = data.summoner
  const runeData = data.runes

  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const findValue = ( object, targetValueName, queryValue, endObject) => {
    const value = object.find(( key ) => key[targetValueName] == queryValue)
    return(endObject ? value[endObject] : value)
  }

    //An absolute abomination
    const player = match.info['participants'].find(({ summonerName }) => summonerName == sumName)
    const summoners = Object.values(summonerData)
    const summoner1 = findValue(summoners, 'key', player['summoner1Id'], 'id')
    const summoner2 = findValue(summoners, 'key', player['summoner2Id'], 'id')

    const primaryStyle = player.perks.styles[0]
    const primaryStyleObject = findValue(runeData, 'id', primaryStyle.style)
    const keyStoneObject = findValue(primaryStyleObject.slots[0].runes, 'id', primaryStyle.selections[0].perk)

    const playerItems = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]



  return (
    <>
    <div className='p-4 border-b-2 flex justify-around text-left bg-white dark:bg-gray-800 dark:text-white w-4/5 items-center'>
      <div className='flex flex-col justify-center items-center w-2/7'>
        <h1>{player.win ? <p className='text-green-700 dark:text-green-500 font-bold'>Victory</p> : <p className='text-red-700 dark:text-red-500 font-bold'>Defeat</p>}</h1>
        <p>{match.info.gameMode}</p>
        <p>{new Date(match.info.gameDuration * 1000).toISOString().substring(14, 19)}</p>
      </div>
    
 
      <img className='w-1/7 h-16 rounded-full' src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName}.png`} alt="" />
      

      <div className='flex flex-col'>
        <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner1}.png`} alt={summoner1} />
        <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner2}.png`} alt={summoner2} />
      </div>
           
                
      <img className='w-16 h-16' src={`https://ddragon.canisback.com/img/${keyStoneObject.icon}`} />
              
      {/* Items and stats */}
      <div className='flex flex-col w-2/7 justify-center'>

        {/* Items */}
        <div className='flex flex-wrap justify-start '>
          {playerItems.map(item => !item==0 ? <Item item={data.item[item]} /> : <Item item={data.item[7050]} />)}  
        </div>

        {/* Stats under items */}
        <div className='flex justify-around w-2/7 items-center h-full'>
          <p className='h-full w-1/3'>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
          <p className='h-full w-1/3 text-center'>{player.neutralMinionsKilled + player.totalMinionsKilled}</p>
          <p className='h-full w-1/3 text-right'>{player.goldEarned}</p>
        </div>

      </div>

     



      

    <div className='flex justify-between w-1/7'>
    
    <button className='flex justify-center self-center absolute hover:border' onClick={handleClick}>{expanded ? <ExpandLess /> : <ExpandMore />}</button>
    </div>
      



   


    </div>
     {expanded ? 


      <GameStats players={match.info['participants']} data={data} /> 
      
      
      : null}
      </>
  )
}
