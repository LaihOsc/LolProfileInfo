import React from 'react'

export default function PlayerStat({player, data}) {

    const summonerData = data.summoner
    const runeData = data.runes

    const playerItems1 = [player.item0, player.item1, player.item2]
    const playerItems2 = [player.item3, player.item4, player.item5]
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
      <div className={`flex text-center h-20 m-auto`}>
        <div className='w-5/12 border flex'>

        <div className='relative w-fit p-2'>  

        {/*  Champion Image  */}
      <img className='w-16 h-16' src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player.championName}.png`} alt="" />
      <p className={` text- w-fit h-fit p-1 border text-xs absolute translate-x-10 -translate-y-6`}>{player.champLevel}</p>
      </div>

          {/*  Summoner Spells  */}
          <div className='p-2'>
            <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner1}.png`} alt={summoner1} />
            <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${summoner2}.png`} alt={summoner2} />
          </div>

          {/*  Runes  */}
          <div className='p-2'>
            <img className='w-8 h-8' src={`https://ddragon.canisback.com/img/${keyStoneObject.icon}`} />
            <img className='w-8 h-8' src={`https://ddragon.canisback.com/img/${secondaryStyleObject.icon}`} />
          </div>


        </div>

        {/*  Stats  */}
        <div className='w-1/12 h-full border flex justify-center items-center'><p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p></div>
        <div className='w-1/12 border flex justify-center items-center'><p>{player.totalDamageDealtToChampions}</p></div>
        <div className='w-1/12 border flex justify-center items-center'><p>{player.goldEarned}</p></div>
        <div className='w-1/12 border flex justify-center items-center'><p>{player.totalMinionsKilled}</p></div>
        <div className='w-1/12 border flex justify-center items-center'><p>{player.visionScore}</p></div>
        <div className='w-2/12 border'>
            <div className='flex justify-around'>{playerItems1.map(item => !item==0 ? <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item}.png`} alt='' /> : <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/7050.png`} alt='' />)}</div>
            <div className='flex justify-around'>{playerItems2.map(item => !item==0 ? <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item}.png`} alt='' /> : <img className='w-8 h-8' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/7050.png`} alt='' />)}</div>
            </div>
      </div>
    </div>
  )
}
