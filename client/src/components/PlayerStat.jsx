import React, { useContext } from 'react'
import { DataContext } from '../DataContext'

export default function PlayerStat({player}) {

    const data = useContext(DataContext)

    const summonerData = data.summoner
    const runeData = data.runes

    const playerItems1 = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]
    const summoners = Object.values(summonerData)
    const summoner1 = summoners.find(({ key }) => key == player.summoner1Id).id
    const summoner2 = summoners.find(({ key }) => key == player.summoner2Id).id

    const primaryStyleId = player.perks.styles[0].style
    const primaryStyleObject = runeData.find(({id}) => id == primaryStyleId)
    const keyStoneId = player.perks.styles[0].selections[0].perk
    const keyStoneObject = primaryStyleObject.slots[0].runes.find(({id}) => id ==keyStoneId )

    const secondaryStyleId = player.perks.styles[1].style
    
    const secondaryStyleObject = runeData.find(({id}) => id == secondaryStyleId)
    console.log(secondaryStyleObject)

  return (
    <div>
      <div className={`flex text-center h-20 w-full`}>
        <div className='border flex w-full'>


          <div className='flex justify-evenly items-center p-2 w-3/12'>
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

      <div className='flex items-center'>
      <p className='w-2/12 text-left'>{player.summonerName}</p>
      </div>

      <div className='flex justify-center items-center w-3/12'>
        {playerItems1.map(item => !item==0 ? <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item}.png`} alt='' /> : <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/7050.png`} alt='' />)}
      </div>

      <div className='w-2/12'>
      <p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
      </div>
      
      <div className='w-1/12'>
        <p>{player.neutralMinionsKilled + player.totalMinionsKilled}</p>
      </div>

      <div className='w-1/12'>
        <p>{player.goldEarned}</p>
      </div>


        </div>


      </div>
    </div>
  )
}
