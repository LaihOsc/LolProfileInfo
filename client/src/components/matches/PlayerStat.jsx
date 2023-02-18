import React, { useContext } from 'react'
import { DataContext } from '../../DataContext'
import Item from '../universal/Item'

export default function PlayerStat({player}) {

    const data = useContext(DataContext)

    const { summoner, runes } = data

    const findValue = ( object, targetValueName, queryValue, endObject) => {
      const value = object.find(( key ) => key[targetValueName] == queryValue)
      return(endObject ? value[endObject] : value)
    }

    const playerItems = [...Array(7).keys()].map(index => player[`item${index}`])

    const summoners = Object.values(summoner)
    const summoner1 = findValue(summoners, 'key', player.summoner1Id, 'id')
    const summoner2 = findValue(summoners, 'key', player.summoner2Id, 'id')

    const primaryStyleId = player.perks.styles[0].style
    const primaryStyleObject = findValue(runes, 'id', primaryStyleId)
    const keyStoneId = player.perks.styles[0].selections[0].perk
    const keyStoneObject = findValue(primaryStyleObject.slots[0].runes, 'id', keyStoneId)

    

  return (
    <div>
      <div className={`flex text-center h-20 w-full`}>
        <div className='border flex w-full'>


          <div className='flex justify-evenly items-center p-2 w-2/12'>
          {/*  Runes  */}
            <img className='w-8 h-8' src={`https://ddragon.canisback.com/img/${keyStoneObject.icon}`} />


          {/*  Summoner Spells  */}
          <div>
            <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner1}.png`} alt={summoner1} />
            <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner2}.png`} alt={summoner2} />
          </div>


            <p className=''>{player.champLevel}</p>


        

        {/*  Champion Image  */}
        <div className='relative'>  
      <img className='w-16 h-16 rounded-full' src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName}.png`} alt="" />
      </div>

        

      </div>

      <div className='flex items-center w-2/12'>
      <p className='w-3/12 text-left whitespace-nowrap'>{player.summonerName}</p>
      </div>

      <div className='flex justify-center items-center w-4/12'>
        {playerItems.map(item => !item==0 ? 
        <Item item={data.item[item]} /> : <Item item={data.item[7050]} />)}
      </div>

      <div className='w-2/12 flex items-center justify-center'>
      <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
      </div>
      
      <div className='w-1/12 flex items-center justify-center'>
        <p>{player.neutralMinionsKilled + player.totalMinionsKilled}</p>
      </div>

      <div className='w-1/12 flex items-center justify-center'>
        <p>{player.goldEarned}</p>
      </div>


        </div>


      </div>
    </div>
  )
}
